import Foundation
import Observation
import Shared

@MainActor
@Observable
final class AnalyticsModel {
    private(set) var summary = Summary()
    private(set) var weekly: [WeeklyTraining] = []

    /// Sessions per day, indexed for the heatmap. Built once per emission rather than per cell.
    private(set) var sessionsByDay: [Date: Int] = [:]

    /// Intensity bucket per day, from the same rule the Compose heatmap uses.
    ///
    /// Bucketed here, with `sessionsByDay`, rather than per cell: the grid draws up to a year of
    /// days and `body` re-runs on every scroll, so asking Kotlin per cell meant hundreds of bridge
    /// crossings a frame.
    private(set) var levelsByDay: [Date: Int] = [:]

    /// The user's first day of week, in `Calendar` numbering. The heatmap aligns its rows to this
    /// so it agrees with the weekly chart, which the same preference already drives through the
    /// service.
    private(set) var firstWeekday = WeekStart.monday.firstWeekday

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
            KotlinFlow.observe(preferences.weekStartDay, as: Shared.WeekStartDay.self) { [weak self] in
                self?.firstWeekday = WeekStart($0).firstWeekday
            }
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
                let busiest = Int32(byDay.values.max() ?? 0)
                self?.sessionsByDay = byDay
                self?.levelsByDay = byDay.mapValues {
                    Int(AnalyticsModelsKt.heatmapLevel(
                        sessionCount: Int32($0),
                        busiestSessionCount: busiest
                    ))
                }
            }
        )
    }

    /// Totals under the weekly chart. `weekly` holds one bar per week shown, so this is a sum
    /// over single digits — cheap enough not to be worth a second copy kept in step by hand.
    var weeklyTotalMinutes: Int { weekly.reduce(0) { $0 + $1.minutes } }
    var weeklyAverageMinutes: Int { weekly.isEmpty ? 0 : weeklyTotalMinutes / weekly.count }

    /// Intensity bucket for a day. Days with no sessions are absent from the index and sit at 0,
    /// which is the level `heatmapLevel` returns for them anyway.
    func heatmapLevel(on day: Date) -> Int { levelsByDay[day] ?? 0 }

    func sessionCount(on day: Date) -> Int { sessionsByDay[day] ?? 0 }
}
