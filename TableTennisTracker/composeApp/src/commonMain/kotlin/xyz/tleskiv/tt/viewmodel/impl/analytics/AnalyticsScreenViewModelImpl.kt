package xyz.tleskiv.tt.viewmodel.impl.analytics

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.model.mappers.toSessionUiModelUtc
import xyz.tleskiv.tt.repo.AnalyticsRepository
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDate
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel
import xyz.tleskiv.tt.viewmodel.analytics.SummaryStats

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
}
