import Charts
import SwiftUI

struct WeeklyChart: View {
    let model: AnalyticsModel
    let isWide: Bool

    var body: some View {
        if model.weekly.allSatisfy({ $0.minutes == 0 }) {
            ContentUnavailableView(L.analyticsNoTraining, systemImage: "chart.bar")
        } else {
            VStack(spacing: 8) {
                Chart(model.weekly) { week in
                    BarMark(
                        x: .value(L.analyticsWeeklyTraining, week.label),
                        y: .value(L.analyticsWeeklyTraining, week.minutes)
                    )
                    // The most recent week is the last entry; tint it so "now" stands out.
                    .foregroundStyle(week.id == model.weekly.count - 1 ? Color.accentColor : Color.secondary)
                    .cornerRadius(4)
                }
                .frame(height: isWide ? 220 : 160)

                WeeklyTotals(total: model.weeklyTotalMinutes, average: model.weeklyAverageMinutes)
            }
        }
    }
}
