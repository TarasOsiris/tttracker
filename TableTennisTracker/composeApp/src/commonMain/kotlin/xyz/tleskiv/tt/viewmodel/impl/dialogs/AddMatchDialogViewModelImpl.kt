package xyz.tleskiv.tt.viewmodel.impl.dialogs

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import xyz.tleskiv.tt.db.Opponent
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.viewmodel.dialogs.AddMatchDialogViewModel
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch

class AddMatchDialogViewModelImpl(
	editingMatch: PendingMatch?,
	opponentService: OpponentService
) : AddMatchDialogViewModel() {

	override val isEditMode: Boolean = editingMatch != null

	override val inputData = InputData(editingMatch)

	override val opponents: StateFlow<List<Opponent>> = opponentService.allOpponents
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

	override fun buildPendingMatch(): PendingMatch = inputData.toPendingMatch()
}
