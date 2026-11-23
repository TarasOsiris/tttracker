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
                        Text(model.summary.matchesWon, format: .integer)
                            .font(.caption).bold()
                            .foregroundStyle(Color.onMatchWin)
                    }

                    SectorMark(
                        angle: .value(L.analyticsLosses, model.summary.matchesLost),
                        innerRadius: .ratio(0.6),
                        angularInset: 1.5
                    )
                    .foregroundStyle(Color.matchLoss)
                    .annotation(position: .overlay) {
                        Text(model.summary.matchesLost, format: .integer)
                            .font(.caption).bold()
                            .foregroundStyle(Color.onMatchLoss)
                    }
                }
                .chartBackground { proxy in
                    GeometryReader { geometry in
                        if let plotFrame = proxy.plotFrame {
                            let frame = geometry[plotFrame]
                            winRateLabel
                                .frame(maxWidth: min(frame.width, frame.height) * 0.5)
                                .position(x: frame.midX, y: frame.midY)
                        }
                    }
                }
                .frame(height: isWide ? 240 : 180)
                // A pie chart of two slices is a fact, not something to explore cell by cell.
                .accessibilityElement(children: .ignore)
                .accessibilityLabel(L.analyticsWinLossChart)
                .accessibilityValue(accessibilityValue)

                HStack(spacing: 16) {
                    LegendDot(color: .matchWin, label: L.analyticsWins)
                    LegendDot(color: .matchLoss, label: L.analyticsLosses)
                }
                .frame(maxWidth: .infinity)
            }
        }
    }

    private var accessibilityValue: Text {
        let record = Text(L.matchScoreFormat(model.summary.matchesWon, model.summary.matchesLost))
        guard let rate = model.summary.winRate else { return record }
        return record + Text(verbatim: ", ") + Text(L.analyticsWinRate) + Text(verbatim: " ")
            + Text(rate, format: .wholePercent)
    }

    @ViewBuilder private var winRateLabel: some View {
        if let rate = model.summary.winRate {
            VStack(spacing: 0) {
                Text(rate, format: .wholePercent)
                    .font(.title2.bold())
                    .monospacedDigit()
                Text(L.analyticsWinRate)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                    .lineLimit(2)
                    .minimumScaleFactor(0.8)
            }
        }
    }
}
