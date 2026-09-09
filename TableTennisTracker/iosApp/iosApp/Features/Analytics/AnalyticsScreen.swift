import SwiftUI

struct AnalyticsScreen: View {
    @StateModel private var model = AnalyticsModel()
    @State private var showsSettings = false

    @Environment(\.horizontalSizeClass) private var horizontalSizeClass

    /// Wide enough to put two charts beside each other instead of one below the other.
    private var isWide: Bool { horizontalSizeClass.isWide }

    var body: some View {
        List {
            if model.showSummary.value { SummarySection(model: model, isWide: isWide) }
            if isWide && model.showWinLoss.value && model.showWeekly.value {
                PairedChartsSection(model: model)
            } else {
                if model.showWinLoss.value {
                    Section(L.analyticsWinLossChart) { WinLossChart(model: model, isWide: isWide) }
                }
                if model.showWeekly.value {
                    Section(L.analyticsWeeklyTraining) { WeeklyChart(model: model, isWide: isWide) }
                }
            }
            if model.showHeatmap.value { HeatmapSection(model: model) }
        }
        .accessibilityIdentifier("screen.analytics")
        .navigationTitle(L.navAnalytics)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button(L.analyticsSettingsTitle, systemImage: "gearshape") { showsSettings = true }
            }
        }
        .sheet(isPresented: $showsSettings) { AnalyticsSettingsSheet(model: model) }
    }
}
