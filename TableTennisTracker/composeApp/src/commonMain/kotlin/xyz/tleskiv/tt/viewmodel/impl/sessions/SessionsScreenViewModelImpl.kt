package xyz.tleskiv.tt.viewmodel.impl.sessions

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.viewmodel.sessions.SessionUiModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel
import kotlin.time.Instant

class SessionsScreenViewModelImpl(sessionService: TrainingSessionService) : SessionsScreenViewModel() {
	override val sessions: StateFlow<Map<LocalDate, List<SessionUiModel>>> = sessionService.allSessions
		.map { allSessions ->
			allSessions.map { session ->
				val dateTime = Instant.fromEpochMilliseconds(session.date).toLocalDateTime(TimeZone.currentSystemDefault())
				SessionUiModel(
					id = session.id,
					date = dateTime.date,
					durationMinutes = session.duration_min.toInt(),
					sessionType = session.session_type?.let { SessionType.fromDb(it) },
					rpe = session.rpe.toInt(),
					notes = session.notes
				)
			}.groupBy { it.date }
		}
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())
}