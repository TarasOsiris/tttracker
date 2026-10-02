import SwiftUI

enum SettingsRoute: String, Hashable {
    case general, opponents, debug

    /// Names the row and the page it opens for the UI tests, which cannot read a localized label
    /// without pinning itself to one language.
    var identifier: String { "settings.\(rawValue)" }
    var screenIdentifier: String { "screen.\(rawValue)" }

    var title: String {
        switch self {
        case .general: L.actionUiSettings
        case .opponents: L.actionOpponents
        case .debug: L.actionDebug
        }
    }

    var icon: String {
        switch self {
        case .general: "gearshape"
        case .opponents: "person.2"
        case .debug: "ladybug"
        }
    }
}
