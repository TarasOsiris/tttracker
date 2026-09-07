package xyz.tleskiv.tt.service.impl

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.shareIn
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.isoDayNumber
import kotlinx.datetime.minus
import xyz.tleskiv.tt.analytics.DailyTrainingLoad
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.WeeklyTrainingData
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.repo.AnalyticsRepository
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.TrainingAnalyticsService
import xyz.tleskiv.tt.service.TrainingAnalyticsService.Companion.WEEKS_SHOWN
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDate
import xyz.tleskiv.tt.util.today

class TrainingAnalyticsServiceImpl(
	sessionService: TrainingSessionService,
	analyticsRepository: AnalyticsRepository,
	userPreferencesRepository: UserPreferencesRepository
) : TrainingAnalyticsService {

	// An implementation detail of the sharing below, not a dependency: this service is a singleton
	// and the shared flow outlives any one screen. Kept out of the constructor so `singleOf` — which
	// binds parameters by arity and ignores Kotlin defaults — can still build it.
	private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

	override val summary: Flow<SummaryStats> = analyticsRepository.summary.map {
		SummaryStats(
			totalSessions = it.total_sessions.toInt(),
			totalTrainingMinutes = it.total_minutes.toInt(),
			matchesWon = it.matches_won.toInt(),
			matchesLost = it.matches_lost.toInt()
		)
	}

	/**
	 * Shared rather than cold: every aggregation below derives from this, and each independent
	 * subscriber would otherwise re-run the whole session join and the grouping.
	 */
	override val sessionsByDay: Flow<Map<LocalDate, List<TrainingSession>>> =
		sessionService.allSessions
			.map { sessions -> sessions.groupBy { it.date.toLocalDate() } }
			.shareIn(scope, SharingStarted.WhileSubscribed(SHARE_TIMEOUT_MS), replay = 1)

	override val dailyLoad: Flow<List<DailyTrainingLoad>> = sessionsByDay.map { byDay ->
		byDay.map { (date, forDay) ->
			DailyTrainingLoad(
				date = date,
				sessionCount = forDay.size,
				totalMinutes = forDay.sumOf { it.durationMinutes }
			)
		}.sortedBy { it.date }
	}

	override val weeklyTraining: Flow<List<WeeklyTrainingData>> =
		combine(dailyLoad, userPreferencesRepository.weekStartDay) { load, weekStartDay ->
			weeklyTotals(load, weekStartDay.toDayOfWeek())
		}

	private fun weeklyTotals(
		load: List<DailyTrainingLoad>,
		firstDayOfWeek: DayOfWeek
	): List<WeeklyTrainingData> {
		val minutesByWeek = load
			.groupBy { weekStart(it.date, firstDayOfWeek) }
			.mapValues { (_, days) -> days.sumOf { it.totalMinutes } }
		val currentWeek = weekStart(today(), firstDayOfWeek)

		return (WEEKS_SHOWN - 1 downTo 0).map { weeksAgo ->
			val start = currentWeek.minus(weeksAgo * 7, DateTimeUnit.DAY)
			WeeklyTrainingData(
				weekLabel = "${start.day}/${start.month.ordinal + 1}",
				totalMinutes = minutesByWeek[start] ?: 0
			)
		}
	}

	private fun weekStart(date: LocalDate, firstDayOfWeek: DayOfWeek): LocalDate {
		val daysIn = (date.dayOfWeek.isoDayNumber - firstDayOfWeek.isoDayNumber + 7) % 7
		return date.minus(daysIn, DateTimeUnit.DAY)
	}

	private companion object {
		const val SHARE_TIMEOUT_MS = 5_000L
	}
}
