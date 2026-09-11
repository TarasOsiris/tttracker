import Foundation
import Shared
import WidgetKit

/// Keeps the App Group snapshot the widgets read in step with the database.
///
/// The widget extension links neither the Kotlin framework nor `app.db` — which lives in the app's
/// private container — so the app is the only process that can see the data. It subscribes to the
/// same flows the screens do, and every emission is a write the user just made, a preference they
/// just changed, or the first load.
///
/// Emissions arrive in bursts: one write touches sessions, the analytics summary and the daily
/// load, and each arrives separately. They are coalesced into a single file write, and the encoded
/// bytes are compared against the last ones so a flow re-emitting identical values does not spend a
/// widget reload — the system budgets those.
@MainActor
final class WidgetSnapshotWriter {
    static let shared = WidgetSnapshotWriter()

    private var summary = Summary()
    private var days: [WidgetSnapshot.DayLoad] = []
    private var lastSession: WidgetSnapshot.LastSession?
    private var firstWeekday = WeekStart.monday.firstWeekday

    private var written: Data?
    private var pending: Task<Void, Never>?

    private let subscriptions = FlowSubscriptions()

    /// How much history the heatmap widgets can show at their widest, so the snapshot carries
    /// enough days for any family without carrying the whole log.
    private static let historyDays = 53 * 7

    private init(
        sessions: any TrainingSessionService = Services.sessions,
        analytics: any TrainingAnalyticsService = Services.trainingAnalytics,
        preferences: any UserPreferencesRepository = Services.preferences
    ) {
        subscriptions.insert(
            KotlinFlow.observe(analytics.summary, as: SummaryStats.self) { [weak self] stats in
                self?.summary = Summary(
                    totalSessions: Int(stats.totalSessions),
                    totalMinutes: Int(stats.totalTrainingMinutes),
                    matchesWon: Int(stats.matchesWon),
                    matchesLost: Int(stats.matchesLost)
                )
                self?.schedule()
            }
        )
        subscriptions.insert(
            KotlinFlow.observe(analytics.dailyLoad, as: [DailyTrainingLoad].self) { [weak self] load in
                self?.days = Self.dayLoads(load)
                self?.schedule()
            }
        )
        subscriptions.insert(
            KotlinFlow.observe(sessions.allSessions, as: [TrainingSession].self) { [weak self] all in
                self?.lastSession = Self.latest(in: all)
                self?.schedule()
            }
        )
        subscriptions.insert(
            KotlinFlow.observe(preferences.weekStartDay, as: Shared.WeekStartDay.self) { [weak self] in
                self?.firstWeekday = WeekStart($0).firstWeekday
                self?.schedule()
            }
        )
    }

    /// Builds the writer if it does not exist yet. Its flows do the rest.
    static func start() { _ = shared }

    /// Writes immediately, for the moments a debounce would miss — the app going to the background,
    /// or the language changing while no data did.
    func flush() {
        pending?.cancel()
        pending = nil
        write()
    }

    private func schedule() {
        pending?.cancel()
        pending = Task { [weak self] in
            try? await Task.sleep(for: .milliseconds(250))
            guard !Task.isCancelled else { return }
            self?.write()
        }
    }

    private func write() {
        let snapshot = WidgetSnapshot(
            summary: summary,
            days: days,
            lastSession: lastSession,
            palette: .brand,
            languageTag: LocalizationController.shared.languageTag,
            firstWeekday: firstWeekday
        )
        guard let data = WidgetStore.write(snapshot), data != written else { return }
        written = data
        WidgetCenter.shared.reloadAllTimelines()
    }

    /// The heatmap's days, bucketed by the rule `:core` shares with the Compose heatmap — done here
    /// rather than in the extension, which has no Kotlin to ask.
    private static func dayLoads(_ load: [DailyTrainingLoad]) -> [WidgetSnapshot.DayLoad] {
        let calendar = Calendar.gregorian
        let earliest = calendar.date(byAdding: .day, value: -historyDays, to: calendar.startOfDay(for: .now))
        let busiest = Int32(load.map(\.sessionCount).max() ?? 0)
        return load
            .compactMap { day -> WidgetSnapshot.DayLoad? in
                guard let date = day.date.date, earliest.map({ date >= $0 }) ?? true else { return nil }
                return WidgetSnapshot.DayLoad(
                    date: date,
                    sessions: Int(day.sessionCount),
                    level: Int(AnalyticsModelsKt.heatmapLevel(
                        sessionCount: day.sessionCount,
                        busiestSessionCount: busiest
                    ))
                )
            }
            .sorted { $0.date < $1.date }
    }

    /// The newest session, tie-broken by creation like the day list does, with its labels already
    /// translated — the widget has no way to map a session type to its name.
    ///
    /// The newest is picked off the Kotlin models and only that one is mapped: `allSessions`
    /// re-emits the whole log on every write, and building a `SessionItem` per session — each one
    /// crossing the bridge for its matches and their opponents — to keep one of them was the most
    /// expensive thing this writer did.
    private static func latest(in all: [TrainingSession]) -> WidgetSnapshot.LastSession? {
        let newest = all.max { ($0.date, $0.createdAt) < ($1.date, $1.createdAt) }
        guard let newest, let session = SessionItem(newest) else { return nil }
        return WidgetSnapshot.LastSession(
            id: session.id,
            date: session.day,
            minutes: session.durationMinutes,
            rpe: session.rpe,
            kindLabel: session.kind?.label,
            kind: session.kind?.rawValue,
            matchesWon: session.matches.filter(\.isWin).count,
            // Not `!isWin`: a drawn match is neither, and the summary totals leave draws out too.
            matchesLost: session.matches.filter { $0.opponentGamesWon > $0.myGamesWon }.count,
            topScore: session.matches.first?.scoreText,
            opponent: session.matches.first?.opponentName
        )
    }
}
