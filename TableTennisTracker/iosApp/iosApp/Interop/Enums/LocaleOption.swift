import Shared

/// `AppLocale` has 15 cases and already carries its own endonym, so wrapping beats mirroring —
/// there is no second table to drift.
struct LocaleOption: Identifiable, Hashable {
    let kotlin: AppLocale

    var id: String { kotlin.name }
    /// Language names stay in their own language; "System default" is UI copy, so it follows the app's.
    var displayName: String { kotlin == .system ? L.themeSystem : kotlin.displayName }
    var languageTag: String { kotlin.languageTag }

    init(_ kotlin: AppLocale) { self.kotlin = kotlin }

    static let system = LocaleOption(.system)
    static let all = AppLocale.entries.map(LocaleOption.init)
}
