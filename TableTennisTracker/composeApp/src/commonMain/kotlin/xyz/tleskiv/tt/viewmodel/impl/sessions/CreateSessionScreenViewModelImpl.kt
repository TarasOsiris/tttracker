package xyz.tleskiv.tt.viewmodel.impl.sessions

import androidx.lifecycle.viewModelScope
import com.kizitonwose.calendar.core.now
import kotlinx.coroutines.launch
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.LocalTime
import xyz.tleskiv.tt.service.MatchInput
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch

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
				notes = inputData.notes.value.takeIf { it.isNotBlank() },
				matches = inputData.pendingMatches.map { pendingMatch ->
					MatchInput(
						opponentId = pendingMatch.opponentId,
						opponentName = pendingMatch.opponentName,
						myGamesWon = pendingMatch.myGamesWon,
						opponentGamesWon = pendingMatch.opponentGamesWon,
						isDoubles = pendingMatch.isDoubles,
						isRanked = pendingMatch.isRanked,
						competitionLevel = pendingMatch.competitionLevel
					)
				}
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
