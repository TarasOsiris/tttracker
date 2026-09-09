import SwiftUI

/// The total and average under the weekly chart.
struct WeeklyTotals: View {
    let total: Int
    let average: Int

    var body: some View {
        VStack(spacing: 2) {
            WeeklyTotalRow(label: L.analyticsWeeklyTotal, minutes: total)
            WeeklyTotalRow(label: L.analyticsWeeklyAvg, minutes: average)
        }
        .font(.caption)
    }
}

private struct WeeklyTotalRow: View {
    let label: String
    let minutes: Int

    var body: some View {
        LabeledContent {
            Text(minutes.trainingDuration, format: .trainingDuration)
        } label: {
            Text(label).foregroundStyle(.secondary)
        }
    }
}
