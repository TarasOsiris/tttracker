import Foundation
import Observation
import SwiftUI
import Shared

/// Points `Localization` at the app's current language, honouring the in-app override.
///
/// `IosLocaleApplier` writes `AppleLanguages` into `NSUserDefaults`, which the Compose UI relies on
/// because Compose resources read the preferred-language list at draw time. `Bundle.main` caches its
/// localization at launch, so that alone does not retarget SwiftUI's lookups until the next launch —
/// hence the explicit per-language bundle here.
@MainActor
@Observable
final class LocalizationController {
    static let shared = LocalizationController()

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
        locale = Locale(identifier: resolved)
        languageTag = Localization.shippedLocalization(for: resolved) ?? "en"
        Localization.use(bundle: Localization.bundle(for: resolved) ?? .main, locale: locale)
        generation += 1
        // The widgets' strings are resolved when the snapshot is written, so they only follow the
        // override if it is rewritten here.
        WidgetSnapshotWriter.shared.flush()
    }
}
