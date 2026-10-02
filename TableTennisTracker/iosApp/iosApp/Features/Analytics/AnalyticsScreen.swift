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
            ForEach(rows) { row in
                switch row {
                case .card(let card): section(for: card)
                case .pairedCharts: PairedChartsSection(model: model)
                case .lockedInsights: LockedInsightsSection(model: insights, isWide: isWide)
                }
            }
        }
        .accessibilityIdentifier("screen.analytics")
        .navigationTitle(L.navAnalytics)
        .proToolbarButton()
        .settingsToolbarButton()
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button(L.analyticsSettingsTitle, systemImage: "slider.horizontal.3") { showsSettings = true }
            }
        }
        .sheet(isPresented: $showsSettings) { AnalyticsSettingsSheet(model: model) }
        // A refund or an expired sandbox purchase takes the longer ranges with it.
        .onChange(of: pro?.hasProFeatures) { _, hasPro in
            if hasPro != true && model.weeklyRange.needsPro { model.weeklyRange = .eightWeeks }
        }
    }

    private enum Row: Hashable, Identifiable {
        case card(AnalyticsCard)
        case pairedCharts
        case lockedInsights

        var id: Self { self }
    }

    /// The shown cards, in the user's order, as the screen lays them out. Two things merge cards:
    /// a wide layout puts the win/loss and weekly charts side by side when they are next to each
    /// other, and without Pro the insights collapse into one locked preview where the first of them
    /// would have been.
    private var rows: [Row] {
        let hasPro = pro?.hasProFeatures == true
        let cards = model.shownCards(hasPro: hasPro)
        var rows: [Row] = []
        var index = 0
        while index < cards.count {
            let card = cards[index]
            let next = cards.indices.contains(index + 1) ? cards[index + 1] : nil
            if card.isInsight && !hasPro {
                if !rows.contains(.lockedInsights) { rows.append(.lockedInsights) }
            } else if isWide, let next, Set([card, next]) == [.winLoss, .weekly] {
                rows.append(.pairedCharts)
                index += 1
            } else {
                rows.append(.card(card))
            }
            index += 1
        }
        return rows
    }

    @ViewBuilder private func section(for card: AnalyticsCard) -> some View {
        switch card {
        case .summary: SummarySection(model: model, isWide: isWide)
        case .winLoss: Section(L.analyticsWinLossChart) { WinLossChart(model: model, isWide: isWide) }
        case .weekly: Section(L.analyticsWeeklyTraining) { WeeklyChart(model: model, isWide: isWide) }
        case .heatmap: HeatmapSection(model: model)
        case .streak: StreakSection(model: insights, isWide: isWide)
        case .trainingLoad: TrainingLoadSection(model: insights, isWide: isWide)
        case .sessionTypes: SessionTypesSection(model: insights)
        case .headToHead: HeadToHeadSection(model: insights)
        }
    }
}
