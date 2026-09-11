import SwiftUI
import WidgetKit

/// When the user last trained, and how it went.
struct LastSessionWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: WidgetKind.lastSession, provider: SnapshotProvider()) { entry in
            LastSessionWidgetView(snapshot: entry.snapshot)
                .widgetEntry(entry.snapshot, opens: entry.snapshot.lastSession.map {
                    DeepLink.session($0.id)
                } ?? DeepLink.newSession)
        }
        .configurationDisplayName(Text(L.widgetLastSessionName))
        .description(Text(L.widgetLastSessionDescription))
        .supportedFamilies([.systemSmall, .systemMedium, .accessoryRectangular])
    }
}

struct LastSessionWidgetView: View {
    let snapshot: WidgetSnapshot

    @Environment(\.widgetFamily) private var family

    var body: some View {
        if let session = snapshot.lastSession {
            switch family {
            case .accessoryRectangular: rectangular(session)
            default: LastSessionDetail(session: session, palette: snapshot.palette, isCompact: family == .systemSmall)
            }
        } else {
            WidgetEmpty()
        }
    }

    private func rectangular(_ session: WidgetSnapshot.LastSession) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(session.date, format: .dateTime.weekday(.abbreviated).day().month(.abbreviated))
                .font(.caption2)
                .foregroundStyle(.secondary)
            Text(session.minutes.trainingDuration, format: .trainingDuration).font(.headline)
            Text(record(session)).font(.caption2)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .accessibilityElement(children: .combine)
    }

    private func record(_ session: WidgetSnapshot.LastSession) -> String {
        session.matchCount == 0
            ? L.widgetNoMatches
            : L.matchScoreFormat(session.matchesWon, session.matchesLost)
    }
}

/// The session's facts, shared by the last-session widget and the large summary.
struct LastSessionDetail: View {
    let session: WidgetSnapshot.LastSession
    let palette: Palette
    var isCompact = false

    @Environment(\.locale) private var locale

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(spacing: 6) {
                Circle().fill(palette.sessionType(session.kind)).frame(width: 8, height: 8)
                Text(session.kindLabel ?? L.sessionDefaultTitle)
                    .font(.caption).bold()
                    .lineLimit(1)
                Spacer(minLength: 0)
                rpeBadge
            }
            Text(session.date, format: .dateTime.weekday(.wide).day().month(.abbreviated))
                .font(.caption2)
                .foregroundStyle(.secondary)
            Text(session.minutes.trainingDuration, format: .trainingDuration)
                .font(isCompact ? .title3 : .title2).bold()
            matches
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private var rpeBadge: some View {
        Text(session.rpe, format: .integer)
            .font(.caption2).bold()
            .monospacedDigit()
            .foregroundStyle(palette.rpeInk(session.rpe))
            .frame(width: 20, height: 20)
            .background(palette.rpe(session.rpe), in: .circle)
            .accessibilityLabel(L.labelRpe)
            .accessibilityValue(Text(session.rpe, format: .integer))
    }

    @ViewBuilder private var matches: some View {
        if session.matchCount == 0 {
            Text(L.widgetNoMatches).font(.caption2).foregroundStyle(.secondary)
        } else {
            HStack(spacing: 6) {
                Text(L.matchScoreFormat(session.matchesWon, session.matchesLost))
                    .font(.caption).bold()
                    .foregroundStyle(
                        session.matchesWon >= session.matchesLost
                            ? palette.matchWinText
                            : palette.matchLossText
                    )
                if !isCompact, let opponent = session.opponent, let score = session.topScore {
                    Text(verbatim: "\(opponent) \(score)")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
            }
            .accessibilityElement(children: .combine)
            .accessibilityLabel(L.analyticsWinLoss)
        }
    }
}

#Preview("Small", as: .systemSmall) {
    LastSessionWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
}

#Preview("Medium", as: .systemMedium) {
    LastSessionWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
    SnapshotEntry(date: .now, snapshot: .placeholder)
}

#Preview("Rectangular", as: .accessoryRectangular) {
    LastSessionWidget()
} timeline: {
    SnapshotEntry(date: .now, snapshot: .sample)
}
