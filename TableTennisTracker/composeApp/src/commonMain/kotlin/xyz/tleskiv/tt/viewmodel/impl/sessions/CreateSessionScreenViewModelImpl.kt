package xyz.tleskiv.tt.viewmodel.impl.sessions

import androidx.lifecycle.viewModelScope
import com.kizitonwose.calendar.core.now
import kotlinx.coroutines.launch
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.LocalTime
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
class CreateSessionScreenViewModelImpl(
	date: LocalDate?,
	private val sessionService: TrainingSessionService,
	private val preferencesService: UserPreferencesService
) : CreateSessionScreenViewModel() {
	private val _startDate = date ?: LocalDate.now()
	override val initialDate: LocalDate = _startDate
	override val inputData = InputData(_startDate)

	init {
		viewModelScope.launch {
			val prefs = preferencesService.getAllPreferences()
			inputData.durationMinutes.intValue = prefs.defaultSessionDurationMinutes
			inputData.rpeValue.intValue = prefs.defaultRpe
			inputData.selectedSessionType.value = prefs.defaultSessionType
			inputData.notes.value = prefs.defaultNotes
		}
	}

	override fun saveSession(onSuccess: () -> Unit) {
		viewModelScope.launch {
			sessionService.addSession(
				dateTime = LocalDateTime(inputData.selectedDate.value, LocalTime(12, 0)),
				durationMinutes = inputData.durationMinutes.intValue,
				rpe = inputData.rpeValue.intValue,
				sessionType = inputData.selectedSessionType.value,
				notes = inputData.notes.value.takeIf { it.isNotBlank() }
			)
			onSuccess()
		}
	}
}
