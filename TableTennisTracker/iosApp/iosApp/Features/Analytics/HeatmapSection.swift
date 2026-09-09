import SwiftUI

/// GitHub-style contribution heatmap of training days.
///
/// A plain `LazyHGrid` of week columns rather than a calendar library: the Compose UI uses
/// kizitonwose's `HeatMapCalendar`, which has no iOS equivalent, and the layout is simple enough
/// that a grid is less code than a bridge would be. The bucketing itself lives in `:core` so both
/// heatmaps shade identically.
struct HeatmapSection: View {
    let model: AnalyticsModel

    private static let minimumWeeks = 26
    private static let maximumWeeks = 53
    static let cell = 14.0
    private static let spacing = 3.0

    @State private var weeksShown = minimumWeeks

    /// The day window, rebuilt only when something it depends on changes.
    ///
    /// It was a computed property, which meant re-deriving up to a year of `Date`s on every body
    /// pass — and this section lives in a `List` that re-runs `body` as it scrolls. Both inputs are
    /// state this view can watch, so there is no source of staleness the `onChange` pair misses.
    @State private var days: [Date] = []

    @Environment(\.scenePhase) private var scenePhase

    var body: some View {
        Section(L.analyticsHeatmapTitle) {
            if model.sessionsByDay.isEmpty {
                ContentUnavailableView(L.analyticsNoTraining, systemImage: "square.grid.3x3")
            } else {
                grid
                HeatmapLegend()
            }
        }
        .onChange(of: weeksShown, initial: true) { rebuildDays() }
        .onChange(of: model.firstWeekday) { rebuildDays() }
        // The window ends on today, so it has to be re-anchored after the app has been left open
        // overnight — the same reason `SessionsModel.refreshToday` runs on every foreground.
        .onChange(of: scenePhase) { _, phase in
            if phase == .active { rebuildDays() }
        }
    }

    private var grid: some View {
        ScrollView(.horizontal) {
            LazyHGrid(
                rows: Array(repeating: GridItem(.fixed(Self.cell), spacing: Self.spacing), count: 7),
                spacing: Self.spacing
            ) {
                ForEach(days, id: \.self) { day in
                    HeatmapCell(
                        day: day,
                        level: model.heatmapLevel(on: day),
                        sessions: model.sessionCount(on: day)
                    )
                }
            }
            .frame(height: Self.cell * 7 + Self.spacing * 6)
        }
        .scrollIndicators(.hidden)
        .defaultScrollAnchor(.trailing)
        // Measured as a column count, not a width: the count settles after a few steps of a resize
        // drag, and rebuilding a year of days on every frame of one would not.
        .onGeometryChange(for: Int.self) { Self.weeks(fitting: $0.size.width) } action: { weeksShown = $0 }
    }

    /// As much history as fits at once, between half a year and a whole one. A phone gets the 26
    /// weeks it always had and still scrolls for the rest; a wide layout fills the row instead of
    /// pinning a short grid to one edge of it.
    private static func weeks(fitting width: Double) -> Int {
        let fitting = Int((width + spacing) / (cell + spacing))
        return min(maximumWeeks, max(minimumWeeks, fitting))
    }

    /// Every day in the window, oldest first, ending on a partial current week so each grid column
    /// is one week — aligned to the user's first day of week, not the system's.
    private func rebuildDays() {
        let calendar = Calendar.days(firstWeekday: model.firstWeekday)
        let today = calendar.startOfDay(for: .now)
        let daysIntoWeek = (calendar.component(.weekday, from: today) - calendar.firstWeekday + 7) % 7
        let total = weeksShown * 7 + daysIntoWeek
        days = (0..<total).reversed().compactMap { calendar.date(byAdding: .day, value: -$0, to: today) }
    }
}
