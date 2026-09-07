package xyz.tleskiv.tt.service.impl

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.isoDayNumber
import kotlinx.datetime.minus
import kotlinx.datetime.plus
import xyz.tleskiv.tt.analytics.DailyTrainingLoad
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.WeeklyTrainingData
import xyz.tleskiv.tt.repo.AnalyticsRepository
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.TrainingAnalyticsService
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.service.TrainingAnalyticsService.Companion.WEEKS_SHOWN
import xyz.tleskiv.tt.util.ext.toLocalDate
import xyz.tleskiv.tt.util.today

class TrainingAnalyticsServiceImpl(
	private val sessionService: TrainingSessionService,
	private val analyticsRepository: AnalyticsRepository,
	private val userPreferencesRepository: UserPreferencesRepository
) : TrainingAnalyticsService {

	override val summary: Flow<SummaryStats> = analyticsRepository.summary.map {
		SummaryStats(
			totalSessions = it.total_sessions.toInt(),
			totalTrainingMinutes = it.total_minutes.toInt(),
			matchesWon = it.matches_won.toInt(),
			matchesLost = it.matches_lost.toInt()
		)
	}

	override val dailyLoad: Flow<List<DailyTrainingLoad>> = sessionService.allSessions.map { sessions ->
		sessions.groupBy { it.date.toLocalDate() }
			.map { (date, forDay) ->
				DailyTrainingLoad(
					date = date,
					sessionCount = forDay.size,
					totalMinutes = forDay.sumOf { it.durationMinutes }
				)
			}
			.sortedBy { it.date }
	}

	override val weeklyTraining: Flow<List<WeeklyTrainingData>> =
		combine(dailyLoad, userPreferencesRepository.weekStartDay) { load, weekStartDay ->
			weeklyTotals(load, weekStartDay.toDayOfWeek())
		}

	private fun weeklyTotals(
		load: List<DailyTrainingLoad>,
		firstDayOfWeek: DayOfWeek
	): List<WeeklyTrainingData> {
		val today = today()
		return (0 until WEEKS_SHOWN).map { weeksAgo ->
			val weekStart = weekStart(today.minus(weeksAgo * 7, DateTimeUnit.DAY), firstDayOfWeek)
			val weekEnd = weekStart.plus(6, DateTimeUnit.DAY)
			WeeklyTrainingData(
				weekLabel = "${weekStart.day}/${weekStart.month.ordinal + 1}",
				totalMinutes = load.filter { it.date in weekStart..weekEnd }.sumOf { it.totalMinutes }
			)
		}.reversed()
	}

	private fun weekStart(date: LocalDate, firstDayOfWeek: DayOfWeek): LocalDate {
		val daysIn = (date.dayOfWeek.isoDayNumber - firstDayOfWeek.isoDayNumber + 7) % 7
		return date.minus(daysIn, DateTimeUnit.DAY)
	}
}
