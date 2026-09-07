import SwiftUI

/// GitHub-style contribution heatmap of training days.
///
/// A plain `LazyHGrid` of week columns rather than a calendar library: the Compose UI uses
/// kizitonwose's `HeatMapCalendar`, which has no iOS equivalent, and the layout is simple enough
/// that a grid is less code than a bridge would be. The bucketing itself lives in `:core` so both
/// heatmaps shade identically.
struct HeatmapSection: View {
    let model: AnalyticsModel

    private static let weeksShown = 26
    private static let cell: CGFloat = 14
    private static let spacing: CGFloat = 3

    var body: some View {
        Section(L.analyticsHeatmapTitle) {
            if model.sessionsByDay.isEmpty {
                ContentUnavailableView(L.analyticsNoTraining, systemImage: "square.grid.3x3")
            } else {
                grid
                legend
            }
        }
    }

    private var grid: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            LazyHGrid(
                rows: Array(repeating: GridItem(.fixed(Self.cell), spacing: Self.spacing), count: 7),
                spacing: Self.spacing
            ) {
                ForEach(days, id: \.self) { day in
                    RoundedRectangle(cornerRadius: 3)
                        .fill(color(forLevel: model.heatmapLevel(on: day)))
                        .frame(width: Self.cell, height: Self.cell)
                        .accessibilityLabel(
                            "\(day.formatted(date: .abbreviated, time: .omitted)): \(model.sessionCount(on: day))"
                        )
                }
            }
            .frame(height: Self.cell * 7 + Self.spacing * 6)
        }
        .defaultScrollAnchor(.trailing)
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

    /// Every day in the window, oldest first, ending on a partial current week so each grid column
    /// is one week — aligned to the user's first day of week, not the system's.
    private var days: [Date] {
        var calendar = Calendar.gregorian
        calendar.firstWeekday = model.firstWeekday

        let today = calendar.startOfDay(for: .now)
        let daysIntoWeek = (calendar.component(.weekday, from: today) - calendar.firstWeekday + 7) % 7
        let total = Self.weeksShown * 7 + daysIntoWeek
        return (0..<total).reversed().compactMap { calendar.date(byAdding: .day, value: -$0, to: today) }
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
}
