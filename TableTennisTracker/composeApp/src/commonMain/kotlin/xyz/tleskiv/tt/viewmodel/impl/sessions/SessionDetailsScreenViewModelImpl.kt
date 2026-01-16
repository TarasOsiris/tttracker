package xyz.tleskiv.tt.viewmodel.impl.sessions

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsUiState
import xyz.tleskiv.tt.viewmodel.sessions.SessionUiModel
import kotlin.time.Instant
import kotlin.uuid.Uuid

class SessionDetailsScreenViewModelImpl(
	sessionId: String,
	private val sessionService: TrainingSessionService
) : SessionDetailsScreenViewModel() {
	private val _uiState = MutableStateFlow(SessionDetailsUiState())
	override val uiState: StateFlow<SessionDetailsUiState> = _uiState.asStateFlow()

	init {
		loadSession(sessionId)
	}

	private fun loadSession(sessionId: String) {
		viewModelScope.launch {
			try {
				val uuid = Uuid.parse(sessionId)
				val session = sessionService.getSessionById(uuid)
				if (session != null) {
					val dateTime =
						Instant.fromEpochMilliseconds(session.date).toLocalDateTime(TimeZone.currentSystemDefault())
					val uiModel = SessionUiModel(
						id = session.id,
						date = dateTime.date,
						durationMinutes = session.duration_min.toInt(),
						sessionType = session.session_type?.let { SessionType.fromDb(it) },
						rpe = session.rpe.toInt(),
						notes = session.notes
					)
					_uiState.value = SessionDetailsUiState(session = uiModel, isLoading = false)
				} else {
					_uiState.value = SessionDetailsUiState(isLoading = false, error = "Session not found")
				}
			} catch (e: Exception) {
				_uiState.value = SessionDetailsUiState(isLoading = false, error = "Invalid session ID")
			}
		}
	}
}
