import Foundation
import Observation
import SwiftUI
import Shared

/// Resolves the app's strings, honouring the in-app language override.
///
/// `IosLocaleApplier` writes `AppleLanguages` into `NSUserDefaults`, which the Compose UI relies on
/// because Compose resources read the preferred-language list at draw time. `Bundle.main` caches its
/// localization at launch, so that alone does not retarget SwiftUI's lookups until the next launch —
/// hence the explicit per-language bundle here.
@MainActor
@Observable
final class LocalizationController {
    static let shared = LocalizationController()

    private(set) var bundle: Bundle = .main
    private(set) var locale: Locale = .autoupdatingCurrent

    /// The shipped localization actually in use, spelled as `Shared.xcstrings` spells it — which is
    /// also how `ShowcaseData.notes` in `:core` is keyed. At launch this follows `-AppleLanguages`;
    /// after an in-app override it follows that.
    private(set) var languageTag: String = Bundle.main.preferredLocalizations.first ?? "en"

    /// Bumped on every change so views that render cached `String`s re-evaluate.
    private(set) var generation: Int = 0

    private init() {}

    func apply(_ option: LocaleOption) {
        let tag = option.languageTag.isEmpty ? nil : option.languageTag
        // Keep writing AppleLanguages: it is what makes system-supplied UI (share sheets, date
        // pickers, the keyboard) follow the override too.
        Services.locales.applyLocale(languageTag: tag)

        let resolved = tag ?? Locale.preferredLanguages.first ?? "en"
        bundle = Self.bundle(for: resolved) ?? .main
        locale = Locale(identifier: resolved)
        languageTag = Bundle.preferredLocalizations(from: Bundle.main.localizations,
                                                    forPreferences: [resolved]).first ?? "en"
        generation += 1
    }

    /// Resolves the closest shipped localization. `preferredLocalizations` handles script subtags
    /// (`zh-Hans-CN` -> `zh-CN`), which truncating on "-" does not.
    private static func bundle(for tag: String) -> Bundle? {
        Bundle.preferredLocalizations(from: Bundle.main.localizations, forPreferences: [tag])
            .first
            .flatMap { Bundle.main.path(forResource: $0, ofType: "lproj") }
            .flatMap(Bundle.init(path:))
    }
}

/// Lookup used by the generated `L` accessors.
enum Localization {
    static let table = "Shared"

    static func string(_ key: String) -> String {
        MainActor.assumeIsolated {
            LocalizationController.shared.bundle.localizedString(forKey: key, value: key, table: table)
        }
    }

    static func format(_ key: String, _ arguments: any CVarArg...) -> String {
        MainActor.assumeIsolated {
            let controller = LocalizationController.shared
            return String(
                format: controller.bundle.localizedString(forKey: key, value: key, table: table),
                locale: controller.locale,
                arguments: arguments
            )
        }
    }
}
