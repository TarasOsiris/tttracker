import SwiftUI

struct AnalyticsScreen: View {
    @StateModel private var model = AnalyticsModel()
    @StateModel private var insights = InsightsModel()
    @State private var showsSettings = false

    @Environment(ProModel.self) private var pro: ProModel?

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
            InsightsSections(model: insights, isWide: isWide)
        }
        .accessibilityIdentifier("screen.analytics")
        .navigationTitle(L.navAnalytics)
        .proToolbarButton()
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button(L.analyticsSettingsTitle, systemImage: "gearshape") { showsSettings = true }
            }
        }
        .sheet(isPresented: $showsSettings) { AnalyticsSettingsSheet(model: model) }
        // A refund or an expired sandbox purchase takes the longer ranges with it.
        .onChange(of: pro?.hasProFeatures) { _, hasPro in
            if hasPro != true && model.weeklyRange.needsPro { model.weeklyRange = .eightWeeks }
        }
    }
}
