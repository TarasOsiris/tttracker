import SwiftUI
import WidgetKit

/// What a Pro widget shows when it was placed without Pro: what it is, and that the app unlocks it.
/// The tap goes to the paywall, through `DeepLink.pro`.
struct ProWidgetLock: View {
    @Environment(\.widgetFamily) private var family

    var body: some View {
        switch family {
        case .accessoryCircular:
            Image(systemName: "crown.fill")
                .font(.title3)
                .accessibilityLabel(L.widgetProLocked)
        case .accessoryRectangular:
            Label(L.widgetProLocked, systemImage: "crown.fill")
                .font(.caption)
                .frame(maxWidth: .infinity, alignment: .leading)
        default:
            VStack(spacing: 6) {
                Image(systemName: "crown.fill").font(.title2).foregroundStyle(.tint)
                Text(L.proBannerTitle).font(.caption.bold())
                Text(L.widgetProLocked).font(.caption2).foregroundStyle(.secondary)
            }
            .multilineTextAlignment(.center)
        }
    }
}

extension View {
    /// `widgetEntry`, for a Pro widget: a locked one opens the paywall instead of `url`.
    func proWidgetEntry(_ entry: SnapshotEntry, opens url: URL) -> some View {
        widgetEntry(entry.snapshot, opens: entry.showsPro ? url : DeepLink.pro)
    }
}

extension SnapshotEntry {
    var showsPro: Bool { snapshot.hasPro || isPreview }
}
