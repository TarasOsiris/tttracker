package xyz.tleskiv.tt.viewmodel.sessions

import androidx.compose.runtime.*
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import kotlin.uuid.Uuid

data class PendingMatch(
	val id: String,
	val opponentName: String,
	val opponentId: Uuid?,
	val myGamesWon: Int,
	val opponentGamesWon: Int,
	val isDoubles: Boolean = false,
	val isRanked: Boolean = false,
	val competitionLevel: CompetitionLevel? = null
)

abstract class CreateSessionScreenViewModel : ViewModelBase() {
	abstract val initialDate: LocalDate

	abstract val inputData: InputData

	abstract fun saveSession(onSuccess: () -> Unit)

	abstract fun addPendingMatch(match: PendingMatch)

	abstract fun updatePendingMatch(match: PendingMatch)

	abstract fun removePendingMatch(matchId: String)

	@Stable
	class InputData(initialDate: LocalDate, initialDurationMinutes: Int = 60) {
		val selectedDate = mutableStateOf(initialDate)
		val durationMinutes = mutableIntStateOf(initialDurationMinutes)
		val selectedSessionType = mutableStateOf<SessionType>(SessionType.TECHNIQUE)
		val rpeValue = mutableIntStateOf(5)
		val notes = mutableStateOf("")
		val showDatePicker = mutableStateOf(false)
		val pendingMatches = mutableStateListOf<PendingMatch>()
		val showAddMatchDialog = mutableStateOf(false)
		val editingMatch = mutableStateOf<PendingMatch?>(null)

		val isFormValid by derivedStateOf {
			durationMinutes.intValue in 10..300
		}
	}
}
