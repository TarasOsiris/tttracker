package xyz.tleskiv.tt.viewmodel.sessions

import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel
import kotlin.uuid.Uuid

abstract class SessionDetailsScreenViewModel : ViewModelBase() {
	abstract val uiState: StateFlow<UiState>
	abstract fun deleteSession(onDeleted: () -> Unit)

	data class MatchUiModel(
		val id: Uuid,
		val opponentName: String,
		val myGamesWon: Int,
		val opponentGamesWon: Int,
		val isDoubles: Boolean,
		val isRanked: Boolean,
		val competitionLevel: CompetitionLevel?,
		val rpe: Int?,
		val notes: String?
	) {
		val isWin: Boolean get() = myGamesWon > opponentGamesWon
		val scoreDisplay: String get() = "$myGamesWon - $opponentGamesWon"
	}

	data class UiState(
		val session: SessionUiModel? = null,
		val matches: List<MatchUiModel> = emptyList(),
		val isLoading: Boolean = true,
		val error: String? = null
	)
}
