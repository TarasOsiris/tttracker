package xyz.tleskiv.tt.viewmodel.impl.analytics

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.WeeklyTrainingData
import xyz.tleskiv.tt.model.mappers.toSessionUiModelUtc
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.TrainingAnalyticsService
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDate
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsWidgetVisibility

class AnalyticsScreenViewModelImpl(
	sessionService: TrainingSessionService,
	analyticsService: TrainingAnalyticsService,
	private val userPreferencesRepository: UserPreferencesRepository
) : AnalyticsScreenViewModel() {

	override val widgetVisibility: StateFlow<AnalyticsWidgetVisibility> = combine(
		userPreferencesRepository.showAnalyticsSummary,
		userPreferencesRepository.showAnalyticsWinLoss,
		userPreferencesRepository.showAnalyticsWeekly,
		userPreferencesRepository.showAnalyticsHeatmap
	) { summary, winLoss, weekly, heatmap ->
		AnalyticsWidgetVisibility(
			showSummary = summary,
			showWinLoss = winLoss,
			showWeekly = weekly,
			showHeatmap = heatmap
		)
	}.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), AnalyticsWidgetVisibility())

	override val firstDayOfWeek: StateFlow<DayOfWeek> = userPreferencesRepository.weekStartDay
		.map { it.toDayOfWeek() }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), DayOfWeek.MONDAY)

	override val sessionsListByDate = sessionService.allSessions
		.map { allSessions ->
			allSessions.groupBy { it.date.toLocalDate() }
				.mapValues { (_, sessions) -> sessions.map { it.toSessionUiModelUtc() } }
		}
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val sessionsByDate: StateFlow<Map<LocalDate, Int>> = analyticsService.dailyLoad
		.map { load -> load.associate { it.date to it.sessionCount } }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val totalMinutesByDate: StateFlow<Map<LocalDate, Int>> = analyticsService.dailyLoad
		.map { load -> load.associate { it.date to it.totalMinutes } }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val summaryStats: StateFlow<SummaryStats> = analyticsService.summary
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), SummaryStats())

	override val weeklyTrainingData: StateFlow<List<WeeklyTrainingData>> = analyticsService.weeklyTraining
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

	override fun setShowSummary(show: Boolean) {
		viewModelScope.launch { userPreferencesRepository.setShowAnalyticsSummary(show) }
	}

	override fun setShowWinLoss(show: Boolean) {
		viewModelScope.launch { userPreferencesRepository.setShowAnalyticsWinLoss(show) }
	}

	override fun setShowWeekly(show: Boolean) {
		viewModelScope.launch { userPreferencesRepository.setShowAnalyticsWeekly(show) }
	}

	override fun setShowHeatmap(show: Boolean) {
		viewModelScope.launch { userPreferencesRepository.setShowAnalyticsHeatmap(show) }
	}
}
