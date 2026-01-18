package xyz.tleskiv.tt.viewmodel.impl.sessions

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import com.kizitonwose.calendar.core.now
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.LocalTime
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDateTime
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.EditSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.EditSessionUiState
import kotlin.uuid.Uuid

class EditSessionScreenViewModelImpl(
	sessionId: String,
	private val sessionService: TrainingSessionService
) : EditSessionScreenViewModel() {
	private val _uiState = MutableStateFlow(EditSessionUiState())
	override val uiState: StateFlow<EditSessionUiState> = _uiState.asStateFlow()

	override val inputData = CreateSessionScreenViewModel.InputData(LocalDate.now())
	private lateinit var sessionUuid: Uuid
	private var sessionTime: LocalTime = LocalTime(12, 0)

	init {
		loadSession(sessionId)
	}

	private fun loadSession(sessionId: String) {
		viewModelScope.launch {
			val uuid = Uuid.parse(sessionId)
			sessionUuid = uuid
			val session = requireNotNull(sessionService.getSessionById(uuid)) {
				"Session not found"
			}

			val dateTime = session.date.toLocalDateTime()
			sessionTime = dateTime.time
			inputData.selectedDate.value = dateTime.date
			inputData.durationMinutes.intValue = session.duration_min.toInt()
			inputData.rpeValue.intValue = session.rpe.toInt()
			inputData.selectedSessionType.value =
				session.session_type?.let { SessionType.fromDb(it) } ?: SessionType.TECHNIQUE
			inputData.notes.value = session.notes.orEmpty()

			_uiState.value = EditSessionUiState(isLoading = false)
		}
	}

	override fun saveSession(onSuccess: () -> Unit) {
		viewModelScope.launch {
			sessionService.editSession(
				id = sessionUuid,
				dateTime = LocalDateTime(inputData.selectedDate.value, sessionTime),
				durationMinutes = inputData.durationMinutes.intValue,
				rpe = inputData.rpeValue.intValue,
				sessionType = inputData.selectedSessionType.value,
				notes = inputData.notes.value.takeIf { it.isNotBlank() }
			)
			onSuccess()
		}
	}
}
