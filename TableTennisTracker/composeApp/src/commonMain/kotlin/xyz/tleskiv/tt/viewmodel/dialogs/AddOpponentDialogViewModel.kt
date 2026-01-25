package xyz.tleskiv.tt.viewmodel.dialogs

import androidx.compose.runtime.Stable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.viewmodel.ViewModelBase

abstract class AddOpponentDialogViewModel : ViewModelBase() {
	abstract val inputData: InputData
	abstract fun saveOpponent(onSuccess: () -> Unit)

	@Stable
	class InputData {
		val name = mutableStateOf("")
		val club = mutableStateOf("")
		val rating = mutableStateOf("")
		val handedness = mutableStateOf<Handedness?>(null)
		val playingStyle = mutableStateOf<PlayingStyle?>(null)
		val notes = mutableStateOf("")

		val isValid by derivedStateOf { name.value.isNotBlank() }

		val ratingValue: Double? get() = rating.value.toDoubleOrNull()
	}
}
