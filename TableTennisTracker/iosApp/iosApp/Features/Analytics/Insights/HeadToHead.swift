import SwiftUI

/// The opponents played most recently, with a way through to all of them.
struct HeadToHeadSection: View {
    let model: InsightsModel

    private static let shown = 5

    var body: some View {
        Section(L.analyticsHeadToHead) {
            if model.opponents.isEmpty {
                ContentUnavailableView(L.analyticsNoMatches, systemImage: "person.2")
            } else {
                ForEach(model.opponents.prefix(Self.shown)) { HeadToHeadRow(record: $0) }
                if model.opponents.count > Self.shown {
                    NavigationLink(L.analyticsHeadToHeadAll) { HeadToHeadScreen(model: model) }
                        .accessibilityIdentifier("analytics.headToHeadAll")
                }
            }
        }
    }
}

struct HeadToHeadScreen: View {
    let model: InsightsModel

    var body: some View {
        List(model.opponents) { HeadToHeadRow(record: $0) }
            .navigationTitle(L.analyticsHeadToHead)
            .navigationBarTitleDisplayMode(.inline)
    }
}

struct HeadToHeadRow: View {
    let record: HeadToHead

    var body: some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 2) {
                Text(record.name)
                Text(L.analyticsGamesFormat(record.gamesWon, record.gamesLost))
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
            Spacer(minLength: 8)
            VStack(alignment: .trailing, spacing: 6) {
                RecordBadge(wins: record.wins, losses: record.losses)
                RecentForm(results: record.recentResults)
            }
        }
        .padding(.vertical, 2)
        .accessibilityElement(children: .combine)
    }
}

/// Wins and losses, coloured by which is ahead; level is neither colour.
struct RecordBadge: View {
    let wins: Int
    let losses: Int

    var body: some View {
        Text(L.matchScoreFormat(wins, losses))
            .font(.caption.weight(.bold))
            .monospacedDigit()
            .foregroundStyle(foreground)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(background, in: .capsule)
    }

    private var foreground: Color {
        if wins > losses { return .onMatchWin }
        if wins < losses { return .onMatchLoss }
        return .primary
    }

    private var background: Color {
        if wins > losses { return .matchWin }
        if wins < losses { return .matchLoss }
        return Color(.tertiarySystemFill)
    }
}

/// The last few results as dots, oldest on the left.
private struct RecentForm: View {
    let results: [Bool]

    var body: some View {
        HStack(spacing: 3) {
            ForEach(Array(results.enumerated()), id: \.offset) { _, isWin in
                Circle()
                    .fill(isWin ? Color.matchWin : Color.matchLoss)
                    .frame(width: 7, height: 7)
            }
        }
        .accessibilityHidden(true)
    }
}
