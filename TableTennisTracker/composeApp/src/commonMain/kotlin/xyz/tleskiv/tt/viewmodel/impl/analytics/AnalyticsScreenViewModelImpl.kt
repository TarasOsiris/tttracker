package xyz.tleskiv.tt.viewmodel.impl.analytics

import androidx.lifecycle.viewModelScope
import com.kizitonwose.calendar.core.now
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.isoDayNumber
import kotlinx.datetime.minus
import kotlinx.datetime.plus
import xyz.tleskiv.tt.model.mappers.toSessionUiModelUtc
import xyz.tleskiv.tt.repo.AnalyticsRepository
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDate
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel
import xyz.tleskiv.tt.viewmodel.analytics.SummaryStats
import xyz.tleskiv.tt.viewmodel.analytics.WeeklyTrainingData

class AnalyticsScreenViewModelImpl(
	sessionService: TrainingSessionService,
	analyticsRepository: AnalyticsRepository,
	userPreferencesRepository: UserPreferencesRepository
) : AnalyticsScreenViewModel() {

	override val firstDayOfWeek: StateFlow<DayOfWeek> = userPreferencesRepository.weekStartDay
		.map { it.toDayOfWeek() }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), DayOfWeek.MONDAY)

	override val sessionsListByDate = sessionService.allSessions
		.map { allSessions ->
			allSessions.groupBy { it.date.toLocalDate() }
				.mapValues { (_, sessions) -> sessions.map { it.toSessionUiModelUtc() } }
		}
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val sessionsByDate: StateFlow<Map<LocalDate, Int>> = sessionsListByDate
		.map { sessions -> sessions.mapValues { it.value.size } }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val totalMinutesByDate: StateFlow<Map<LocalDate, Int>> = sessionsListByDate
		.map { sessions -> sessions.mapValues { entry -> entry.value.sumOf { it.durationMinutes } } }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val summaryStats: StateFlow<SummaryStats> = analyticsRepository.summary
		.map { summary ->
			SummaryStats(
				totalSessions = summary.total_sessions.toInt(),
				totalTrainingMinutes = summary.total_minutes.toInt(),
				matchesWon = summary.matches_won.toInt(),
				matchesLost = summary.matches_lost.toInt()
			)
		}
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), SummaryStats())

	override val weeklyTrainingData: StateFlow<List<WeeklyTrainingData>> =
		combine(totalMinutesByDate, firstDayOfWeek) { minutesByDate, startDay ->
			calculateWeeklyData(minutesByDate, startDay)
		}.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

	private fun calculateWeeklyData(
		minutesByDate: Map<LocalDate, Int>,
		firstDayOfWeek: DayOfWeek
	): List<WeeklyTrainingData> {
		val today = LocalDate.now()
		val weeksToShow = 8

		return (0 until weeksToShow).map { weeksAgo ->
			val weekEnd = today.minus(weeksAgo * 7, DateTimeUnit.DAY)
			val weekStart = getWeekStart(weekEnd, firstDayOfWeek)
			val weekEndDate = weekStart.plus(6, DateTimeUnit.DAY)

			val totalMinutes = minutesByDate.entries
				.filter { (date, _) -> date in weekStart..weekEndDate }
				.sumOf { it.value }

			@Suppress("DEPRECATION")
			val label = "${weekStart.dayOfMonth}/${weekStart.monthNumber}"
			WeeklyTrainingData(weekLabel = label, totalMinutes = totalMinutes)
		}.reversed()
	}

	private fun getWeekStart(date: LocalDate, firstDayOfWeek: DayOfWeek): LocalDate {
		val daysFromStart = (date.dayOfWeek.isoDayNumber - firstDayOfWeek.isoDayNumber + 7) % 7
		return date.minus(daysFromStart, DateTimeUnit.DAY)
	}
}
