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
    var durationMinutes = 60
    var kind: SessionKind = .technique
    var rpe = 5
    var notes = ""
    var matches: [PendingMatch] = []

    private(set) var isLoading: Bool
    var saveFailed = false

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
            durationMinutes = item.durationMinutes
            kind = item.kind ?? .other
            rpe = item.rpe
            notes = item.notes ?? ""
            matches = item.matches.map(PendingMatch.init)
        }
        isLoading = false
    }

    /// Returns `true` when the session was stored, so the sheet only dismisses on success.
    func save() async -> Bool {
        guard canSave, let dateTime = day.kotlinLocalDateTimeAtNoon else {
            saveFailed = true
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
            saveFailed = true
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
        durationMinutes = Int(preferences.defaultSessionDurationMinutes)
        rpe = Int(preferences.defaultRpe)
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
