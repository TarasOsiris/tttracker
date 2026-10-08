package xyz.tleskiv.tt.viewmodel.impl.settings

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.analytics.OpponentRecord
import xyz.tleskiv.tt.data.model.Opponent
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.service.InsightsService
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.viewmodel.settings.OpponentsScreenViewModel
import kotlin.uuid.Uuid

class OpponentsScreenViewModelImpl(
	private val opponentService: OpponentService,
	insightsService: InsightsService,
	private val analyticsService: AnalyticsService
) : OpponentsScreenViewModel() {

	override val opponents: StateFlow<List<Opponent>> = opponentService.allOpponents
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

	override val records: StateFlow<Map<Uuid, OpponentRecord>> = insightsService.insights
		.map { insights -> insights.opponents.associateBy { it.opponentId } }
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

	override fun deleteOpponent(id: Uuid) {
		viewModelScope.launch {
			opponentService.deleteOpponent(id)
			analyticsService.capture("opponent_deleted")
		}
	}
}
