package xyz.tleskiv.tt.viewmodel.impl.analytics

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.TrainingInsights
import xyz.tleskiv.tt.analytics.TrainingWeek
import xyz.tleskiv.tt.analytics.WeeklyChartRange
import xyz.tleskiv.tt.model.AnalyticsWidget
import xyz.tleskiv.tt.model.AnalyticsWidgetSetting
import xyz.tleskiv.tt.model.defaultAnalyticsWidgets
import xyz.tleskiv.tt.model.mappers.toSessionUiModelUtc
import xyz.tleskiv.tt.model.moving
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.InsightsService
import xyz.tleskiv.tt.service.TrainingAnalyticsService
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel

@OptIn(ExperimentalCoroutinesApi::class)
class AnalyticsScreenViewModelImpl(
	analyticsService: TrainingAnalyticsService,
	insightsService: InsightsService,
	private val userPreferencesRepository: UserPreferencesRepository
) : AnalyticsScreenViewModel() {

	private val widgetWrites = Mutex()
	private val selectedRange = MutableStateFlow(WeeklyChartRange.EIGHT_WEEKS)

	override val widgets: StateFlow<List<AnalyticsWidgetSetting>> = userPreferencesRepository.analyticsWidgets
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), defaultAnalyticsWidgets())

	override val firstDayOfWeek: StateFlow<DayOfWeek> = userPreferencesRepository.weekStartDay
		.map { it.toDayOfWeek() }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), DayOfWeek.MONDAY)

	override val sessionsListByDate = analyticsService.sessionsByDay
		.map { byDay -> byDay.mapValues { (_, sessions) -> sessions.map { it.toSessionUiModelUtc() } } }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val sessionsByDate: StateFlow<Map<LocalDate, Int>> = analyticsService.sessionsByDay
		.map { byDay -> byDay.mapValues { (_, sessions) -> sessions.size } }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val summaryStats: StateFlow<SummaryStats> = analyticsService.summary
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), SummaryStats())

	override val weeklyRange: StateFlow<WeeklyChartRange> = selectedRange.asStateFlow()

	override val weeklyTraining: StateFlow<List<TrainingWeek>> = selectedRange
		.flatMapLatest { insightsService.trainingWeeks(it.weeks) }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

	override val insights: StateFlow<TrainingInsights> = insightsService.insights
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), TrainingInsights())

	override val trainingLoad: StateFlow<List<TrainingWeek>> = insightsService.trainingWeeks(LOAD_WEEKS)
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

	override fun setWeeklyRange(range: WeeklyChartRange) {
		selectedRange.value = range
	}

	override fun setWidgetVisible(widget: AnalyticsWidget, visible: Boolean) = updateWidgets { all ->
		all.map { if (it.widget == widget) it.copy(visible = visible) else it }
	}

	override fun moveWidget(widget: AnalyticsWidget, offset: Int) = updateWidgets { it.moving(widget, offset) }

	private fun updateWidgets(change: (List<AnalyticsWidgetSetting>) -> List<AnalyticsWidgetSetting>) {
		viewModelScope.launch {
			widgetWrites.withLock {
				val stored = userPreferencesRepository.analyticsWidgets.first()
				userPreferencesRepository.setAnalyticsWidgets(change(stored))
			}
		}
	}
}
