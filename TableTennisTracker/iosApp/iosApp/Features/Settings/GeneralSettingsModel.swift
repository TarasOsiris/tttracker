import Observation
import Shared

@MainActor
@Observable
final class GeneralSettingsModel {
    let themeMode: Preference<ThemeMode>
    let weekStart: Preference<WeekStart>
    let highlightCurrentDay: Preference<Bool>
    let appLocale: Preference<LocaleOption>

    @ObservationIgnored private let subscriptions = FlowSubscriptions()
    @ObservationIgnored private let queue = SerialWriteQueue()

    init(
        preferences: any UserPreferencesRepository = Services.preferences,
        analytics: any AnalyticsService = Services.analytics
    ) {
        // Initial values mirror the stateIn seeds in GeneralSettingsScreenViewModelImpl, so the
        // first frame matches what the Compose UI would show.
        themeMode = Preference(
            initial: .system,
            flow: preferences.themeMode,
            subscriptions: subscriptions,
            queue: queue,
            decode: { ($0 as? AppThemeMode).map(ThemeMode.init) },
            commit: { mode in
                try await preferences.setThemeMode(mode: mode.kotlin)
                analytics.capture(event: "theme_changed", properties: ["theme": mode.rawValue])
            }
        )
        weekStart = Preference(
            initial: .monday,
            flow: preferences.weekStartDay,
            subscriptions: subscriptions,
            queue: queue,
            decode: { ($0 as? Shared.WeekStartDay).map(WeekStart.init) },
            commit: { day in
                try await preferences.setWeekStartDay(day: day.kotlin)
                analytics.capture(event: "week_start_day_changed", properties: ["day": day.rawValue])
            }
        )
        highlightCurrentDay = Preference(
            initial: true,
            flow: preferences.highlightCurrentDay,
            subscriptions: subscriptions,
            queue: queue,
            commit: { highlight in
                try await preferences.setHighlightCurrentDay(highlight: highlight)
                analytics.capture(
                    event: "highlight_current_day_toggled",
                    properties: ["enabled": highlight]
                )
            }
        )
        appLocale = Preference(
            initial: .system,
            flow: preferences.appLocale,
            subscriptions: subscriptions,
            queue: queue,
            decode: { ($0 as? AppLocale).map(LocaleOption.init) },
            apply: { LocalizationController.shared.apply($0) },
            commit: { locale in
                try await preferences.setAppLocale(locale: locale.kotlin)
                analytics.capture(event: "locale_changed", properties: ["locale": locale.id])
            }
        )
    }
}
