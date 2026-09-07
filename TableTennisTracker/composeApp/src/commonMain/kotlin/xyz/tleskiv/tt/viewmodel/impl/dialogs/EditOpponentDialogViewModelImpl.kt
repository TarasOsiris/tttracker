package xyz.tleskiv.tt.viewmodel.impl.dialogs

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.viewmodel.dialogs.EditOpponentDialogViewModel
import kotlin.uuid.Uuid

class EditOpponentDialogViewModelImpl(
	private val opponentId: Uuid,
	private val opponentService: OpponentService,
	private val analyticsService: AnalyticsService
) : EditOpponentDialogViewModel() {

	override val inputData = InputData(viewModelScope)

	private val _isLoading = MutableStateFlow(true)
	override val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

	init {
		loadOpponent()
	}

	private fun loadOpponent() {
		viewModelScope.launch {
			val opponent = opponentService.getOpponentById(opponentId)
			if (opponent != null) {
				inputData.name.value = opponent.name
				inputData.club.value = opponent.club ?: ""
				inputData.rating.value = opponent.rating?.toInt()?.toString() ?: ""
				inputData.handedness.value = opponent.handedness?.let { Handedness.fromDb(it) }
				inputData.playingStyle.value = opponent.style?.let { PlayingStyle.fromDb(it) }
				inputData.notes.value = opponent.notes ?: ""
			}
			_isLoading.value = false
		}
	}

	override fun updateOpponent(onSuccess: () -> Unit) {
		viewModelScope.launch {
			opponentService.updateOpponent(
				id = opponentId,
				name = inputData.name.value.trim(),
				club = inputData.club.value.trim().ifBlank { null },
				rating = inputData.ratingValue,
				handedness = inputData.handedness.value,
				style = inputData.playingStyle.value,
				notes = inputData.notes.value.trim().ifBlank { null }
			)
			analyticsService.capture("opponent_edited")
			onSuccess()
		}
	}
}
