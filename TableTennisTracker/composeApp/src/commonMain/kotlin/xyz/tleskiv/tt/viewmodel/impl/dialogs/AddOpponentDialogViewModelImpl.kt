package xyz.tleskiv.tt.viewmodel.impl.dialogs

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.viewmodel.dialogs.AddOpponentDialogViewModel

class AddOpponentDialogViewModelImpl(
	private val opponentService: OpponentService
) : AddOpponentDialogViewModel() {

	override val inputData = InputData()

	override fun saveOpponent(onSuccess: () -> Unit) {
		viewModelScope.launch {
			opponentService.addOpponent(
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
