import SwiftUI

/// The accent the app and its widgets are tinted with. Raw values are `AppAccent` names, which is
/// what the preference stores; the colours are the system's own, so each already adapts to light and
/// dark and to Increase Contrast.
enum AccentChoice: String, CaseIterable, Identifiable, Codable, Sendable {
    case `default` = "DEFAULT"
    case green = "GREEN"
    case teal = "TEAL"
    case indigo = "INDIGO"
    case purple = "PURPLE"
    case pink = "PINK"
    case red = "RED"
    case orange = "ORANGE"

    var id: String { rawValue }

    /// Nil for the default, so the tint falls through to the asset catalog's accent.
    var color: Color? {
        switch self {
        case .default: nil
        case .green: .green
        case .teal: .teal
        case .indigo: .indigo
        case .purple: .purple
        case .pink: .pink
        case .red: .red
        case .orange: .orange
        }
    }

    var label: String {
        switch self {
        case .default: L.accentDefault
        case .green: L.accentGreen
        case .teal: L.accentTeal
        case .indigo: L.accentIndigo
        case .purple: L.accentPurple
        case .pink: L.accentPink
        case .red: L.accentRed
        case .orange: L.accentOrange
        }
    }
}
