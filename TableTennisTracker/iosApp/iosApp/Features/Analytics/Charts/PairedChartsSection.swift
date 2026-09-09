import SwiftUI

/// Both charts in one row, for layouts wide enough to hold them. A `Section` header names a whole
/// row, so each chart carries its own title here instead.
struct PairedChartsSection: View {
    let model: AnalyticsModel

    var body: some View {
        Section {
            HStack(alignment: .top, spacing: 32) {
                ChartPanel(title: L.analyticsWinLossChart) {
                    WinLossChart(model: model, isWide: true)
                }
                ChartPanel(title: L.analyticsWeeklyTraining) {
                    WeeklyChart(model: model, isWide: true)
                }
            }
            .padding(.vertical, 8)
        }
    }
}
