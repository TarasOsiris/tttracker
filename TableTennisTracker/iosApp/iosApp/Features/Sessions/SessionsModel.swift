import Foundation
import Observation
import Shared

@MainActor
@Observable
final class SessionsModel {
    /// How far the day list runs either side of today, matching `DATE_LIST_RANGE_DAYS` in `:core`.
    static let rangeDays = 365

    private(set) var sessionsByDay: [Date: [SessionItem]] = [:]
    private(set) var firstWeekday = WeekStart.monday.firstWeekday
    private(set) var highlightsToday = true

    /// Every day the list renders, oldest first, and the day it is centred on.
    ///
    /// Both are rebuilt by `refreshToday()` rather than fixed at construction: the model outlives a
    /// tab switch, so an app left open overnight would otherwise keep labelling yesterday "Today" —
    /// which is what `InputData.currentDate` does in Compose.
    private(set) var days: [Date] = []
    private(set) var today = Date.now

    /// The one calendar every date in this feature is read through.
    var calendar: Calendar { .days(firstWeekday: firstWeekday) }

    @ObservationIgnored private let subscriptions = FlowSubscriptions()

    init(
        sessions: any TrainingSessionService = Services.sessions,
        preferences: any UserPreferencesRepository = Services.preferences
    ) {
        refreshToday()

        subscriptions.insert(
            KotlinFlow.observe(sessions.allSessions, as: [TrainingSession].self) { [weak self] all in
                // allSessions re-emits in full on every write, and the query leaves same-day
                // sessions in undefined order, so sort by creation to keep rows from swapping.
                let grouped = Dictionary(grouping: all.compactMap(SessionItem.init), by: \.day)
                self?.sessionsByDay = grouped.mapValues { $0.sorted { $0.createdAt < $1.createdAt } }
            }
        )
        subscriptions.insert(
            KotlinFlow.observe(preferences.weekStartDay, as: Shared.WeekStartDay.self) { [weak self] in
                self?.firstWeekday = WeekStart($0).firstWeekday
            }
        )
        subscriptions.insert(
            KotlinFlow.observeBool(preferences.highlightCurrentDay) { [weak self] in
                self?.highlightsToday = $0
            }
        )
    }

    /// Re-anchors the window on the current day. Idempotent, so it is safe on every foreground.
    func refreshToday() {
        let current = Calendar.gregorian.startOfDay(for: .now)
        guard current != today || days.isEmpty else { return }
        today = current
        days = (-Self.rangeDays...Self.rangeDays)
            .compactMap { Calendar.gregorian.date(byAdding: .day, value: $0, to: current) }
    }

    func sessions(on day: Date) -> [SessionItem] { sessionsByDay[day] ?? [] }

    /// The session-type colours to dot a calendar cell with, de-duplicated and capped so a busy day
    /// does not overflow the cell.
    func indicators(on day: Date) -> [SessionKind?] {
        var seen: [SessionKind?] = []
        for session in sessions(on: day) where !seen.contains(session.kind) {
            seen.append(session.kind)
        }
        return Array(seen.prefix(4))
    }
}
