package xyz.tleskiv.tt.viewmodel.analytics

import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel

data class SummaryStats(
	val totalSessions: Int = 0,
	val totalTrainingMinutes: Int = 0,
	val matchesWon: Int = 0,
	val matchesLost: Int = 0
)

data class WeeklyTrainingData(
	val weekLabel: String,
	val totalMinutes: Int
)

data class AnalyticsWidgetVisibility(
	val showSummary: Boolean = true,
	val showWinLoss: Boolean = true,
	val showWeekly: Boolean = true,
	val showHeatmap: Boolean = true
)

abstract class AnalyticsScreenViewModel : ViewModelBase() {
	abstract val sessionsByDate: StateFlow<Map<LocalDate, Int>>
	abstract val totalMinutesByDate: StateFlow<Map<LocalDate, Int>>
	abstract val sessionsListByDate: StateFlow<Map<LocalDate, List<SessionUiModel>>>
	abstract val firstDayOfWeek: StateFlow<DayOfWeek>
	abstract val summaryStats: StateFlow<SummaryStats>
	abstract val weeklyTrainingData: StateFlow<List<WeeklyTrainingData>>
	abstract val widgetVisibility: StateFlow<AnalyticsWidgetVisibility>

	abstract fun setShowSummary(show: Boolean)
	abstract fun setShowWinLoss(show: Boolean)
	abstract fun setShowWeekly(show: Boolean)
	abstract fun setShowHeatmap(show: Boolean)
}
