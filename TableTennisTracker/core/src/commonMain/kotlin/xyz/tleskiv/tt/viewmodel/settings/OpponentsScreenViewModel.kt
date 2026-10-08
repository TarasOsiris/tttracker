package xyz.tleskiv.tt.viewmodel.settings

import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.analytics.OpponentRecord
import xyz.tleskiv.tt.data.model.Opponent
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import kotlin.uuid.Uuid

abstract class OpponentsScreenViewModel : ViewModelBase() {
	abstract val opponents: StateFlow<List<Opponent>>

	/** Head-to-head record by opponent id. Pro shows them on the rows. */
	abstract val records: StateFlow<Map<Uuid, OpponentRecord>>

	abstract fun deleteOpponent(id: Uuid)
}
