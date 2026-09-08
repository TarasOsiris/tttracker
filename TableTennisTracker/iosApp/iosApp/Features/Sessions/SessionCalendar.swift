import SwiftUI

/// The week strip that expands into a month grid.
///
/// Compose cross-fades two kizitonwose calendars stacked in a `Box` and animates the container
/// height between them. Here the grid is a pure function of `selection` and `isExpanded`, so
/// expanding is a change of which days are in the array plus a height animation — there are no two
/// calendars to keep in step, and no paging state that could disagree with the list's.
struct SessionCalendar: View {
    let model: SessionsModel
    @Binding var selection: Date
    @Binding var isExpanded: Bool

    @Environment(\.locale) private var locale

    private static let rowHeight: CGFloat = 40
    private static let expandedRows = 6

    var body: some View {
        VStack(spacing: 4) {
            header
            weekdayLabels
            grid
                .frame(height: Self.rowHeight * CGFloat(isExpanded ? Self.expandedRows : 1))
                .clipped()
        }
        .padding(.horizontal, 12)
        .padding(.bottom, 8)
        .background(.bar)
        .contentShape(.rect)
        .gesture(pageGesture)
        .animation(.snappy(duration: 0.25), value: isExpanded)
        .animation(.snappy(duration: 0.25), value: selection)
    }

    private var header: some View {
        HStack {
            Button {
                isExpanded.toggle()
            } label: {
                HStack(spacing: 4) {
                    Text(selection, format: Date.FormatStyle(locale: locale).month(.wide).year())
                        .font(.headline)
                    Image(systemName: "chevron.down")
                        .font(.caption.bold())
                        .rotationEffect(.degrees(isExpanded ? 180 : 0))
                }
            }
            .buttonStyle(.plain)
            .accessibilityLabel(isExpanded ? L.sessionsWeekMode : L.sessionsMonthMode)

            Spacer()

            Button { page(by: -1) } label: { Image(systemName: "chevron.left") }
                .accessibilityLabel(periodLabel(-1))
            Button { page(by: 1) } label: { Image(systemName: "chevron.right") }
                .accessibilityLabel(periodLabel(1))
        }
        .buttonStyle(.borderless)
        .padding(.vertical, 6)
    }

    private var weekdayLabels: some View {
        HStack(spacing: 0) {
            ForEach(weekDays(containing: selection), id: \.self) { day in
                Text(day, format: Date.FormatStyle(locale: locale).weekday(.short))
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                    .frame(maxWidth: .infinity)
            }
        }
    }

    private var grid: some View {
        LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 0), count: 7), spacing: 0) {
            ForEach(visibleDays, id: \.self) { day in
                Button {
                    selection = day
                } label: {
                    DayCell(
                        day: day,
                        isSelected: day == selection,
                        isToday: model.highlightsToday && day == model.today,
                        isOutsideMonth: isExpanded && !calendar.isDate(day, equalTo: selection, toGranularity: .month),
                        indicators: model.indicators(on: day)
                    )
                    .frame(height: Self.rowHeight)
                    // A cell is mostly empty space — the wider the calendar, the more of it.
                    .contentShape(.rect)
                }
                .buttonStyle(.plain)
                .accessibilityIdentifier("calendar.day")
            }
        }
    }

    private var calendar: Calendar { model.calendar }

    /// One week, or the six-row grid that always fully contains the month — the same shape Compose
    /// gets from `OutDateStyle.EndOfGrid`, so the height never jumps between months.
    private var visibleDays: [Date] {
        guard isExpanded else { return weekDays(containing: selection) }
        guard let monthStart = calendar.dateInterval(of: .month, for: selection)?.start,
              let gridStart = calendar.dateInterval(of: .weekOfYear, for: monthStart)?.start
        else { return weekDays(containing: selection) }
        return (0..<(Self.expandedRows * 7)).compactMap { calendar.date(byAdding: .day, value: $0, to: gridStart) }
    }

    private func weekDays(containing day: Date) -> [Date] {
        guard let start = calendar.dateInterval(of: .weekOfYear, for: day)?.start else { return [day] }
        return (0..<7).compactMap { calendar.date(byAdding: .day, value: $0, to: start) }
    }

    /// Steps by whatever the calendar is currently showing, keeping the weekday — which is what
    /// swiping a week strip or a month grid is expected to do.
    private func page(by steps: Int) {
        guard let moved = stepped(by: steps) else { return }
        selection = moved
    }

    private func stepped(by steps: Int) -> Date? {
        calendar.date(byAdding: isExpanded ? .month : .weekOfYear, value: steps, to: selection)
    }

    /// Names the period the chevron moves to, rather than inventing a "previous month" string that
    /// would need translating into fourteen locales.
    private func periodLabel(_ steps: Int) -> Text {
        guard let target = stepped(by: steps) else { return Text(verbatim: "") }
        return Text(target, format: Date.FormatStyle(locale: locale).month(.wide).year())
    }

    private var pageGesture: some Gesture {
        DragGesture(minimumDistance: 24)
            .onEnded { value in
                guard abs(value.translation.width) > abs(value.translation.height) else { return }
                page(by: value.translation.width < 0 ? 1 : -1)
            }
    }
}

private struct DayCell: View {
    let day: Date
    let isSelected: Bool
    let isToday: Bool
    let isOutsideMonth: Bool
    let indicators: [SessionKind?]

    @Environment(\.locale) private var locale

    var body: some View {
        VStack(spacing: 3) {
            Text(day, format: Date.FormatStyle(locale: locale).day())
                .font(.callout)
                .fontWeight(isToday ? .bold : .regular)
                .foregroundStyle(numberColor)
                .frame(width: 30, height: 30)
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
