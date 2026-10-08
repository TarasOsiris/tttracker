package xyz.tleskiv.tt.viewmodel.analytics

import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.TrainingInsights
import xyz.tleskiv.tt.analytics.TrainingWeek
import xyz.tleskiv.tt.analytics.WeeklyChartRange
import xyz.tleskiv.tt.model.AnalyticsWidget
import xyz.tleskiv.tt.model.AnalyticsWidgetSetting
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel

abstract class AnalyticsScreenViewModel : ViewModelBase() {
	abstract val sessionsByDate: StateFlow<Map<LocalDate, Int>>
	abstract val sessionsListByDate: StateFlow<Map<LocalDate, List<SessionUiModel>>>
	abstract val firstDayOfWeek: StateFlow<DayOfWeek>
	abstract val summaryStats: StateFlow<SummaryStats>
	abstract val weeklyRange: StateFlow<WeeklyChartRange>

	/** One entry per week of [weeklyRange], oldest first. */
	abstract val weeklyTraining: StateFlow<List<TrainingWeek>>
	abstract val insights: StateFlow<TrainingInsights>

	/** The last [LOAD_WEEKS] weeks, oldest first, for the training load chart. */
	abstract val trainingLoad: StateFlow<List<TrainingWeek>>

	/** Every card, insights included, in the user's order. The UI decides which ones Pro unlocks. */
	abstract val widgets: StateFlow<List<AnalyticsWidgetSetting>>

	/** The UI checks Pro before picking a range where [WeeklyChartRange.needsPro]. */
	abstract fun setWeeklyRange(range: WeeklyChartRange)

	abstract fun setWidgetVisible(widget: AnalyticsWidget, visible: Boolean)

	abstract fun moveWidget(widget: AnalyticsWidget, offset: Int)

	companion object {
		const val LOAD_WEEKS = 12
	}
}
