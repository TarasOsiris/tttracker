import SwiftUI

/// GitHub-style contribution heatmap of training days.
///
/// Built from a plain `LazyHGrid` of week columns rather than a calendar library: the Compose UI
/// uses kizitonwose's `HeatMapCalendar`, which has no iOS equivalent, and the layout is simple
/// enough that a grid is less code than a bridge would be.
struct HeatmapSection: View {
    let model: AnalyticsModel

    private static let weeksShown = 26
    private static let cell: CGFloat = 14
    private static let spacing: CGFloat = 3

    var body: some View {
        Section(L.analyticsHeatmapTitle) {
            if model.dailyLoad.isEmpty {
                ContentUnavailableView(L.analyticsNoTraining, systemImage: "square.grid.3x3")
            } else {
                ScrollView(.horizontal, showsIndicators: false) {
                    LazyHGrid(
                        rows: Array(repeating: GridItem(.fixed(Self.cell), spacing: Self.spacing), count: 7),
                        spacing: Self.spacing
                    ) {
                        ForEach(days, id: \.self) { day in
                            RoundedRectangle(cornerRadius: 3)
                                .fill(color(for: day))
                                .frame(width: Self.cell, height: Self.cell)
                                .accessibilityLabel(accessibilityLabel(for: day))
                        }
                    }
                    .frame(height: Self.cell * 7 + Self.spacing * 6)
                    // Newest column is on the right, so start scrolled to it.
                    .flipsForRightToLeftLayoutDirection(true)
                }
                .defaultScrollAnchor(.trailing)

                legend
            }
        }
    }

    private var legend: some View {
        HStack(spacing: Self.spacing) {
            Text(L.analyticsHeatmapLess).font(.caption2).foregroundStyle(.secondary)
            ForEach(0...4, id: \.self) { level in
                RoundedRectangle(cornerRadius: 3)
                    .fill(color(forLevel: level))
                    .frame(width: Self.cell, height: Self.cell)
            }
            Text(L.analyticsHeatmapMore).font(.caption2).foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .trailing)
    }

    /// Every day in the window, oldest first, aligned so each grid column is one calendar week.
    private var days: [Date] {
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: .now)
        guard let start = calendar.date(byAdding: .day, value: -(Self.weeksShown * 7 - 1), to: today)
        else { return [] }

        // Pad back to the start of that week so rows line up with weekdays.
        let weekday = calendar.component(.weekday, from: start)
        let offset = (weekday - calendar.firstWeekday + 7) % 7
        guard let aligned = calendar.date(byAdding: .day, value: -offset, to: start) else { return [] }

        return stride(from: 0, through: calendar.dateComponents([.day], from: aligned, to: today).day ?? 0, by: 1)
            .compactMap { calendar.date(byAdding: .day, value: $0, to: aligned) }
    }

    private var countsByDay: [Date: Int] {
        let calendar = Calendar.current
        return Dictionary(
            model.dailyLoad.map { (calendar.startOfDay(for: $0.date), $0.sessionCount) },
            uniquingKeysWith: +
        )
    }

    private func color(for day: Date) -> Color {
        color(forLevel: level(for: day))
    }

    /// Five buckets scaled against the busiest day, matching the Compose widget.
    private func level(for day: Date) -> Int {
        let count = countsByDay[Calendar.current.startOfDay(for: day)] ?? 0
        guard count > 0, model.busiestDay > 0 else { return 0 }
        let ratio = Double(count) / Double(model.busiestDay)
        return switch ratio {
        case ..<0.25: 1
        case ..<0.5: 2
        case ..<0.75: 3
        default: 4
        }
    }

    private func color(forLevel level: Int) -> Color {
        switch level {
        case 1: Color.accentColor.opacity(0.35)
        case 2: Color.accentColor.opacity(0.55)
        case 3: Color.accentColor.opacity(0.75)
        case 4: Color.accentColor
        default: Color(.tertiarySystemFill)
        }
    }

    private func accessibilityLabel(for day: Date) -> String {
        let count = countsByDay[Calendar.current.startOfDay(for: day)] ?? 0
        return "\(day.formatted(date: .abbreviated, time: .omitted)): \(count)"
    }
}
