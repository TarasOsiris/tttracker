package xyz.tleskiv.tt.viewmodel.sessions

import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.viewmodel.ViewModelBase

data class EditSessionUiState(
	val isLoading: Boolean = true,
	val error: String? = null
)

abstract class EditSessionScreenViewModel : ViewModelBase() {
	abstract val inputData: CreateSessionScreenViewModel.InputData
	abstract val uiState: StateFlow<EditSessionUiState>

	abstract fun saveSession(onSuccess: () -> Unit)
	abstract fun addPendingMatch(match: PendingMatch)
	abstract fun updatePendingMatch(match: PendingMatch)
	abstract fun removePendingMatch(matchId: String)
}
