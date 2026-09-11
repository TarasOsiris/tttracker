import Foundation
import SwiftUI
import UIKit

/// The brand palette, as plain ARGB numbers.
///
/// `:core`'s `BrandColors` is the source of truth, but the widget extension does not link the
/// Kotlin framework — so the app copies the numbers into the widget snapshot and both sides read
/// them through the same accessors below. Nothing here knows where the values came from.
struct Palette: Codable, Equatable, Sendable {
    /// Ten steps, pre-resolved because Compose interpolates the ramp in Oklab, which a
    /// straightforward sRGB blend here would not reproduce.
    var rpeRamp: [Int64]
    /// Keyed by `SessionKind.rawValue`, which is the Kotlin `dbValue`.
    var sessionTypes: [String: Int64]
    var sessionTypeFallback: Int64
    var win: Int64
    var loss: Int64

    /// A stand-in for the widgets before the app has ever written a snapshot, and for previews.
    ///
    /// Deliberately one neutral grey rather than a copy of the brand values: `BrandColors` in
    /// `:core` is the only place those are written down, and the widget reaches them through the
    /// snapshot. Nothing a user sees is drawn from this.
    static let neutral = Palette(
        rpeRamp: [0xFF8E_8E93],
        sessionTypes: [:],
        sessionTypeFallback: 0xFF8E_8E93,
        win: 0xFF8E_8E93,
        loss: 0xFF8E_8E93
    )

    /// Colour for an exertion level.
    func rpe(_ rpe: Int) -> Color { Color(argb: rpeArgb(rpe)) }

    /// Foreground for a number drawn on top of `rpe(_:)`.
    func rpeInk(_ rpe: Int) -> Color { Color.ink(on: rpeArgb(rpe)) }

    func sessionType(_ dbValue: String?) -> Color {
        Color(argb: dbValue.flatMap { sessionTypes[$0] } ?? sessionTypeFallback)
    }

    var matchWin: Color { Color(argb: win) }
    var matchLoss: Color { Color(argb: loss) }

    /// Foregrounds for text drawn on top of `matchWin` / `matchLoss`.
    var onMatchWin: Color { Color.ink(on: win) }
    var onMatchLoss: Color { Color.ink(on: loss) }

    /// `win` and `loss` used as text on a system background rather than as a fill.
    ///
    /// The fill green measures 2.9:1 on a light background, under the 3:1 that even large text
    /// needs; a light appearance gets a deeper tone of the same hue instead. A dark appearance
    /// keeps the brand colours, which clear 4.5:1 against every system background — which is why
    /// these cannot come from the shared ARGB table: they depend on the appearance, and it does
    /// not.
    var matchWinText: Color { Color.adaptive(light: 0xFF2E_7D32, dark: win) }
    var matchLossText: Color { Color.adaptive(light: 0xFFC6_2828, dark: loss) }

    private func rpeArgb(_ rpe: Int) -> Int64 {
        guard !rpeRamp.isEmpty else { return sessionTypeFallback }
        return rpeRamp[min(max(rpe, 1), rpeRamp.count) - 1]
    }
}

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

    static func adaptive(light: Int64, dark: Int64) -> Color {
        Color(UIColor { traits in
            UIColor(Color(argb: traits.userInterfaceStyle == .dark ? dark : light))
        })
    }

    /// Black or white, whichever clears WCAG's 4.5:1 on `argb`.
    ///
    /// The palette is tuned as fills, not as backgrounds for text: white on `win` measures 2.9:1,
    /// and the middle of the RPE ramp is a mid yellow that nothing light will read on. Taking the
    /// ink from the fill's own luminance keeps every badge legible without a second hand-picked
    /// colour per swatch, and needs no light/dark pair, because the fills are the same in both.
    static func ink(on argb: Int64) -> Color {
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
