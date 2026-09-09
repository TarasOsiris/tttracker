import SwiftUI

/// Which widgets the analytics screen shows.
struct AnalyticsSettingsSheet: View {
    let model: AnalyticsModel

    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                Toggle(L.analyticsWidgetSummary, isOn: model.showSummary.binding)
                Toggle(L.analyticsWidgetWinLoss, isOn: model.showWinLoss.binding)
                Toggle(L.analyticsWidgetWeekly, isOn: model.showWeekly.binding)
                Toggle(L.analyticsWidgetHeatmap, isOn: model.showHeatmap.binding)
            }
            .navigationTitle(L.analyticsSettingsTitle)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button(L.actionClose, action: dismiss.callAsFunction)
                }
            }
        }
        .presentationDetents([.medium])
    }
}
