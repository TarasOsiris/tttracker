package xyz.tleskiv.tt.viewmodel.impl.dialogs

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.viewmodel.dialogs.EditOpponentDialogViewModel
import kotlin.uuid.Uuid

class EditOpponentDialogViewModelImpl(
	private val opponentId: Uuid,
	private val opponentService: OpponentService
) : EditOpponentDialogViewModel() {

	override val inputData = InputData()
	override var isLoading by mutableStateOf(true)
		private set

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
			isLoading = false
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
			onSuccess()
		}
	}
}
