import Observation
import Shared

/// Theme, read app-wide so the shell can set `preferredColorScheme`.
@MainActor
@Observable
final class AppearanceModel {
    private(set) var themeMode: ThemeMode = .system

    @ObservationIgnored private let subscriptions = FlowSubscriptions()

    init(preferences: any UserPreferencesRepository = Services.preferences) {
        subscriptions.insert(
            KotlinFlow.observe(preferences.themeMode, as: AppThemeMode.self) { [weak self] mode in
                self?.themeMode = ThemeMode(mode)
            }
        )
    }
}
