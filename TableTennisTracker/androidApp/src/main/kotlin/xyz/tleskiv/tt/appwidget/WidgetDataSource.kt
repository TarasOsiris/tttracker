package xyz.tleskiv.tt.appwidget

import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.atStartOfDayIn
import kotlinx.datetime.plus
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.TrainingStreak
import xyz.tleskiv.tt.analytics.TrainingWeek
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.InsightsService
import xyz.tleskiv.tt.service.TrainingAnalyticsService
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.nowMillis
import xyz.tleskiv.tt.util.today

/// [WidgetData] from the same `:core` flows the screens observe — the ones iOS's
/// `WidgetSnapshotWriter` subscribes to — plus the persisted Pro state and the calendar day, since
/// "today" is what the heatmap window and the streak are read against.
class WidgetDataSource(
	sessions: TrainingSessionService,
	analytics: TrainingAnalyticsService,
	insights: InsightsService,
	preferences: UserPreferencesRepository,
	proStore: WidgetProStore
) {
	private class Training(
		val summary: SummaryStats,
		val days: List<WidgetDayLoad>,
		val lastSession: WidgetLastSession?,
		val streak: TrainingStreak,
		val weeks: List<TrainingWeek>
	)

	private val today: Flow<LocalDate> = flow {
		while (true) {
			val day = today()
			emit(day)
			val midnight = day.plus(1, DateTimeUnit.DAY).atStartOfDayIn(TimeZone.currentSystemDefault())
			delay((midnight.toEpochMilliseconds() - nowMillis).coerceAtLeast(MIN_TICK_MS))
		}
	}.distinctUntilChanged()

	private val training: Flow<Training> = combine(
		analytics.summary,
		combine(analytics.dailyLoad, today) { load, day -> load.toWidgetDays(day) },
		sessions.allSessions.map { it.latestForWidget() },
		insights.insights.map { it.streak },
		insights.trainingWeeks(WidgetData.LOAD_WEEKS)
	) { summary, days, lastSession, streak, weeks -> Training(summary, days, lastSession, streak, weeks) }

	val data: Flow<WidgetData> = combine(
		training,
		preferences.weekStartDay,
		preferences.appLocale,
		proStore.state,
		today
	) { training, weekStart, locale, pro, day ->
		WidgetData(
			summary = training.summary,
			days = training.days,
			lastSession = training.lastSession,
			streak = training.streak,
			weeks = training.weeks,
			firstDayOfWeek = weekStart.toDayOfWeek(),
			locale = locale,
			pro = pro,
			today = day
		)
	}.distinctUntilChanged()

	suspend fun current(): WidgetData = data.first()

	private companion object {
		const val MIN_TICK_MS = 1_000L
	}
}
