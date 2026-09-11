import Foundation
import os

/// Key lookup for the generated `L` accessors, against whichever localization is in force.
///
/// The bundle sits behind a lock rather than on the main actor because the widget extension
/// resolves strings from its timeline provider, which is not main-actor-isolated — the
/// `MainActor.assumeIsolated` this used to do would trap there. The app drives it from
/// `LocalizationController`; the extension sets it from the snapshot's language tag.
enum Localization {
    static let table = "Shared"

    private struct Target {
        var bundle: Bundle = .main
        var locale: Locale = .autoupdatingCurrent
    }

    private static let target = OSAllocatedUnfairLock(initialState: Target())

    static var bundle: Bundle { target.withLock { $0.bundle } }

    static func use(bundle: Bundle, locale: Locale) {
        target.withLock { $0 = Target(bundle: bundle, locale: locale) }
    }

    /// Resolves the closest shipped localization. `preferredLocalizations` handles script subtags
    /// (`zh-Hans-CN` -> `zh-CN`), which truncating on "-" does not.
    static func bundle(for tag: String) -> Bundle? {
        shippedLocalization(for: tag)
            .flatMap { Bundle.main.path(forResource: $0, ofType: "lproj") }
            .flatMap(Bundle.init(path:))
    }

    /// The shipped localization a preference resolves to, spelled as `Shared.xcstrings` spells it.
    static func shippedLocalization(for tag: String) -> String? {
        Bundle.preferredLocalizations(from: Bundle.main.localizations, forPreferences: [tag]).first
    }

    static func string(_ key: String) -> String {
        bundle.localizedString(forKey: key, value: key, table: table)
    }

    static func format(_ key: String, _ arguments: any CVarArg...) -> String {
        let (bundle, locale) = target.withLock { ($0.bundle, $0.locale) }
        return String(
            format: bundle.localizedString(forKey: key, value: key, table: table),
            locale: locale,
            arguments: arguments
        )
    }
}
