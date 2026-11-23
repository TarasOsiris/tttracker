import Observation
import Shared

/// What a new session's form starts with, as `GeneralSettingsScreenViewModel.InputData` on Android.
@MainActor
@Observable
final class SessionDefaultsModel {
    var duration = 60.0 { didSet { if duration != oldValue { save() } } }
    var intensity = 5.0 { didSet { if intensity != oldValue { save() } } }
    var kind: SessionKind = .technique { didSet { if kind != oldValue { save() } } }
    var notes = "" { didSet { if notes != oldValue { save() } } }

    var durationMinutes: Int { Int(duration.rounded()) }
    var rpe: Int { Int(intensity.rounded()) }

    /// Nothing is written until the stored values have arrived, so loading cannot save the placeholders.
    private(set) var isLoaded = false

    @ObservationIgnored private let defaults: any UserPreferencesService
    @ObservationIgnored private var unsaved: UserPreferencesServiceUserPreferences?
    @ObservationIgnored private var isSaving = false

    init(defaults: any UserPreferencesService = Services.sessionDefaults) {
        self.defaults = defaults
    }

    func load() async {
        guard !isLoaded, let preferences = try? await defaults.getAllPreferences() else { return }
        duration = Double(preferences.defaultSessionDurationMinutes)
        intensity = Double(preferences.defaultRpe)
        kind = SessionKind(preferences.defaultSessionType) ?? .technique
        notes = preferences.defaultNotes
        isLoaded = true
    }

    /// A slider drag or typing changes the values faster than they are stored, so a write in
    /// flight is followed only by the newest values rather than by every step in between.
    private func save() {
        guard isLoaded else { return }
        unsaved = UserPreferencesServiceUserPreferences(
            defaultSessionDurationMinutes: Int32(durationMinutes),
            defaultRpe: Int32(rpe),
            defaultSessionType: kind.kotlin,
            defaultNotes: notes
        )
        guard !isSaving else { return }
        isSaving = true
        Task {
            while let preferences = unsaved {
                unsaved = nil
                try? await defaults.setAllPreferences(preferences: preferences)
            }
            isSaving = false
        }
    }
}
