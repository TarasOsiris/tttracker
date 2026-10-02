import Observation
import SwiftUI
import Shared

@MainActor
@Observable
final class AnalyticsModel {
    private(set) var summary = Summary()
    private(set) var weekly: [WeeklyTraining] = []

    /// How far back the weekly chart reaches. Anything past the free eight weeks is Pro; the screen
    /// checks that before setting it.
    var weeklyRange: WeeklyRange = .eightWeeks {
        didSet { if weeklyRange != oldValue { observeWeekly() } }
    }

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

    /// Every card in the user's order, each with whether it is on screen.
    let cards: Preference<[AnalyticsCardSetting]>

    @ObservationIgnored private let subscriptions = FlowSubscriptions()
    @ObservationIgnored private let queue = SerialWriteQueue()
    @ObservationIgnored private let insights: any InsightsService
    @ObservationIgnored private let weeklySubscription = FlowSubscriptionSlot()

    init(
        analytics: any TrainingAnalyticsService = Services.trainingAnalytics,
        insights: any InsightsService = Services.insights,
        preferences: any UserPreferencesRepository = Services.preferences
    ) {
        self.insights = insights
        cards = Preference(
            initial: AnalyticsCard.allCases.map { AnalyticsCardSetting(card: $0, isVisible: true) },
            flow: preferences.analyticsWidgets,
            subscriptions: subscriptions, queue: queue,
            decode: { ($0 as? [AnalyticsWidgetSetting])?.compactMap(AnalyticsCardSetting.init) },
            commit: { try await preferences.setAnalyticsWidgets(widgets: $0.map(\.kotlin)) }
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
        observeWeekly()
    }

    /// One live subscription for the range on screen; picking another range replaces it.
    private func observeWeekly() {
        weeklySubscription.replace(with: KotlinFlow.observe(
            insights.trainingWeeks(weeks: weeklyRange.weeks), as: [TrainingWeek].self
        ) { [weak self] weeks in
            self?.weekly = weeks.enumerated().compactMap { index, week in
                guard let start = week.start.date else { return nil }
                return WeeklyTraining(id: index, start: start, minutes: Int(week.totalMinutes))
            }
        })
    }

    /// Totals under the weekly chart. `weekly` holds one bar per week shown, so even the all-time
    /// range is a sum over a few hundred values — cheap enough not to be worth a second copy kept in
    /// step by hand.
    var weeklyTotalMinutes: Int { weekly.reduce(0) { $0 + $1.minutes } }
    var weeklyAverageMinutes: Int { weekly.isEmpty ? 0 : weeklyTotalMinutes / weekly.count }

    /// The cards on screen, in order. Without Pro the insights cannot be hidden: they are the one
    /// locked preview, which stays wherever the user has put them.
    func shownCards(hasPro: Bool) -> [AnalyticsCard] {
        cards.value.filter { $0.isVisible || ($0.card.isInsight && !hasPro) }.map(\.card)
    }

    func isVisible(_ card: AnalyticsCard) -> Binding<Bool> {
        Binding(
            get: { self.cards.value.first { $0.card == card }?.isVisible ?? true },
            set: { visible in
                self.cards.set(self.cards.value.map {
                    $0.card == card ? AnalyticsCardSetting(card: card, isVisible: visible) : $0
                })
            }
        )
    }

    func moveCards(fromOffsets source: IndexSet, toOffset destination: Int) {
        var reordered = cards.value
        reordered.move(fromOffsets: source, toOffset: destination)
        cards.set(reordered)
    }

    /// Intensity bucket for a day. Days with no sessions are absent from the index and sit at 0,
    /// which is the level `heatmapLevel` returns for them anyway.
    func heatmapLevel(on day: Date) -> Int { levelsByDay[day] ?? 0 }

    func sessionCount(on day: Date) -> Int { sessionsByDay[day] ?? 0 }
}
