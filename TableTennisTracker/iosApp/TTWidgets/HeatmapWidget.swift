import SwiftUI
import WidgetKit

/// The analytics screen's contribution grid, sized to whatever the family gives it.
struct HeatmapWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: WidgetKind.heatmap, provider: SnapshotProvider()) { entry in
            HeatmapWidgetView(snapshot: entry.snapshot)
                .widgetEntry(entry.snapshot, opens: DeepLink.analytics)
        }
        .configurationDisplayName(Text(L.widgetHeatmapName))
        .description(Text(L.widgetHeatmapDescription))
        .supportedFamilies([.systemMedium, .systemLarge])
    }
}

struct HeatmapWidgetView: View {
    let snapshot: WidgetSnapshot

    /// The days that had sessions, indexed. Built once here rather than as a computed property: the
    /// grid asks for up to a year of cells and `body` re-runs on every layout pass, so rebuilding
    /// the dictionary per read was hundreds of copies of it inside a process with a 30 MB budget.
    private let byDay: [Date: WidgetSnapshot.DayLoad]

    @Environment(\.widgetFamily) private var family
    @Environment(\.locale) private var locale

    init(snapshot: WidgetSnapshot) {
        self.snapshot = snapshot
        byDay = Dictionary(snapshot.days.map { ($0.date, $0) }, uniquingKeysWith: { _, last in last })
    }

    private static let spacing = 2.0
    private static let bandGap = 8.0

    /// A widget cannot scroll, so the window is whatever fits. Seven rows is fixed, which leaves
    /// only the cell size to trade against how many weeks are shown — and a large family is much
    /// taller than a medium without being any wider. Rather than draw one band of enormous cells,
    /// a large stacks two chronological bands and shows twice the history.
    private var bandCount: Int { family == .systemLarge ? 2 : 1 }

    var body: some View {
        if snapshot.isEmpty {
            WidgetEmpty()
        } else {
            VStack(alignment: .leading, spacing: 6) {
                Text(L.analyticsHeatmapTitle)
                    .font(.caption).bold()
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
                grid
                if family == .systemLarge {
                    legend
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        }
    }

    private var grid: some View {
        GeometryReader { proxy in
            let cell = self.cell(forHeight: proxy.size.height)
            let columns = Self.columns(fitting: proxy.size.width, cell: cell)
            VStack(alignment: .leading, spacing: Self.bandGap) {
                ForEach(bands(columns: columns), id: \.self) { days in
                    band(days, cell: cell)
                }
            }
        }
    }

    private func band(_ days: [Date], cell: Double) -> some View {
        LazyHGrid(
            rows: Array(repeating: GridItem(.fixed(cell), spacing: Self.spacing), count: 7),
            spacing: Self.spacing
        ) {
            ForEach(days, id: \.self) { day in
                let load = byDay[day]
                RoundedRectangle(cornerRadius: cell / 4)
                    .fill(Color.heatmap(level: load?.level ?? 0))
                    .frame(width: cell, height: cell)
                    .accessibilityLabel(Text(day, format: .fullDay(locale)))
                    .accessibilityValue(Text(L.accessibilitySessionsCount(load?.sessions ?? 0)))
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private var legend: some View {
        HStack(spacing: 4) {
            Text(L.analyticsHeatmapLess).font(.caption2).foregroundStyle(.secondary)
            ForEach(0...4, id: \.self) { level in
                RoundedRectangle(cornerRadius: 2).fill(Color.heatmap(level: level))
                    .frame(width: 8, height: 8)
            }
            Text(L.analyticsHeatmapMore).font(.caption2).foregroundStyle(.secondary)
        }
        .accessibilityHidden(true)
    }

    /// The window split into bands, oldest first, each exactly `columns` wide.
    ///
    /// `heatmapDays` returns whole weeks *plus* the current partial one, so asking for a week less
    /// than the total is what makes the last band come to `columns` rather than one column more —
    /// and a widget has no scroll view to absorb an extra column, it just clips it.
    private func bands(columns: Int) -> [[Date]] {
        let all = Calendar.days(firstWeekday: snapshot.firstWeekday)
            .heatmapDays(weeks: columns * bandCount - 1, endingOn: .now)
        var remaining = all[...]
        return (0..<bandCount).map { band in
            let size = band == bandCount - 1 ? remaining.count : min(columns * 7, remaining.count)
            defer { remaining = remaining.dropFirst(size) }
            return Array(remaining.prefix(size))
        }
    }

    private func cell(forHeight height: Double) -> Double {
        let band = (height - Self.bandGap * Double(bandCount - 1)) / Double(bandCount)
        return max(4, (band - Self.spacing * 6) / 7)
    }

    private static func columns(fitting width: Double, cell: Double) -> Int {
        max(4, Int((width + spacing) / (cell + spacing)))
    }
}

#Preview("Medium", as: .systemMedium) {
    HeatmapWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
    SnapshotEntry(date: .now, snapshot: .placeholder)
}

#Preview("Large", as: .systemLarge) {
    HeatmapWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
}
