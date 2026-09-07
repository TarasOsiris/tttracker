package xyz.tleskiv.tt.viewmodel.impl.sessions

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.model.mappers.toMatchUiModel
import xyz.tleskiv.tt.model.mappers.toSessionUiModel
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel
import kotlin.uuid.Uuid

class SessionDetailsScreenViewModelImpl(
	sessionId: String,
	private val sessionService: TrainingSessionService,
	private val analyticsService: AnalyticsService
) : SessionDetailsScreenViewModel() {
	private val _uiState = MutableStateFlow(UiState())
	override val uiState: StateFlow<UiState> = _uiState.asStateFlow()

	init {
		loadSession(sessionId)
	}

	private fun loadSession(sessionId: String) {
		viewModelScope.launch {
			val uuid = Uuid.parse(sessionId)
			val session = requireNotNull(sessionService.getSessionById(uuid)) { "Session not found" }
			_uiState.value = UiState(
				session = session.toSessionUiModel(),
				matches = session.matches.map { it.toMatchUiModel() },
				isLoading = false
			)
		}
	}

	override fun deleteSession(onDeleted: () -> Unit) {
		val session = _uiState.value.session ?: return
		viewModelScope.launch {
			sessionService.deleteSession(session.id)
			analyticsService.capture("session_deleted")
			onDeleted()
		}
	}
}
