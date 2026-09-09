import Charts
import SwiftUI

struct WinLossChart: View {
    let model: AnalyticsModel
    let isWide: Bool

    var body: some View {
        if model.summary.totalMatches == 0 {
            ContentUnavailableView(L.analyticsNoMatches, systemImage: "chart.pie")
        } else {
            VStack(spacing: 12) {
                Chart {
                    SectorMark(
                        angle: .value(L.analyticsWins, model.summary.matchesWon),
                        innerRadius: .ratio(0.6),
                        angularInset: 1.5
                    )
                    .foregroundStyle(Color.matchWin)
                    .annotation(position: .overlay) {
                        Text(model.summary.matchesWon, format: .integer).font(.caption).bold()
                    }

                    SectorMark(
                        angle: .value(L.analyticsLosses, model.summary.matchesLost),
                        innerRadius: .ratio(0.6),
                        angularInset: 1.5
                    )
                    .foregroundStyle(Color.matchLoss)
                    .annotation(position: .overlay) {
                        Text(model.summary.matchesLost, format: .integer).font(.caption).bold()
                    }
                }
                .frame(height: isWide ? 240 : 180)
                // A pie chart of two slices is a fact, not something to explore cell by cell.
                .accessibilityElement(children: .ignore)
                .accessibilityLabel(L.analyticsWinLossChart)
                .accessibilityValue(
                    Text(L.matchScoreFormat(model.summary.matchesWon, model.summary.matchesLost))
                )

                HStack(spacing: 16) {
                    LegendDot(color: .matchWin, label: L.analyticsWins)
                    LegendDot(color: .matchLoss, label: L.analyticsLosses)
                }
                .frame(maxWidth: .infinity)
            }
        }
    }
}
