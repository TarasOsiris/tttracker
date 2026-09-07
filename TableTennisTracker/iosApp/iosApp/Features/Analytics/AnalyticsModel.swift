import Foundation
import Observation
import Shared

/// Headline totals for the analytics screen.
struct Summary {
    var totalSessions = 0
    var totalMinutes = 0
    var matchesWon = 0
    var matchesLost = 0

    var totalMatches: Int { matchesWon + matchesLost }
    var winRate: Double? { totalMatches > 0 ? Double(matchesWon) / Double(totalMatches) : nil }
}

/// One bar in the weekly chart.
struct WeeklyTraining: Identifiable {
    let id: Int
    let label: String
    let minutes: Int
}

@MainActor
@Observable
final class AnalyticsModel {
    private(set) var summary = Summary()
    private(set) var weekly: [WeeklyTraining] = []

    /// Sessions per day, indexed for the heatmap. Built once per emission rather than per cell.
    private(set) var sessionsByDay: [Date: Int] = [:]
    private(set) var busiestDay = 0

    let showSummary: Preference<Bool>
    let showWinLoss: Preference<Bool>
    let showWeekly: Preference<Bool>
    let showHeatmap: Preference<Bool>

    @ObservationIgnored private let subscriptions = FlowSubscriptions()
    @ObservationIgnored private let queue = SerialWriteQueue()

    init(
        analytics: any TrainingAnalyticsService = Services.trainingAnalytics,
        preferences: any UserPreferencesRepository = Services.preferences
    ) {
        showSummary = Preference(
            initial: true, flow: preferences.showAnalyticsSummary,
            subscriptions: subscriptions, queue: queue,
            commit: { try await preferences.setShowAnalyticsSummary(show: $0) }
        )
        showWinLoss = Preference(
            initial: true, flow: preferences.showAnalyticsWinLoss,
            subscriptions: subscriptions, queue: queue,
            commit: { try await preferences.setShowAnalyticsWinLoss(show: $0) }
        )
        showWeekly = Preference(
            initial: true, flow: preferences.showAnalyticsWeekly,
            subscriptions: subscriptions, queue: queue,
            commit: { try await preferences.setShowAnalyticsWeekly(show: $0) }
        )
        showHeatmap = Preference(
            initial: true, flow: preferences.showAnalyticsHeatmap,
            subscriptions: subscriptions, queue: queue,
            commit: { try await preferences.setShowAnalyticsHeatmap(show: $0) }
        )

        subscriptions.insert(
            KotlinFlow.observe(analytics.summary, as: SummaryStats.self) { [weak self] stats in
                self?.summary = Summary(
                    totalSessions: Int(stats.totalSessions),
                    totalMinutes: Int(stats.totalTrainingMinutes),
                    matchesWon: Int(stats.matchesWon),
                    matchesLost: Int(stats.matchesLost)
                )
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
                let calendar = Calendar.gregorian
                var byDay: [Date: Int] = [:]
                for day in load {
                    guard let date = day.date.date else { continue }
                    byDay[calendar.startOfDay(for: date)] = Int(day.sessionCount)
                }
                self?.sessionsByDay = byDay
                self?.busiestDay = byDay.values.max() ?? 0
            }
        )
    }

    /// Intensity bucket for a day, from the same rule the Compose heatmap uses.
    func heatmapLevel(on day: Date) -> Int {
        Int(AnalyticsModelsKt.heatmapLevel(
            sessionCount: Int32(sessionsByDay[day] ?? 0),
            busiestSessionCount: Int32(busiestDay)
        ))
    }

    func sessionCount(on day: Date) -> Int { sessionsByDay[day] ?? 0 }
}
