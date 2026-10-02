import Shared

/// Mirrors `AnalyticsWidget`: a section of the analytics screen. Named for a card rather than a
/// widget here, where "widget" already means the Home Screen ones. See `KotlinEnumParity.swift`.
enum AnalyticsCard: String, CaseIterable, Identifiable {
    case summary = "SUMMARY"
    case winLoss = "WIN_LOSS"
    case weekly = "WEEKLY"
    case heatmap = "HEATMAP"
    case streak = "STREAK"
    case trainingLoad = "TRAINING_LOAD"
    case sessionTypes = "SESSION_TYPES"
    case headToHead = "HEAD_TO_HEAD"

    var id: String { rawValue }

    init?(_ kotlin: AnalyticsWidget) { self.init(rawValue: kotlin.name) }

    var kotlin: AnalyticsWidget {
        switch self {
        case .summary: .summary
        case .winLoss: .winLoss
        case .weekly: .weekly
        case .heatmap: .heatmap
        case .streak: .streak
        case .trainingLoad: .trainingLoad
        case .sessionTypes: .sessionTypes
        case .headToHead: .headToHead
        }
    }

    /// The Pro insights. Without Pro they share one locked preview.
    var isInsight: Bool { kotlin.isInsight }

    var label: String {
        switch self {
        case .summary: L.analyticsWidgetSummary
        case .winLoss: L.analyticsWidgetWinLoss
        case .weekly: L.analyticsWidgetWeekly
        case .heatmap: L.analyticsWidgetHeatmap
        case .streak: L.analyticsWidgetStreak
        case .trainingLoad: L.analyticsTrainingLoad
        case .sessionTypes: L.analyticsSessionTypes
        case .headToHead: L.analyticsHeadToHead
        }
    }
}

/// One row of the analytics card settings: a card and whether it is on screen.
struct AnalyticsCardSetting: Identifiable, Equatable {
    let card: AnalyticsCard
    var isVisible: Bool

    var id: AnalyticsCard { card }

    init(card: AnalyticsCard, isVisible: Bool) {
        self.card = card
        self.isVisible = isVisible
    }

    init?(_ kotlin: AnalyticsWidgetSetting) {
        guard let card = AnalyticsCard(kotlin.widget) else { return nil }
        self.init(card: card, isVisible: kotlin.visible)
    }

    var kotlin: AnalyticsWidgetSetting { AnalyticsWidgetSetting(widget: card.kotlin, visible: isVisible) }
}
