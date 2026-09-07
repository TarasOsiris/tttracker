package xyz.tleskiv.tt.viewmodel.settings

import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.db.Opponent
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import kotlin.uuid.Uuid

abstract class OpponentsScreenViewModel : ViewModelBase() {
	abstract val opponents: StateFlow<List<Opponent>>

	abstract fun deleteOpponent(id: Uuid)
}
