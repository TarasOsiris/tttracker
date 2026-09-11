import SwiftUI
import WidgetKit

/// The analytics screen's headline totals, on the Home Screen and the Lock Screen.
struct SummaryWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: WidgetKind.summary, provider: SnapshotProvider()) { entry in
            SummaryWidgetView(snapshot: entry.snapshot)
                .widgetEntry(entry.snapshot, opens: DeepLink.analytics)
        }
        .configurationDisplayName(Text(L.widgetSummaryName))
        .description(Text(L.widgetSummaryDescription))
        .supportedFamilies([
            .systemSmall, .systemMedium, .systemLarge, .accessoryRectangular, .accessoryCircular,
        ])
    }
}

struct SummaryWidgetView: View {
    let snapshot: WidgetSnapshot

    @Environment(\.widgetFamily) private var family

    private var summary: Summary { snapshot.summary }

    var body: some View {
        if snapshot.isEmpty, family != .accessoryCircular {
            WidgetEmpty()
        } else {
            switch family {
            case .accessoryCircular: circular
            case .accessoryRectangular: rectangular
            case .systemSmall: small
            case .systemLarge: large
            default: medium
            }
        }
    }

    private var small: some View {
        VStack(spacing: 6) {
            winRate.font(.system(size: 40, weight: .semibold, design: .rounded))
                .foregroundStyle(winRateTint ?? .primary)
            Text(L.analyticsWinRate).font(.caption).foregroundStyle(.secondary)
            Text(record).font(.caption2).foregroundStyle(.secondary)
        }
        .accessibilityElement(children: .combine)
    }

    /// Two by two rather than a single row of four: a medium widget is twice as tall as it is
    /// dense, and a row leaves most of it empty.
    private var tiles: some View {
        Grid(horizontalSpacing: 10, verticalSpacing: 10) {
            GridRow {
                WidgetStat(value: Text(summary.totalSessions, format: .integer), label: L.analyticsTotalSessions)
                WidgetStat(
                    value: Text(summary.totalMinutes.trainingDuration, format: .trainingDuration),
                    label: L.analyticsTotalTime
                )
            }
            GridRow {
                WidgetStat(value: Text(record), label: L.analyticsWinLoss)
                WidgetStat(value: winRate, label: L.analyticsWinRate, tint: winRateTint)
            }
        }
    }

    private var medium: some View {
        tiles.frame(maxHeight: .infinity)
    }

    private var large: some View {
        VStack(spacing: 12) {
            tiles
            Divider()
            if let last = snapshot.lastSession {
                LastSessionDetail(session: last, palette: snapshot.palette)
            }
            Spacer(minLength: 0)
        }
    }

    private var rectangular: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(L.analyticsWinRate).font(.caption2).foregroundStyle(.secondary)
            winRate.font(.title3).bold()
            Text(record).font(.caption2)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .accessibilityElement(children: .combine)
    }

    /// A gauge rather than a number: the ring is the only thing legible at this size, and a win
    /// rate is already a 0…1 fraction.
    private var circular: some View {
        Gauge(value: summary.winRate ?? 0) {
            Image(systemName: "figure.table.tennis")
        } currentValueLabel: {
            winRate.minimumScaleFactor(0.6)
        }
        .gaugeStyle(.accessoryCircularCapacity)
        .accessibilityLabel(L.analyticsWinRate)
    }

    private var record: String { L.matchScoreFormat(summary.matchesWon, summary.matchesLost) }

    private var winRate: Text {
        guard let rate = summary.winRate else { return Text(verbatim: "—") }
        return Text(rate, format: .wholePercent)
    }

    private var winRateTint: Color? {
        guard let rate = summary.winRate else { return nil }
        return rate >= 0.5 ? snapshot.palette.matchWinText : snapshot.palette.matchLossText
    }
}

#Preview("Small", as: .systemSmall) {
    SummaryWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
}

#Preview("Medium", as: .systemMedium) {
    SummaryWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
    SnapshotEntry(date: .now, snapshot: .placeholder)
}

#Preview("Large", as: .systemLarge) {
    SummaryWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
}

#Preview("Rectangular", as: .accessoryRectangular) {
    SummaryWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
}

#Preview("Circular", as: .accessoryCircular) {
    SummaryWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
}
