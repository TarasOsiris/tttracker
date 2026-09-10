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
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    /// A row has to clear Apple's 44pt minimum on its own: the whole cell is the tap target, and
    /// `@ScaledMetric` grows it with the user's text size so the number inside never clips.
    @ScaledMetric(relativeTo: .callout) private var rowHeight = 44

    /// Scaled here rather than inside `DayCell`, which is built once per day: a dynamic
    /// property there runs a font-metrics lookup per cell on every pass.
    @ScaledMetric(relativeTo: .callout) private var numberSize = 30
    private static let expandedRows = 6

    var body: some View {
        VStack(spacing: 4) {
            header
            weekdayLabels
            grid
                .frame(height: rowHeight * Double(isExpanded ? Self.expandedRows : 1))
                .clipped()
        }
        .padding(.horizontal, 12)
        .padding(.bottom, 8)
        .background(.bar)
        .contentShape(.rect)
        .gesture(pageGesture)
        .animation(motion, value: isExpanded)
        .animation(motion, value: selection)
    }

    /// Expanding the calendar animates its height and slides the list under it; with Reduce
    /// Motion on the state swaps instead, which is the only motion in the app to answer for.
    private var motion: Animation? { reduceMotion ? nil : .snappy(duration: 0.25) }

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
                .minimumTapTarget()
            }
            .buttonStyle(.plain)
            .accessibilityLabel(isExpanded ? L.sessionsWeekMode : L.sessionsMonthMode)
            .accessibilityIdentifier("calendar.toggleMode")

            Spacer()

            // Labelled rather than icon-only, so Voice Control has a word to say.
            Button("", systemImage: "chevron.left") { page(by: -1) }
                .labelStyle(.iconOnly)
                .minimumTapTarget()
                .accessibilityIdentifier("calendar.previousPeriod")
                .accessibilityLabel(periodLabel(-1))
            Button("", systemImage: "chevron.right") { page(by: 1) }
                .labelStyle(.iconOnly)
                .minimumTapTarget()
                .accessibilityIdentifier("calendar.nextPeriod")
                .accessibilityLabel(periodLabel(1))
        }
        .buttonStyle(.borderless)
        .padding(.vertical, 6)
    }

    private var weekdayLabels: some View {
        HStack(spacing: 0) {
            ForEach(weekDays(containing: selection), id: \.self) { day in
                Text(day, format: Date.FormatStyle(locale: locale).weekday(.short))
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .frame(maxWidth: .infinity)
            }
        }
        // Column headings: each day cell already names its own weekday in full.
        .accessibilityHidden(true)
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
                        indicators: model.indicators(on: day),
                        numberSize: numberSize
                    )
                    .frame(height: rowHeight)
                    // A cell is mostly empty space — the wider the calendar, the more of it.
                    .contentShape(.rect)
                }
                .buttonStyle(.plain)
                .accessibilityIdentifier("calendar.day")
                // Left to itself a day was a bare number and a row of unnamed dots: no month, no
                // year, and no way to tell a day with sessions from an empty one. The label goes
                // on the button rather than behind an `accessibilityElement(children: .ignore)`,
                // which leaves a `Button`'s own element — and so its derived label — in place.
                .accessibilityLabel(dayLabel(day))
                .accessibilityValue(Text(L.accessibilitySessionsCount(model.sessions(on: day).count)))
                .accessibilityAddTraits(day == selection ? [.isButton, .isSelected] : .isButton)
            }
        }
    }

    private var calendar: Calendar { model.calendar }

    private func dayLabel(_ day: Date) -> Text {
        Text(day, format: .fullDay(locale))
    }

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
