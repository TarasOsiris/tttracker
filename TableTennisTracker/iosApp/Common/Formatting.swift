import Foundation

/// Format styles for values the app shows, spelled once.
///
/// None of these pins a `Locale`, and they must not: `Text(_:format:)` resolves the style against
/// `@Environment(\.locale)` and *overwrites* whatever the style itself carries, so an explicit
/// locale here would be silently ignored. `RootTabView` sets that environment from the in-app
/// language override, which is what makes these follow it.
///
/// The bug this replaced was `.formatted()` — building a `String` outside the view hierarchy,
/// where there is no environment to read and the style falls back to `Locale.autoupdatingCurrent`,
/// i.e. the device language rather than the chosen one.
extension Int {
    /// This many minutes of training, as a `Duration` to hand to `Text(_:format:)`.
    var trainingDuration: Duration { .seconds(self * 60) }
}

extension FormatStyle where Self == Duration.UnitsFormatStyle {
    /// A training duration. `Duration.UnitsFormatStyle` pluralises and orders the units per
    /// locale, which the hand-rolled "%1$dh %2$dm" string on the Kotlin side cannot.
    static var trainingDuration: Duration.UnitsFormatStyle {
        .units(allowed: [.hours, .minutes], width: .abbreviated)
    }
}

extension FormatStyle where Self == IntegerFormatStyle<Int> {
    /// A plain integer, so digits follow the app's language rather than rendering Western while
    /// an Arabic UI is drawn around them.
    ///
    /// Not named `number`: that would shadow the stdlib's `.number`, which resolves to
    /// `Decimal.FormatStyle` here and fails to type-check.
    static var integer: IntegerFormatStyle<Int> { IntegerFormatStyle<Int>() }
}

extension FormatStyle where Self == FloatingPointFormatStyle<Double>.Percent {
    /// A whole-number percentage.
    static var wholePercent: FloatingPointFormatStyle<Double>.Percent {
        FloatingPointFormatStyle<Double>.Percent().precision(.fractionLength(0))
    }
}

extension FormatStyle where Self == Date.FormatStyle {
    /// A complete day — weekday, date, month and year — as VoiceOver should hear it.
    ///
    /// Takes the locale explicitly to match how every other date in the app is built. That is
    /// belt-and-braces rather than load-bearing, for the reason given above.
    static func fullDay(_ locale: Locale) -> Date.FormatStyle {
        Date.FormatStyle(locale: locale).weekday(.wide).day().month(.wide).year()
    }
}
