import Foundation
import Observation
import Shared

@MainActor
@Observable
final class SessionDetailsModel {
    private(set) var session: SessionItem?
    private(set) var isLoading = true

    /// The last action that did not go through, if it has not been dismissed yet.
    var failure: OperationFailure?

    let sessionId: String

    @ObservationIgnored private let sessions: any TrainingSessionService
    @ObservationIgnored private let analytics: any AnalyticsService
    @ObservationIgnored private let subscriptions = FlowSubscriptions()

    init(
        sessionId: String,
        sessions: any TrainingSessionService = Services.sessions,
        analytics: any AnalyticsService = Services.analytics
    ) {
        self.sessionId = sessionId
        self.sessions = sessions
        self.analytics = analytics

        // Derived from the same flow the list uses rather than loaded once, so an edit is reflected
        // as soon as it is saved. The Compose screen reads the session in `init` and never refreshes,
        // which only goes unnoticed because editing there destroys the details screen.
        subscriptions.insert(
            KotlinFlow.observe(sessions.allSessions, as: [TrainingSession].self) { [weak self] all in
                guard let self else { return }
                self.session = all.lazy.compactMap(SessionItem.init).first { $0.id == self.sessionId }
                self.isLoading = false
            }
        )
    }

    /// Returns `true` once the session is gone, so the screen only pops on success.
    func delete() async -> Bool {
        guard let id = sessionId.kotlinUuid else {
            failure = OperationFailure()
            return false
        }
        do {
            try await sessions.deleteSession(id: id)
            analytics.capture(event: "session_deleted", properties: nil)
            return true
        } catch {
            failure = OperationFailure(error)
            return false
        }
    }
}
