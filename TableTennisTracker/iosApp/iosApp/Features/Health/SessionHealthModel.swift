import Foundation
import Observation
import Shared

/// The Apple Health side of one session: the workout it is linked to, or one it could be.
@MainActor
@Observable
final class SessionHealthModel {
    enum State: Equatable {
        /// No Health on this device: the section is left out.
        case unavailable
        case loading
        /// Not linked; `suggestion` is a same-day workout no other session has.
        case unlinked(suggestion: HealthWorkout?)
        /// Linked, but this device has never asked to read Health — linked on another device, say.
        case needsAccess
        /// Linked to a workout this device cannot find.
        case missing
        case linked(HealthWorkout)
    }

    private(set) var state = State.loading
    private(set) var heartRate: [HeartRatePoint] = []

    /// The last action that did not go through, if it has not been dismissed yet.
    var failure: OperationFailure?

    @ObservationIgnored private let health: HealthStore
    @ObservationIgnored private let sessions: any TrainingSessionService
    @ObservationIgnored private let analytics: any AnalyticsService

    init(
        health: HealthStore = .shared,
        sessions: any TrainingSessionService = Services.sessions,
        analytics: any AnalyticsService = Services.analytics
    ) {
        self.health = health
        self.sessions = sessions
        self.analytics = analytics
    }

    /// Never raises Health's permission sheet: a details screen did not ask for it. Looking for a
    /// suggestion waits until the user has allowed reading from the picker or the form's import.
    func refresh(for session: SessionItem) async {
        guard health.isAvailable else { return state = .unavailable }
        let hasAsked = await health.hasAskedForAccess()
        if let workoutId = session.healthWorkoutId {
            guard hasAsked else { return state = .needsAccess }
            guard let workout = try? await health.workout(id: workoutId) else {
                heartRate = []
                return state = .missing
            }
            state = .linked(workout)
            heartRate = (try? await health.heartRate(during: workout)) ?? []
        } else {
            heartRate = []
            state = .unlinked(suggestion: hasAsked ? await suggestion(for: session) : nil)
        }
    }

    func connect(_ session: SessionItem) async {
        do {
            try await health.requestAccess()
        } catch {
            failure = OperationFailure(error)
        }
        await refresh(for: session)
    }

    /// - Parameter via: how the user got there, for the funnel: `suggestion` or `picker`.
    func link(_ workout: HealthWorkout, to session: SessionItem, via: String) async {
        await setWorkout(workout.id, of: session)
        analytics.capture(event: "health_workout_linked", properties: ["via": via])
    }

    func unlink(_ session: SessionItem) async {
        await setWorkout(nil, of: session)
        analytics.capture(event: "health_workout_unlinked", properties: nil)
    }

    private func setWorkout(_ workoutId: String?, of session: SessionItem) async {
        guard let id = session.id.kotlinUuid else { return failure = OperationFailure() }
        do {
            try await sessions.setHealthWorkout(id: id, workoutId: workoutId)
        } catch {
            failure = OperationFailure(error)
        }
    }

    private func suggestion(for session: SessionItem) async -> HealthWorkout? {
        guard let day = session.day.kotlinLocalDate,
              let recent = try? await health.recentWorkouts(),
              let all = try? await sessions.getAllSessions() else { return nil }
        let linked = Set(all.compactMap(\.healthWorkoutId))
        let match = HealthWorkoutMatching.shared.suggestion(
            date: day,
            durationMinutes: Int32(session.durationMinutes),
            candidates: recent.compactMap(\.candidate),
            linkedIds: linked
        )
        return recent.first { $0.id == match?.id }
    }
}
