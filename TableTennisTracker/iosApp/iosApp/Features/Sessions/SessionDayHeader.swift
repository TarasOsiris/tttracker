import SwiftUI

/// Sticky header for one day of the list.
struct SessionDayHeader: View {
    let day: Date
    let today: Date
    let highlightsToday: Bool

    @Environment(\.locale) private var locale

    private var isToday: Bool { day == today }
    private var highlighted: Bool { isToday && highlightsToday }

    var body: some View {
        HStack(spacing: 10) {
            Text(day, format: Date.FormatStyle(locale: locale).day())
                .font(.body.weight(.bold))
                .foregroundStyle(highlighted ? Color.white : .secondary)
                .frame(minWidth: 32, minHeight: 32)
                .background(
                    highlighted ? Color.accentColor : Color(.tertiarySystemFill),
                    in: .rect(cornerRadius: 6)
                )

            caption
                .font(.subheadline)
                .fontWeight(highlighted ? .semibold : .regular)
                .foregroundStyle(highlighted ? Color.accentColor : .secondary)

            Spacer()
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
        .background(.background)
        .overlay(alignment: .bottom) { Divider() }
        // The day number and its caption name the same day twice over; combined they read once.
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(.isHeader)
    }

    /// Compose's `formatDateHeader` names the three days around today and falls back to the
    /// weekday. Built as `Text`, not `String`, so the weekday resolves against the in-app locale.
    @ViewBuilder private var caption: some View {
        switch Calendar.gregorian.dateComponents([.day], from: today, to: day).day {
        case 0: Text(L.timeToday)
        case 1: Text(L.timeTomorrow)
        case -1: Text(L.timeYesterday)
        default: Text(day, format: Date.FormatStyle(locale: locale).weekday(.wide))
        }
    }
}
