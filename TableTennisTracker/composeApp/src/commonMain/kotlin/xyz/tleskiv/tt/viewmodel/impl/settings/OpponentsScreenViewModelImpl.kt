package xyz.tleskiv.tt.viewmodel.impl.settings

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import xyz.tleskiv.tt.db.Opponent
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.viewmodel.settings.OpponentsScreenViewModel

class OpponentsScreenViewModelImpl(
	private val opponentService: OpponentService
) : OpponentsScreenViewModel() {

	override val opponents: StateFlow<List<Opponent>> = opponentService.allOpponents
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())
}
