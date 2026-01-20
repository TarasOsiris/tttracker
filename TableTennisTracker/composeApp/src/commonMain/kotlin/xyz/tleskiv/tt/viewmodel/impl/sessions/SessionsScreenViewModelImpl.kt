package xyz.tleskiv.tt.viewmodel.impl.sessions

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDateTime
import xyz.tleskiv.tt.viewmodel.sessions.SessionUiModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel

class SessionsScreenViewModelImpl(
	sessionService: TrainingSessionService,
	userPreferencesRepository: UserPreferencesRepository
) : SessionsScreenViewModel() {
	override val inputData = InputData()

	override val firstDayOfWeek: StateFlow<DayOfWeek> = userPreferencesRepository.weekStartDay
		.map { it.toDayOfWeek() }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), DayOfWeek.MONDAY)

	override val highlightCurrentDay: StateFlow<Boolean> = userPreferencesRepository.highlightCurrentDay
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), true)

	override val sessions: StateFlow<Map<LocalDate, List<SessionUiModel>>> = sessionService.allSessions
		.map { allSessions ->
			allSessions.map { session ->
				val dateTime = session.date.toLocalDateTime()
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
