import Foundation
import WidgetKit

struct SnapshotEntry: TimelineEntry {
    let date: Date
    let snapshot: WidgetSnapshot
}

/// Reads the App Group snapshot the app writes. There is nothing to schedule ahead: the data only
/// changes when the user logs something, and the app reloads the timelines when it does.
///
/// The one thing that moves on its own is the calendar — the heatmap ends on today, and "last
/// session" is read relative to it — so the timeline is refreshed at the next midnight.
struct SnapshotProvider: TimelineProvider {
    func placeholder(in context: Context) -> SnapshotEntry {
        SnapshotEntry(date: .now, snapshot: WidgetStore.read() ?? .sample)
    }

    func getSnapshot(in context: Context, completion: @escaping (SnapshotEntry) -> Void) {
        completion(current())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SnapshotEntry>) -> Void) {
        completion(Timeline(entries: [current()], policy: .after(Self.nextMidnight)))
    }

    private func current() -> SnapshotEntry {
        let snapshot = WidgetStore.read() ?? .placeholder
        // Here rather than in a view: `body` runs for every family and should not have side
        // effects, and the whole process shares one localization.
        snapshot.applyLocalization()
        return SnapshotEntry(date: .now, snapshot: snapshot)
    }

    private static var nextMidnight: Date {
        let calendar = Calendar.gregorian
        let tomorrow = calendar.date(byAdding: .day, value: 1, to: .now) ?? .now.addingTimeInterval(86_400)
        return calendar.startOfDay(for: tomorrow)
    }
}
