package xyz.tleskiv.tt.viewmodel.sessions

import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.viewmodel.ViewModelBase

data class SessionDetailsUiState(
	val session: SessionUiModel? = null,
	val isLoading: Boolean = true,
	val error: String? = null
)

abstract class SessionDetailsScreenViewModel : ViewModelBase() {
	abstract val uiState: StateFlow<SessionDetailsUiState>
}
