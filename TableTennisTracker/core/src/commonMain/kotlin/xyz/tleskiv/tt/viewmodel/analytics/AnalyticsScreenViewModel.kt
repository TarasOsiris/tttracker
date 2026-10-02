package xyz.tleskiv.tt.viewmodel.analytics

import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.WeeklyTrainingData
import xyz.tleskiv.tt.model.AnalyticsWidget
import xyz.tleskiv.tt.model.AnalyticsWidgetSetting
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel

abstract class AnalyticsScreenViewModel : ViewModelBase() {
	abstract val sessionsByDate: StateFlow<Map<LocalDate, Int>>
	abstract val sessionsListByDate: StateFlow<Map<LocalDate, List<SessionUiModel>>>
	abstract val firstDayOfWeek: StateFlow<DayOfWeek>
	abstract val summaryStats: StateFlow<SummaryStats>
	abstract val weeklyTrainingData: StateFlow<List<WeeklyTrainingData>>
	abstract val widgets: StateFlow<List<AnalyticsWidgetSetting>>

	abstract fun setWidgetVisible(widget: AnalyticsWidget, visible: Boolean)

	abstract fun moveWidget(widget: AnalyticsWidget, offset: Int)
}
