import Foundation
import Observation
import Shared

/// Backs both creating and editing a session, the way `CreateSessionScreenViewModel.InputData` is
/// shared between the two Compose screens.
@MainActor
@Observable
final class SessionFormModel {
    /// `VALID_DURATION_RANGE` is private to the Kotlin ViewModel, so it is restated rather than read.
    static let durationRange = 10...300
    static let notesLimit = 1000

    var day: Date

    /// Stored as `Double` because both are driven by a `Slider`, which only binds to a floating
    /// point value. Keeping the conversion here rather than in a binding built in the view body
    /// leaves the form with nothing but layout in it.
    var duration = 60.0
    var intensity = 5.0

    var kind: SessionKind = .technique
    var notes = ""
    var matches: [PendingMatch] = []

    var durationMinutes: Int { Int(duration.rounded()) }
    var rpe: Int { Int(intensity.rounded()) }

    private(set) var isLoading: Bool

    /// The last action that did not go through, if it has not been dismissed yet.
    var failure: OperationFailure?

    let isEditing: Bool
    var canSave: Bool { Self.durationRange.contains(durationMinutes) }

    @ObservationIgnored private let editing: KotlinUuid?
    @ObservationIgnored private let sessions: any TrainingSessionService
    @ObservationIgnored private let defaults: any UserPreferencesService
    @ObservationIgnored private let analytics: any AnalyticsService

    init(
        sessionId: String? = nil,
        day: Date = .now,
        sessions: any TrainingSessionService = Services.sessions,
        defaults: any UserPreferencesService = Services.sessionDefaults,
        analytics: any AnalyticsService = Services.analytics
    ) {
        // Resolve the id once, so an unparseable one cannot fall through to the create path and add
        // a second session instead of editing the one that was tapped.
        editing = sessionId?.kotlinUuid
        isEditing = sessionId != nil
        isLoading = sessionId != nil
        self.day = day
        self.sessions = sessions
        self.defaults = defaults
        self.analytics = analytics
    }

    func load() async {
        guard let editing else { return await seedFromDefaults() }
        if let session = try? await sessions.getSessionById(id: editing), let item = SessionItem(session) {
            day = item.day
            duration = Double(item.durationMinutes)
            kind = item.kind ?? .other
            intensity = Double(item.rpe)
            notes = item.notes ?? ""
            matches = item.matches.map(PendingMatch.init)
        }
        isLoading = false
    }

    /// Returns `true` when the session was stored, so the sheet only dismisses on success.
    func save() async -> Bool {
        guard canSave, let dateTime = day.kotlinLocalDateTimeAtNoon else {
            failure = OperationFailure()
            return false
        }
        do {
            if let editing {
                // Always the full list: `editSession` soft-deletes every match on the session and
                // reinserts what it is given, so a partial list would drop the rest.
                try await sessions.editSession(
                    id: editing,
                    dateTime: dateTime,
                    durationMinutes: Int32(durationMinutes),
                    rpe: Int32(rpe),
                    sessionType: kind.kotlin,
                    notes: notes.nilIfBlank,
                    matches: matches.map(\.input)
                )
                analytics.capture(event: "session_edited", properties: eventProperties)
            } else {
                _ = try await sessions.addSession(
                    dateTime: dateTime,
                    durationMinutes: Int32(durationMinutes),
                    rpe: Int32(rpe),
                    sessionType: kind.kotlin,
                    notes: notes.nilIfBlank,
                    matches: matches.map(\.input)
                )
                analytics.capture(event: "session_created", properties: eventProperties)
            }
            return true
        } catch {
            failure = OperationFailure(error)
            return false
        }
    }


    func upsert(_ match: PendingMatch) {
        if let index = matches.firstIndex(where: { $0.id == match.id }) {
            matches[index] = match
        } else {
            matches.append(match)
        }
    }

    func remove(_ match: PendingMatch) {
        matches.removeAll { $0.id == match.id }
    }

    private func seedFromDefaults() async {
        guard let preferences = try? await defaults.getAllPreferences() else { return }
        duration = Double(preferences.defaultSessionDurationMinutes)
        intensity = Double(preferences.defaultRpe)
        kind = SessionKind(preferences.defaultSessionType) ?? .technique
        notes = preferences.defaultNotes
    }

    /// The Kotlin ViewModels send the enum's `name`, not its `dbValue` — matching it keeps the
    /// PostHog funnels comparable across platforms.
    private var eventProperties: [String: Any] {
        [
            "session_type": kind.kotlin.name,
            "duration_minutes": durationMinutes,
            "rpe": rpe,
            "match_count": matches.count
        ]
    }
}
