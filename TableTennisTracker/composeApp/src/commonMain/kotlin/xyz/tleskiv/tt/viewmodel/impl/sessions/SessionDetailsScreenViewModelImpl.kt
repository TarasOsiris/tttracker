package xyz.tleskiv.tt.viewmodel.impl.sessions

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDateTime
import xyz.tleskiv.tt.viewmodel.sessions.MatchUiModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsUiState
import xyz.tleskiv.tt.viewmodel.sessions.SessionUiModel
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
			val uuid = Uuid.parse(sessionId)
			val session = requireNotNull(sessionService.getSessionById(uuid)) {
				"Session not found"
			}
			val dateTime = session.date.toLocalDateTime()
			val sessionUiModel = SessionUiModel(
				id = session.id,
				date = dateTime.date,
				durationMinutes = session.durationMinutes,
				sessionType = session.sessionType,
				rpe = session.rpe,
				notes = session.notes
			)

			val matchUiModels = session.matches.map { match ->
				MatchUiModel(
					id = match.id,
					opponentName = match.opponent.name,
					myGamesWon = match.myGamesWon,
					opponentGamesWon = match.opponentGamesWon,
					isDoubles = match.isDoubles,
					isRanked = match.isRanked,
					competitionLevel = match.competitionLevel,
					rpe = match.rpe,
					notes = match.notes
				)
			}

			_uiState.value = SessionDetailsUiState(
				session = sessionUiModel,
				matches = matchUiModels,
				isLoading = false
			)
		}
	}

	override fun deleteSession(onDeleted: () -> Unit) {
		val session = _uiState.value.session ?: return
		viewModelScope.launch {
			sessionService.deleteSession(session.id)
			onDeleted()
		}
	}
}
