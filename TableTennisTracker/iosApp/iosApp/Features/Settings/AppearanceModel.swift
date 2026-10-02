import Observation
import Shared

/// Theme and accent, read app-wide so the shell can set `preferredColorScheme` and the tint.
@MainActor
@Observable
final class AppearanceModel {
    private(set) var themeMode: ThemeMode = .system
    private(set) var accent: AccentChoice = .default

    @ObservationIgnored private let subscriptions = FlowSubscriptions()

    init(preferences: any UserPreferencesRepository = Services.preferences) {
        subscriptions.insert(
            KotlinFlow.observe(preferences.themeMode, as: AppThemeMode.self) { [weak self] mode in
                self?.themeMode = ThemeMode(mode)
            }
        )
        subscriptions.insert(
            KotlinFlow.observe(preferences.accent, as: AppAccent.self) { [weak self] accent in
                self?.accent = AccentChoice(accent)
            }
        )
    }
}
