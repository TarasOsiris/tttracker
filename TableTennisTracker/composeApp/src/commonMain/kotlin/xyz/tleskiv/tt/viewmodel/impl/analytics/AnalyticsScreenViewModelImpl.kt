package xyz.tleskiv.tt.viewmodel.impl.analytics

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDate
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel

class AnalyticsScreenViewModelImpl(
	sessionService: TrainingSessionService
) : AnalyticsScreenViewModel() {
	private val sessionStats: StateFlow<Map<LocalDate, SessionDayStats>> = sessionService.allSessions
		.map { allSessions ->
			allSessions.groupBy { it.date.toLocalDate() }
				.mapValues { (_, sessions) ->
					SessionDayStats(
						count = sessions.size,
						totalMinutes = sessions.sumOf { it.duration_min.toInt() }
					)
				}
		}
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val sessionsByDate: StateFlow<Map<LocalDate, Int>> = sessionStats
		.map { stats -> stats.mapValues { it.value.count } }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val totalMinutesByDate: StateFlow<Map<LocalDate, Int>> = sessionStats
		.map { stats -> stats.mapValues { it.value.totalMinutes } }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())
}

private data class SessionDayStats(
	val count: Int,
	val totalMinutes: Int
)

