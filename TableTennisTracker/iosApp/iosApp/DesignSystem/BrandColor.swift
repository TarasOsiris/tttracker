import Foundation
import SwiftUI
import UIKit
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
    static func rpe(_ rpe: Int) -> Color { Color(argb: rpeArgb(rpe)) }

    /// Foreground for a number drawn on top of `rpe(_:)`.
    static func rpeInk(_ rpe: Int) -> Color { ink(on: rpeArgb(rpe)) }

    private static func rpeArgb(_ rpe: Int) -> Int64 {
        let ramp = BrandColors.shared.RpeRamp
        let index = min(max(rpe, 1), ramp.count) - 1
        return ramp[index].int64Value
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
    ///
    /// One hue at rising opacity rather than a hue ramp, so the buckets stay apart for a viewer
    /// who cannot separate the hues.
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

    /// Foregrounds for text drawn on top of `matchWin` / `matchLoss`.
    static var onMatchWin: Color { ink(on: BrandColors.shared.Win) }
    static var onMatchLoss: Color { ink(on: BrandColors.shared.Loss) }

    /// `Win` and `Loss` used as text on a system background rather than as a fill.
    ///
    /// The fill green measures 2.9:1 on a light background, under the 3:1 that even large text
    /// needs; a light appearance gets a deeper tone of the same hue instead. A dark appearance
    /// keeps the brand colours, which clear 4.5:1 against every system background — which is why
    /// these cannot come from the shared ARGB table: they depend on the appearance, and it does
    /// not.
    static var matchWinText: Color { adaptive(light: 0xFF2E7D32, dark: BrandColors.shared.Win) }
    static var matchLossText: Color { adaptive(light: 0xFFC62828, dark: BrandColors.shared.Loss) }

    private static func adaptive(light: Int64, dark: Int64) -> Color {
        Color(UIColor { traits in
            UIColor(Color(argb: traits.userInterfaceStyle == .dark ? dark : light))
        })
    }

    /// Black or white, whichever clears WCAG's 4.5:1 on `argb`.
    ///
    /// The palette is tuned as fills, not as backgrounds for text: white on `Win` measures 2.9:1,
    /// and the middle of the RPE ramp is a mid yellow that nothing light will read on. Taking the
    /// ink from the fill's own luminance keeps every badge legible without a second hand-picked
    /// colour per swatch, and needs no light/dark pair, because the fills are the same in both.
    private static func ink(on argb: Int64) -> Color {
        // 0.1791 is where contrast against white and against black meet: sqrt(1.05 * 0.05) - 0.05.
        relativeLuminance(argb) > 0.1791 ? .black : .white
    }

    private static func relativeLuminance(_ argb: Int64) -> Double {
        func channel(_ shift: Int64) -> Double {
            let value = Double((argb >> shift) & 0xFF) / 255
            return value <= 0.04045 ? value / 12.92 : pow((value + 0.055) / 1.055, 2.4)
        }
        return 0.2126 * channel(16) + 0.7152 * channel(8) + 0.0722 * channel(0)
    }
}
