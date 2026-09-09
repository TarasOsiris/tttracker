import SwiftUI
import Shared

extension Color {
    /// Opaque ARGB, matching the `0xAARRGGBB` literals in `BrandColors`.
    init(argb: Int64) {
        self.init(
            .sRGB,
            red: Double((argb >> 16) & 0xFF) / 255,
            green: Double((argb >> 8) & 0xFF) / 255,
            blue: Double(argb & 0xFF) / 255,
            opacity: Double((argb >> 24) & 0xFF) / 255
        )
    }

    /// Colour for an exertion level, read from the ramp `:core` shares with the Compose UI.
    ///
    /// The ramp is a table rather than an interpolation because Compose interpolates it in Oklab,
    /// which a straightforward sRGB blend here would not reproduce.
    static func rpe(_ rpe: Int) -> Color {
        let ramp = BrandColors.shared.RpeRamp
        let index = min(max(rpe, 1), ramp.count) - 1
        return Color(argb: ramp[index].int64Value)
    }

    static func sessionType(_ type: SessionType?) -> Color {
        let colors = BrandColors.shared
        return switch type {
        case .technique: Color(argb: colors.SessionTypeTechnique)
        case .matchPlay: Color(argb: colors.SessionTypeMatchPlay)
        case .tournament: Color(argb: colors.SessionTypeTournament)
        case .servePractice: Color(argb: colors.SessionTypeServePractice)
        case .physical: Color(argb: colors.SessionTypePhysical)
        case .freePlay: Color(argb: colors.SessionTypeFreePlay)
        default: Color(argb: colors.SessionTypeOther)
        }
    }

    /// Overload taking the Swift mirror, so views never have to name a `Shared` type.
    static func sessionKind(_ kind: SessionKind?) -> Color { sessionType(kind?.kotlin) }

    /// Shading for a heatmap intensity bucket, 0 (none) through 4 (busiest).
    static func heatmap(level: Int) -> Color {
        switch level {
        case 1: Color.accentColor.opacity(0.35)
        case 2: Color.accentColor.opacity(0.55)
        case 3: Color.accentColor.opacity(0.75)
        case 4: Color.accentColor
        default: Color(.tertiarySystemFill)
        }
    }

    /// Backs whatever the user has picked — a calendar day, a row in the sessions sidebar.
    static var selection: Color { Color.accentColor.opacity(0.18) }

    static var matchWin: Color { Color(argb: BrandColors.shared.Win) }
    static var matchLoss: Color { Color(argb: BrandColors.shared.Loss) }
}
