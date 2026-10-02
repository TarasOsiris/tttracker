import Foundation
import Observation
import Shared

/// The Pro insights: streaks, weekly load, session types and head-to-head records. Everything is
/// worked out in `:core`; this only reshapes it for the views.
@MainActor
@Observable
final class InsightsModel {
    private(set) var currentStreakWeeks = 0
    private(set) var longestStreakWeeks = 0
    private(set) var load: [LoadWeek] = []
    private(set) var sessionTypes: [SessionTypeShareItem] = []
    private(set) var opponents: [HeadToHead] = []

    @ObservationIgnored private let subscriptions = FlowSubscriptions()

    static let loadWeeks: Int32 = 12

    init(service: any InsightsService = Services.insights) {
        subscriptions.insert(
            KotlinFlow.observe(service.insights, as: TrainingInsights.self) { [weak self] insights in
                self?.currentStreakWeeks = Int(insights.streak.currentWeeks)
                self?.longestStreakWeeks = Int(insights.streak.longestWeeks)
                self?.sessionTypes = insights.sessionTypes.map(SessionTypeShareItem.init)
                self?.opponents = insights.opponents.map(HeadToHead.init)
            }
        )
        subscriptions.insert(
            KotlinFlow.observe(service.trainingWeeks(weeks: Self.loadWeeks), as: [TrainingWeek].self) { [weak self] weeks in
                self?.load = weeks.enumerated().compactMap { index, week in
                    guard let start = week.start.date else { return nil }
                    return LoadWeek(id: index, start: start, load: Int(week.load))
                }
            }
        )
    }

    var hasLoad: Bool { load.contains { $0.load > 0 } }
}

struct LoadWeek: Identifiable {
    let id: Int
    let start: Date
    let load: Int
}

struct SessionTypeShareItem: Identifiable {
    let kind: SessionKind?
    let sessionCount: Int
    let minutes: Int

    var id: String { kind?.rawValue ?? "none" }
    var label: String { kind?.label ?? L.analyticsSessionTypeNone }

    init(_ share: SessionTypeShare) {
        kind = SessionKind(share.type)
        sessionCount = Int(share.sessionCount)
        minutes = Int(share.totalMinutes)
    }
}

/// The user's record against one opponent.
struct HeadToHead: Identifiable {
    let id: String
    let name: String
    let wins: Int
    let losses: Int
    let gamesWon: Int
    let gamesLost: Int
    /// Oldest first; `true` is a win.
    let recentResults: [Bool]
    let lastPlayed: Date?

    init(_ record: OpponentRecord) {
        id = record.opponentId.stringId
        name = record.name
        wins = Int(record.wins)
        losses = Int(record.losses)
        gamesWon = Int(record.gamesWon)
        gamesLost = Int(record.gamesLost)
        recentResults = record.recentResults.map(\.boolValue)
        lastPlayed = record.lastPlayed.date
    }
}
