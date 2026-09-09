import SwiftUI

/// One day in the session calendar. Purely visual — `SessionCalendar` owns the accessibility
/// reading of the button this sits inside.
struct DayCell: View {
    let day: Date
    let isSelected: Bool
    let isToday: Bool
    let isOutsideMonth: Bool
    let indicators: [SessionKind?]

    /// Grows the number's backing circle with the user's text size, so a large Dynamic Type
    /// setting does not push the digits outside it. Scaled by the calendar, not here.
    let numberSize: Double

    @Environment(\.locale) private var locale

    var body: some View {
        VStack(spacing: 3) {
            Text(day, format: Date.FormatStyle(locale: locale).day())
                .font(.callout)
                .fontWeight(isToday ? .bold : .regular)
                .foregroundStyle(numberColor)
                .frame(minWidth: numberSize, minHeight: numberSize)
                .background(background)
                .contentShape(.hoverEffect, .circle)
                .hoverEffect(.highlight)
            dots
        }
        .frame(maxWidth: .infinity)
        .opacity(isOutsideMonth ? 0.35 : 1)
    }

    private var dots: some View {
        HStack(spacing: 2) {
            // `Array(...)` rather than iterating `enumerated()` directly: the
            // `EnumeratedSequence: RandomAccessCollection` conformance that allows the latter is
            // iOS 26, and this app deploys to 18.2.
            ForEach(Array(indicators.enumerated()), id: \.offset) { _, kind in
                Circle().fill(Color.sessionKind(kind)).frame(width: 4, height: 4)
            }
        }
        .frame(height: 4)
    }

    @ViewBuilder private var background: some View {
        if isSelected {
            Circle().fill(isToday ? Color.accentColor : .selection)
        } else if isToday {
            Circle().stroke(Color.accentColor, lineWidth: 1.5)
        }
    }

    private var numberColor: Color {
        if isSelected && isToday { .white }
        else if isToday { .accentColor }
        else { .primary }
    }
}
