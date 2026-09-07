import Observation
import SwiftUI
import Shared

@MainActor
@Observable
final class GeneralSettingsModel {
    // Initial values mirror the `stateIn` seeds in GeneralSettingsScreenViewModelImpl, so the first
    // frame matches what the Compose UI would show.
    private(set) var themeMode: ThemeMode = .system
    private(set) var weekStart: WeekStart = .monday
    private(set) var highlightCurrentDay: Bool = true
    private(set) var appLocale: LocaleOption = .system

    @ObservationIgnored private let preferences: any UserPreferencesRepository
    @ObservationIgnored private let analytics: any AnalyticsService
    @ObservationIgnored private let subscriptions = FlowSubscriptions()
    @ObservationIgnored private let writes = SerialWriteQueue()

    init(
        preferences: any UserPreferencesRepository = Services.preferences,
        analytics: any AnalyticsService = Services.analytics
    ) {
        self.preferences = preferences
        self.analytics = analytics

        subscriptions.insert(
            KotlinFlow.observe(preferences.themeMode, as: AppThemeMode.self) { [weak self] in
                self?.themeMode = ThemeMode($0)
            }
        )
        subscriptions.insert(
            KotlinFlow.observe(preferences.weekStartDay, as: Shared.WeekStartDay.self) { [weak self] in
                self?.weekStart = WeekStart($0)
            }
        )
        subscriptions.insert(
            KotlinFlow.observeBool(preferences.highlightCurrentDay) { [weak self] in
                self?.highlightCurrentDay = $0
            }
        )
        subscriptions.insert(
            KotlinFlow.observe(preferences.appLocale, as: AppLocale.self) { [weak self] in
                self?.appLocale = LocaleOption($0)
            }
        )
    }

    // Each setter writes local state first so the control responds on the same frame, then commits
    // through the queue. The repository flow re-emits and confirms; a failure reverts.

    var themeModeBinding: Binding<ThemeMode> {
        Binding(get: { self.themeMode }, set: { self.setThemeMode($0) })
    }

    var weekStartBinding: Binding<WeekStart> {
        Binding(get: { self.weekStart }, set: { self.setWeekStart($0) })
    }

    var highlightCurrentDayBinding: Binding<Bool> {
        Binding(get: { self.highlightCurrentDay }, set: { self.setHighlightCurrentDay($0) })
    }

    var appLocaleBinding: Binding<LocaleOption> {
        Binding(get: { self.appLocale }, set: { self.setAppLocale($0) })
    }

    private func setThemeMode(_ mode: ThemeMode) {
        let previous = themeMode
        themeMode = mode
        writes.enqueue {
            try await self.preferences.setThemeMode(mode: mode.kotlin)
            self.analytics.capture(event: "theme_changed", properties: ["theme": mode.rawValue])
        } onFailure: { [weak self] _ in
            self?.themeMode = previous
        }
    }

    private func setWeekStart(_ day: WeekStart) {
        let previous = weekStart
        weekStart = day
        writes.enqueue {
            try await self.preferences.setWeekStartDay(day: day.kotlin)
            self.analytics.capture(event: "week_start_day_changed", properties: ["day": day.rawValue])
        } onFailure: { [weak self] _ in
            self?.weekStart = previous
        }
    }

    private func setHighlightCurrentDay(_ highlight: Bool) {
        let previous = highlightCurrentDay
        highlightCurrentDay = highlight
        writes.enqueue {
            try await self.preferences.setHighlightCurrentDay(highlight: highlight)
            self.analytics.capture(
                event: "highlight_current_day_toggled",
                properties: ["enabled": highlight]
            )
        } onFailure: { [weak self] _ in
            self?.highlightCurrentDay = previous
        }
    }

    private func setAppLocale(_ locale: LocaleOption) {
        let previous = appLocale
        appLocale = locale
        LocalizationController.shared.apply(locale)
        writes.enqueue {
            try await self.preferences.setAppLocale(locale: locale.kotlin)
            self.analytics.capture(event: "locale_changed", properties: ["locale": locale.id])
        } onFailure: { [weak self] _ in
            self?.appLocale = previous
            LocalizationController.shared.apply(previous)
        }
    }
}
