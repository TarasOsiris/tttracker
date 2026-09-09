import Shared

/// `AppLocale` has 15 cases and already carries its own endonym, so wrapping beats mirroring —
/// there is no second table to drift.
struct LocaleOption: Identifiable, Hashable {
    let kotlin: AppLocale

    var id: String { kotlin.name }
    var displayName: String { kotlin.displayName }
    var languageTag: String { kotlin.languageTag }

    init(_ kotlin: AppLocale) { self.kotlin = kotlin }

    static let system = LocaleOption(.system)
    static let all = AppLocale.entries.map(LocaleOption.init)
}
