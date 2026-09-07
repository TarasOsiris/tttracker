package xyz.tleskiv.tt.viewmodel.dialogs

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.data.model.Opponent
import xyz.tleskiv.tt.util.mapState
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch
import kotlin.uuid.Uuid

abstract class AddMatchDialogViewModel : ViewModelBase() {
	abstract val inputData: InputData
	abstract val opponents: StateFlow<List<Opponent>>
	abstract val isEditMode: Boolean

	abstract fun buildPendingMatch(): PendingMatch

	class InputData(scope: CoroutineScope, editingMatch: PendingMatch?) {
		private val matchId = editingMatch?.id ?: Uuid.random().toString()

		val opponentName = MutableStateFlow(editingMatch?.opponentName ?: "")
		val opponentId = MutableStateFlow(editingMatch?.opponentId)
		val myScore = MutableStateFlow(editingMatch?.myGamesWon ?: 0)
		val opponentScore = MutableStateFlow(editingMatch?.opponentGamesWon ?: 0)
		val isDoubles = MutableStateFlow(editingMatch?.isDoubles ?: false)
		val isRanked = MutableStateFlow(editingMatch?.isRanked ?: false)
		val competitionLevel = MutableStateFlow(editingMatch?.competitionLevel)
		val notes = MutableStateFlow(editingMatch?.notes ?: "")

		val isValid: StateFlow<Boolean> = opponentName.mapState(scope) { it.isNotBlank() }

		fun toPendingMatch() = PendingMatch(
			id = matchId,
			opponentName = opponentName.value,
			opponentId = opponentId.value,
			myGamesWon = myScore.value,
			opponentGamesWon = opponentScore.value,
			isDoubles = isDoubles.value,
			isRanked = isRanked.value,
			competitionLevel = competitionLevel.value,
			notes = notes.value.takeIf { it.isNotBlank() }
		)
	}
}
