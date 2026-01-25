package xyz.tleskiv.tt.viewmodel.dialogs

import androidx.compose.runtime.Stable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.db.Opponent
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch
import kotlin.uuid.Uuid

abstract class AddMatchDialogViewModel : ViewModelBase() {
	abstract val inputData: InputData
	abstract val opponents: StateFlow<List<Opponent>>
	abstract val isEditMode: Boolean

	abstract fun buildPendingMatch(): PendingMatch

	@Stable
	class InputData(editingMatch: PendingMatch?) {
		private val matchId = editingMatch?.id ?: Uuid.random().toString()

		val opponentName = mutableStateOf(editingMatch?.opponentName ?: "")
		val opponentId = mutableStateOf(editingMatch?.opponentId)
		val myScore = mutableIntStateOf(editingMatch?.myGamesWon ?: 0)
		val opponentScore = mutableIntStateOf(editingMatch?.opponentGamesWon ?: 0)
		val isDoubles = mutableStateOf(editingMatch?.isDoubles ?: false)
		val isRanked = mutableStateOf(editingMatch?.isRanked ?: false)
		val competitionLevel = mutableStateOf(editingMatch?.competitionLevel)

		val isValid by derivedStateOf {
			opponentName.value.isNotBlank()
		}

		fun toPendingMatch() = PendingMatch(
			id = matchId,
			opponentName = opponentName.value,
			opponentId = opponentId.value,
			myGamesWon = myScore.intValue,
			opponentGamesWon = opponentScore.intValue,
			isDoubles = isDoubles.value,
			isRanked = isRanked.value,
			competitionLevel = competitionLevel.value
		)
	}
}
