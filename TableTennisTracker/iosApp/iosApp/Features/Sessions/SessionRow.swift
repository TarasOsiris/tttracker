import SwiftUI

struct SessionRow: View {
    let session: SessionItem
    var isSelected = false

    var body: some View {
        HStack(spacing: 12) {
            RoundedRectangle(cornerRadius: 2)
                .fill(Color.sessionKind(session.kind))
                .frame(width: 4, height: 40)

            VStack(alignment: .leading, spacing: 2) {
                Text(session.title).font(.body)
                Text(session.durationText).font(.caption).foregroundStyle(.secondary)
                if let notes = session.notes {
                    Text(notes).font(.caption2).foregroundStyle(.tertiary).lineLimit(1)
                }
            }

            Spacer(minLength: 8)

            Text(session.rpe.formatted())
                .font(.callout.weight(.semibold))
                .foregroundStyle(Color.rpe(session.rpe))
                .frame(width: 32, height: 32)
                .background(Color(.tertiarySystemFill), in: .circle)
        }
        .padding(12)
        .background(background, in: .rect(cornerRadius: 12))
        .contentShape(.rect(cornerRadius: 12))
    }

    private var background: Color {
        isSelected ? .selection : Color(.secondarySystemGroupedBackground)
    }
}

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
                .frame(width: 32, height: 32)
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
