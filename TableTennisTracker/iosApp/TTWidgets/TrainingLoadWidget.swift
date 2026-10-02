import Charts
import SwiftUI
import WidgetKit

/// This week's training load against the weeks before it. Pro.
struct TrainingLoadWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: WidgetKind.trainingLoad, provider: SnapshotProvider()) { entry in
            TrainingLoadWidgetView(entry: entry)
                .proWidgetEntry(entry, opens: DeepLink.analytics)
        }
        .configurationDisplayName(Text(L.widgetLoadName))
        .description(Text(L.widgetLoadDescription))
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct TrainingLoadWidgetView: View {
    let entry: SnapshotEntry

    @Environment(\.widgetFamily) private var family

    private var weeks: [WidgetSnapshot.WeekLoad] { entry.snapshot.weeks ?? [] }
    private var thisWeek: Int { weeks.last?.load ?? 0 }
    private var lastWeek: Int { weeks.dropLast().last?.load ?? 0 }

    var body: some View {
        if !entry.showsPro {
            ProWidgetLock()
        } else if entry.snapshot.isEmpty {
            WidgetEmpty()
        } else if family == .systemSmall {
            VStack(alignment: .leading, spacing: 8) {
                Text(L.widgetLoadName).font(.caption.bold()).foregroundStyle(.secondary)
                stat(thisWeek, label: L.widgetThisWeek, isCurrent: true)
                stat(lastWeek, label: L.widgetLastWeek, isCurrent: false)
                Spacer(minLength: 0)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        } else {
            HStack(spacing: 16) {
                VStack(alignment: .leading, spacing: 8) {
                    Text(L.widgetLoadName).font(.caption.bold()).foregroundStyle(.secondary)
                    stat(thisWeek, label: L.widgetThisWeek, isCurrent: true)
                    stat(lastWeek, label: L.widgetLastWeek, isCurrent: false)
                    Spacer(minLength: 0)
                }
                chart
            }
        }
    }

    private func stat(_ load: Int, label: String, isCurrent: Bool) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(load, format: .integer)
                .font(isCurrent ? .title2.bold() : .headline)
                .foregroundStyle(isCurrent ? AnyShapeStyle(.tint) : AnyShapeStyle(.primary))
            Text(label).font(.caption2).foregroundStyle(.secondary)
        }
        .accessibilityElement(children: .combine)
    }

    private var chart: some View {
        Chart(weeks) { week in
            BarMark(
                x: .value(L.widgetLoadName, week.start, unit: .weekOfYear),
                y: .value(L.widgetLoadName, week.load)
            )
            .foregroundStyle(week.id == weeks.last?.id ? AnyShapeStyle(.tint) : AnyShapeStyle(Color.secondary))
            .cornerRadius(3)
        }
        .chartXAxis(.hidden)
        .chartYAxis(.hidden)
        .accessibilityHidden(true)
    }
}

#Preview("Small", as: .systemSmall) {
    TrainingLoadWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
}

#Preview("Medium", as: .systemMedium) {
    TrainingLoadWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
    SnapshotEntry(date: .now, snapshot: .placeholder)
}
