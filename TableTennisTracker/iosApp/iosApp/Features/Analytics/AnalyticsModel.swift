import Foundation
import Observation
import Shared

/// One bar in the weekly chart.
struct WeeklyTraining: Identifiable {
    let id: Int
    let label: String
    let minutes: Int
}

/// One day in the training heatmap.
struct DailyLoad: Identifiable {
    let id: Int
    let date: Date
    let sessionCount: Int
    let minutes: Int
}

struct WidgetVisibility {
    var summary = true
    var winLoss = true
    var weekly = true
    var heatmap = true
}

@MainActor
@Observable
final class AnalyticsModel {
    private(set) var totalSessions = 0
    private(set) var totalMinutes = 0
    private(set) var matchesWon = 0
    private(set) var matchesLost = 0
    private(set) var weekly: [WeeklyTraining] = []
    private(set) var dailyLoad: [DailyLoad] = []
    private(set) var visibility = WidgetVisibility()

    var totalMatches: Int { matchesWon + matchesLost }

    var winRate: Double? {
        totalMatches > 0 ? Double(matchesWon) / Double(totalMatches) : nil
    }

    /// Busiest day, used to scale the heatmap's intensity buckets.
    var busiestDay: Int { dailyLoad.map(\.sessionCount).max() ?? 0 }

    @ObservationIgnored private let preferences: any UserPreferencesRepository
    @ObservationIgnored private let subscriptions = FlowSubscriptions()
    @ObservationIgnored private let writes = SerialWriteQueue()

    init(
        analytics: any TrainingAnalyticsService = Services.trainingAnalytics,
        preferences: any UserPreferencesRepository = Services.preferences
    ) {
        self.preferences = preferences

        subscriptions.insert(
            KotlinFlow.observe(analytics.summary, as: SummaryStats.self) { [weak self] stats in
                self?.totalSessions = Int(stats.totalSessions)
                self?.totalMinutes = Int(stats.totalTrainingMinutes)
                self?.matchesWon = Int(stats.matchesWon)
                self?.matchesLost = Int(stats.matchesLost)
            }
        )
        subscriptions.insert(
            KotlinFlow.observe(analytics.weeklyTraining, as: [WeeklyTrainingData].self) { [weak self] weeks in
                self?.weekly = weeks.enumerated().map { index, week in
                    WeeklyTraining(id: index, label: week.weekLabel, minutes: Int(week.totalMinutes))
                }
            }
        )
        subscriptions.insert(
            KotlinFlow.observe(analytics.dailyLoad, as: [DailyTrainingLoad].self) { [weak self] load in
                self?.dailyLoad = load.enumerated().compactMap { index, day in
                    guard let date = day.date.date else { return nil }
                    return DailyLoad(
                        id: index,
                        date: date,
                        sessionCount: Int(day.sessionCount),
                        minutes: Int(day.totalMinutes)
                    )
                }
            }
        )

        observeVisibility(preferences)
    }

    private func observeVisibility(_ preferences: any UserPreferencesRepository) {
        subscriptions.insert(KotlinFlow.observeBool(preferences.showAnalyticsSummary) { [weak self] in
            self?.visibility.summary = $0
        })
        subscriptions.insert(KotlinFlow.observeBool(preferences.showAnalyticsWinLoss) { [weak self] in
            self?.visibility.winLoss = $0
        })
        subscriptions.insert(KotlinFlow.observeBool(preferences.showAnalyticsWeekly) { [weak self] in
            self?.visibility.weekly = $0
        })
        subscriptions.insert(KotlinFlow.observeBool(preferences.showAnalyticsHeatmap) { [weak self] in
            self?.visibility.heatmap = $0
        })
    }

    func setSummaryVisible(_ show: Bool) {
        visibility.summary = show
        writes.enqueue { try await self.preferences.setShowAnalyticsSummary(show: show) }
    }

    func setWinLossVisible(_ show: Bool) {
        visibility.winLoss = show
        writes.enqueue { try await self.preferences.setShowAnalyticsWinLoss(show: show) }
    }

    func setWeeklyVisible(_ show: Bool) {
        visibility.weekly = show
        writes.enqueue { try await self.preferences.setShowAnalyticsWeekly(show: show) }
    }

    func setHeatmapVisible(_ show: Bool) {
        visibility.heatmap = show
        writes.enqueue { try await self.preferences.setShowAnalyticsHeatmap(show: show) }
    }
}
