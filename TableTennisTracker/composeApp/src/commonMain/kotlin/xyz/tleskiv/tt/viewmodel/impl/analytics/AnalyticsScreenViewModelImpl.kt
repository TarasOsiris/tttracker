package xyz.tleskiv.tt.viewmodel.impl.analytics

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDate
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionUiModel

class AnalyticsScreenViewModelImpl(
	sessionService: TrainingSessionService
) : AnalyticsScreenViewModel() {
	override val sessionsListByDate: StateFlow<Map<LocalDate, List<SessionUiModel>>> = sessionService.allSessions
		.map { allSessions ->
			allSessions.groupBy { it.date.toLocalDate() }
				.mapValues { (_, sessions) ->
					sessions.map { session ->
						SessionUiModel(
							id = session.id,
							date = session.date.toLocalDate(),
							durationMinutes = session.duration_min.toInt(),
							sessionType = session.session_type?.let { SessionType.fromDb(it) },
							rpe = session.rpe.toInt(),
							notes = session.notes
						)
					}
				}
		}
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val sessionsByDate: StateFlow<Map<LocalDate, Int>> = sessionsListByDate
		.map { sessions -> sessions.mapValues { it.value.size } }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override val totalMinutesByDate: StateFlow<Map<LocalDate, Int>> = sessionsListByDate
		.map { sessions -> sessions.mapValues { entry -> entry.value.sumOf { it.durationMinutes } } }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())
}

