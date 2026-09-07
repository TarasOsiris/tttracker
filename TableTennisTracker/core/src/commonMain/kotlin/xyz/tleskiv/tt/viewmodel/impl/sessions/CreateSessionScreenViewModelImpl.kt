package xyz.tleskiv.tt.viewmodel.impl.sessions

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.LocalTime
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.model.mappers.toMatchInput
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.util.today
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch

class CreateSessionScreenViewModelImpl(
	date: LocalDate?,
	private val sessionService: TrainingSessionService,
	private val preferencesService: UserPreferencesService,
	private val analyticsService: AnalyticsService
) : CreateSessionScreenViewModel() {
	private val _startDate = date ?: today()
	override val initialDate: LocalDate = _startDate
	override val inputData = InputData(viewModelScope, _startDate)

	init {
		viewModelScope.launch {
			val prefs = preferencesService.getAllPreferences()
			inputData.durationMinutes.value = prefs.defaultSessionDurationMinutes
			inputData.rpeValue.value = prefs.defaultRpe
			inputData.selectedSessionType.value = prefs.defaultSessionType
			inputData.notes.value = prefs.defaultNotes
		}
	}

	override fun saveSession(onSuccess: () -> Unit) {
		viewModelScope.launch {
			sessionService.addSession(
				dateTime = LocalDateTime(inputData.selectedDate.value, LocalTime(12, 0)),
				durationMinutes = inputData.durationMinutes.value,
				rpe = inputData.rpeValue.value,
				sessionType = inputData.selectedSessionType.value,
				notes = inputData.notes.value.takeIf { it.isNotBlank() },
				matches = inputData.pendingMatches.value.map { it.toMatchInput() }
			)
			analyticsService.capture(
				"session_created", mapOf(
					"session_type" to inputData.selectedSessionType.value.name,
					"duration_minutes" to inputData.durationMinutes.value,
					"rpe" to inputData.rpeValue.value,
					"match_count" to inputData.pendingMatches.value.size
				)
			)
			onSuccess()
		}
	}

	override fun addPendingMatch(match: PendingMatch) = inputData.addMatch(match)

	override fun updatePendingMatch(match: PendingMatch) = inputData.updateMatch(match)

	override fun removePendingMatch(matchId: String) = inputData.removeMatch(matchId)
}
