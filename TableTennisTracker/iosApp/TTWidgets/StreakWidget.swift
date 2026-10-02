import SwiftUI
import WidgetKit

/// Weeks in a row with at least one session. Pro.
struct StreakWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: WidgetKind.streak, provider: SnapshotProvider()) { entry in
            StreakWidgetView(entry: entry)
                .proWidgetEntry(entry, opens: DeepLink.analytics)
        }
        .configurationDisplayName(Text(L.widgetStreakName))
        .description(Text(L.widgetStreakDescription))
        .supportedFamilies([.systemSmall, .accessoryRectangular, .accessoryCircular])
    }
}

struct StreakWidgetView: View {
    let entry: SnapshotEntry

    @Environment(\.widgetFamily) private var family

    private var snapshot: WidgetSnapshot { entry.snapshot }
    private var streak: WidgetSnapshot.Streak { snapshot.streak ?? .init(currentWeeks: 0, longestWeeks: 0) }

    var body: some View {
        if !entry.showsPro {
            ProWidgetLock(name: L.widgetStreakName, symbol: "flame.fill")
        } else if snapshot.isEmpty, family == .systemSmall {
            WidgetEmpty()
        } else {
            switch family {
            case .accessoryCircular: circular
            case .accessoryRectangular: rectangular
            default: small
            }
        }
    }

    private var small: some View {
        VStack(spacing: 4) {
            Text(verbatim: "🔥").font(.title2).accessibilityHidden(true)
            Text(streak.currentWeeks, format: .integer)
                .font(.system(size: 40, weight: .semibold, design: .rounded))
                .contentTransition(.numericText())
            Text(L.analyticsStreakCurrent).font(.caption).foregroundStyle(.secondary)
            WeekDots(weeks: snapshot.weeks ?? [])
                .padding(.top, 4)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(L.analyticsStreakCurrent)
        .accessibilityValue(weeks(streak.currentWeeks))
    }

    private var rectangular: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(L.analyticsStreakCurrent).font(.caption2).foregroundStyle(.secondary)
            weeks(streak.currentWeeks).font(.headline)
            HStack(spacing: 4) {
                Text(L.analyticsStreakLongest)
                weeks(streak.longestWeeks)
            }
            .font(.caption2)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .accessibilityElement(children: .combine)
    }

    private var circular: some View {
        VStack(spacing: 0) {
            Image(systemName: "flame.fill").font(.caption)
            Text(streak.currentWeeks, format: .integer).font(.title3.bold())
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(L.analyticsStreakCurrent)
    }

    private func weeks(_ count: Int) -> Text {
        Text(Duration.seconds(count * 7 * 24 * 60 * 60), format: .units(allowed: [.weeks], width: .wide))
    }
}

/// One dot per recent week, filled when anything was logged in it; the current week is last.
private struct WeekDots: View {
    let weeks: [WidgetSnapshot.WeekLoad]

    var body: some View {
        HStack(spacing: 4) {
            ForEach(weeks) { week in
                Circle()
                    .fill(week.sessions > 0 ? AnyShapeStyle(.tint) : AnyShapeStyle(.quaternary))
                    .frame(width: 8, height: 8)
            }
        }
        .accessibilityHidden(true)
    }
}

#Preview("Small", as: .systemSmall) {
    StreakWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
    SnapshotEntry(date: .now, snapshot: .placeholder)
}

#Preview("Rectangular", as: .accessoryRectangular) {
    StreakWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
}
