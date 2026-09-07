package xyz.tleskiv.tt.viewmodel.sessions

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
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
	val competitionLevel: CompetitionLevel? = null,
	val notes: String? = null
)

private val VALID_DURATION_RANGE = 10..300

abstract class CreateSessionScreenViewModel : ViewModelBase() {
	abstract val initialDate: LocalDate

	abstract val inputData: InputData

	abstract fun saveSession(onSuccess: () -> Unit)

	abstract fun addPendingMatch(match: PendingMatch)

	abstract fun updatePendingMatch(match: PendingMatch)

	abstract fun removePendingMatch(matchId: String)

	class InputData(
		scope: CoroutineScope,
		initialDate: LocalDate,
		initialDurationMinutes: Int = 60
	) {
		val selectedDate = MutableStateFlow(initialDate)
		val durationMinutes = MutableStateFlow(initialDurationMinutes)
		val selectedSessionType = MutableStateFlow(SessionType.TECHNIQUE)
		val rpeValue = MutableStateFlow(5)
		val notes = MutableStateFlow("")
		val showDatePicker = MutableStateFlow(false)
		val pendingMatches = MutableStateFlow<List<PendingMatch>>(emptyList())
		val showAddMatchDialog = MutableStateFlow(false)
		val editingMatch = MutableStateFlow<PendingMatch?>(null)

		val isFormValid: StateFlow<Boolean> = durationMinutes
			.map { it in VALID_DURATION_RANGE }
			.stateIn(scope, SharingStarted.Eagerly, initialDurationMinutes in VALID_DURATION_RANGE)
	}
}
