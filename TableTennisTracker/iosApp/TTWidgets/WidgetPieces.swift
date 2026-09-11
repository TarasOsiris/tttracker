import SwiftUI
import WidgetKit

/// One headline number with a caption. The app's `StatTile` sits on a grouped-list background,
/// which a widget does not have.
struct WidgetStat: View {
    let value: Text
    let label: String
    var tint: Color?

    var body: some View {
        VStack(spacing: 2) {
            value.font(.headline).foregroundStyle(tint ?? .primary)
            Text(label)
                .font(.caption2)
                .foregroundStyle(.secondary)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
        }
        .frame(maxWidth: .infinity)
        // One tile is one fact; read as two elements it announces a bare number with no name.
        .accessibilityElement(children: .combine)
        .accessibilityLabel(label)
        .accessibilityValue(value)
    }
}

/// What every widget shows before the first session is logged: the invitation to log one, rather
/// than a wall of zeros.
struct WidgetEmpty: View {
    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: "figure.table.tennis").font(.title2).foregroundStyle(.secondary)
            Text(L.widgetEmpty).font(.caption).foregroundStyle(.secondary)
            Text(L.actionAddSession).font(.caption2).foregroundStyle(.tint)
        }
        .multilineTextAlignment(.center)
    }
}

extension View {
    /// The wrapping every widget entry needs: the app's language for dates and numbers, the
    /// system's widget background, and where a tap goes.
    func widgetEntry(_ snapshot: WidgetSnapshot, opens url: URL) -> some View {
        environment(\.locale, snapshot.locale)
            .widgetURL(snapshot.isEmpty ? DeepLink.newSession : url)
            .containerBackground(.fill.tertiary, for: .widget)
    }
}
