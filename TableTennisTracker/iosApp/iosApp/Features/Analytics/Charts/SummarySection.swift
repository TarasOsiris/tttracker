import SwiftUI

/// The four headline tiles at the top of the analytics screen.
struct SummarySection: View {
    let model: AnalyticsModel
    let isWide: Bool

    var body: some View {
        Section(L.analyticsSummary) {
            LazyVGrid(columns: columns, spacing: 12) {
                StatTile(
                    emoji: "🏓",
                    value: Text(model.summary.totalSessions, format: .integer),
                    label: L.analyticsTotalSessions
                )
                StatTile(
                    emoji: "⏱️",
                    value: Text(
                        model.summary.totalMinutes.trainingDuration,
                        format: .trainingDuration
                    ),
                    label: L.analyticsTotalTime
                )
                StatTile(
                    emoji: "🏆",
                    value: Text(
                        L.matchScoreFormat(model.summary.matchesWon, model.summary.matchesLost)
                    ),
                    label: L.analyticsWinLoss
                )
                StatTile(emoji: "📈", value: winRate, label: L.analyticsWinRate, tint: winRateTint)
            }
            .padding(.vertical, 4)
        }
    }

    /// One row of four where the width allows it: four tiles two-up on an iPad leaves each of them
    /// wider than the number it holds needs, and pushes everything else down.
    private var columns: [GridItem] {
        Array(repeating: GridItem(.flexible(), spacing: 12), count: isWide ? 4 : 2)
    }

    private var winRate: Text {
        guard let rate = model.summary.winRate else { return Text(verbatim: "—") }
        return Text(rate, format: .wholePercent)
    }

    private var winRateTint: Color? {
        guard let rate = model.summary.winRate else { return nil }
        return rate >= 0.5 ? .matchWin : .matchLoss
    }
}
