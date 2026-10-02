package xyz.tleskiv.tt.viewmodel.impl.analytics

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.WeeklyTrainingData
import xyz.tleskiv.tt.model.AnalyticsWidget
import xyz.tleskiv.tt.model.AnalyticsWidgetSetting
import xyz.tleskiv.tt.model.defaultAnalyticsWidgets
import xyz.tleskiv.tt.model.mappers.toSessionUiModelUtc
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.TrainingAnalyticsService
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel

class AnalyticsScreenViewModelImpl(
	analyticsService: TrainingAnalyticsService,
	private val userPreferencesRepository: UserPreferencesRepository
) : AnalyticsScreenViewModel() {

	private val widgetWrites = Mutex()

	override val widgets: StateFlow<List<AnalyticsWidgetSetting>> = userPreferencesRepository.analyticsWidgets
		.map { it.withoutInsights() }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), defaultAnalyticsWidgets().withoutInsights())

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

	override val weeklyTrainingData: StateFlow<List<WeeklyTrainingData>> = analyticsService.weeklyTraining
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

	override fun setWidgetVisible(widget: AnalyticsWidget, visible: Boolean) = updateWidgets { all ->
		all.map { if (it.widget == widget) it.copy(visible = visible) else it }
	}

	override fun moveWidget(widget: AnalyticsWidget, offset: Int) = updateWidgets { all ->
		all.movingAmongShown(widget, offset)
	}

	private fun updateWidgets(change: (List<AnalyticsWidgetSetting>) -> List<AnalyticsWidgetSetting>) {
		viewModelScope.launch {
			widgetWrites.withLock {
				val stored = userPreferencesRepository.analyticsWidgets.first()
				userPreferencesRepository.setAnalyticsWidgets(change(stored))
			}
		}
	}
}

private fun List<AnalyticsWidgetSetting>.withoutInsights() = filterNot { it.widget.isInsight }

private fun List<AnalyticsWidgetSetting>.movingAmongShown(
	widget: AnalyticsWidget,
	offset: Int
): List<AnalyticsWidgetSetting> {
	val slots = indices.filterNot { this[it].widget.isInsight }
	val from = slots.indexOfFirst { this[it].widget == widget }
	if (from < 0) return this
	val to = (from + offset).coerceIn(slots.indices)
	val step = if (to > from) 1 else -1
	val moved = toMutableList()
	var at = from
	while (at != to) {
		val here = slots[at]
		val there = slots[at + step]
		moved[here] = moved[there].also { moved[there] = moved[here] }
		at += step
	}
	return moved
}
