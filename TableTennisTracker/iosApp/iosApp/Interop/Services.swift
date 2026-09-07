import Shared

/// The app's dependencies, resolved through the Kotlin side's `IosServices`.
///
/// Models take what they need through their initialiser with these as defaults, so a test or a
/// preview can substitute a fake without going near Koin.
enum Services {
    static var preferences: any UserPreferencesRepository { IosServices.shared.userPreferencesRepository }
    static var preferenceDefaults: any UserPreferencesService { IosServices.shared.userPreferencesService }
    static var opponents: any OpponentService { IosServices.shared.opponentService }
    static var sessions: any TrainingSessionService { IosServices.shared.trainingSessionService }
    static var matches: any MatchService { IosServices.shared.matchService }
    static var userId: any UserIdService { IosServices.shared.userIdService }
    static var deviceInfo: any NativeInfoProvider { IosServices.shared.nativeInfoProvider }
    static var launcher: any ExternalAppLauncher { IosServices.shared.externalAppLauncher }
    static var clipboard: any ClipboardManager { IosServices.shared.clipboardManager }
    static var locales: any LocaleApplier { IosServices.shared.localeApplier }
    static var analytics: any AnalyticsService { IosServices.shared.analyticsService }
}
