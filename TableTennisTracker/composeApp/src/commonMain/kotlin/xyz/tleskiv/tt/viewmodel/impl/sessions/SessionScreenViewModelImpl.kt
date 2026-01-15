package xyz.tleskiv.tt.viewmodel.impl.sessions

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.viewmodel.sessions.SessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionUiModel
import kotlin.time.Instant

class SessionScreenViewModelImpl(private val sessionService: TrainingSessionService) : SessionScreenViewModel() {
	private val _sessions = MutableStateFlow<Map<LocalDate, List<SessionUiModel>>>(emptyMap())
	override val sessions: StateFlow<Map<LocalDate, List<SessionUiModel>>> = _sessions.asStateFlow()

	init {
		loadSessions()
	}

	private fun loadSessions() {
		val allSessions = sessionService.getAllSessions()
		val grouped = allSessions.map { session ->
			val dateTime = Instant.fromEpochMilliseconds(session.date).toLocalDateTime(TimeZone.currentSystemDefault())
			SessionUiModel(
				id = session.id,
				date = dateTime.date,
				durationMinutes = session.duration_min.toInt(),
				sessionType = session.session_type?.let { SessionType.fromDb(it) },
				rpe = session.rpe?.toInt(),
				notes = session.notes
			)
		}.groupBy { it.date }
		_sessions.value = grouped
	}
}