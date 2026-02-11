package xyz.tleskiv.tt.viewmodel.impl.sessions

import androidx.lifecycle.viewModelScope
import com.kizitonwose.calendar.core.now
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.LocalTime
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.model.mappers.toMatchInput
import xyz.tleskiv.tt.model.mappers.toPendingMatch
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDateTime
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.EditSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.EditSessionUiState
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch
import kotlin.uuid.Uuid

class EditSessionScreenViewModelImpl(
	sessionId: String,
	private val sessionService: TrainingSessionService,
	private val analyticsService: AnalyticsService
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
			inputData.durationMinutes.intValue = session.durationMinutes
			inputData.rpeValue.intValue = session.rpe
			inputData.selectedSessionType.value = session.sessionType ?: SessionType.TECHNIQUE
			inputData.notes.value = session.notes.orEmpty()

			inputData.pendingMatches.clear()
			inputData.pendingMatches.addAll(session.matches.map { it.toPendingMatch() })

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
				notes = inputData.notes.value.takeIf { it.isNotBlank() },
				matches = inputData.pendingMatches.map { it.toMatchInput() }
			)
			analyticsService.capture(
				"session_edited", mapOf(
					"session_type" to inputData.selectedSessionType.value.name,
					"duration_minutes" to inputData.durationMinutes.intValue,
					"rpe" to inputData.rpeValue.intValue,
					"match_count" to inputData.pendingMatches.size
				)
			)
			onSuccess()
		}
	}

	override fun addPendingMatch(match: PendingMatch) {
		inputData.pendingMatches.add(match)
	}

	override fun updatePendingMatch(match: PendingMatch) {
		val index = inputData.pendingMatches.indexOfFirst { it.id == match.id }
		if (index >= 0) {
			inputData.pendingMatches[index] = match
		}
	}

	override fun removePendingMatch(matchId: String) {
		inputData.pendingMatches.removeAll { it.id == matchId }
	}
}
