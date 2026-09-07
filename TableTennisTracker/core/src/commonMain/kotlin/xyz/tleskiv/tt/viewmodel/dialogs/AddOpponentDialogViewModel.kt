package xyz.tleskiv.tt.viewmodel.dialogs

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.util.mapState
import xyz.tleskiv.tt.viewmodel.ViewModelBase

abstract class AddOpponentDialogViewModel : ViewModelBase() {
	abstract val inputData: InputData

	abstract fun saveOpponent(onSuccess: () -> Unit)

	class InputData(scope: CoroutineScope) {
		val name = MutableStateFlow("")
		val club = MutableStateFlow("")
		val rating = MutableStateFlow("")
		val handedness = MutableStateFlow<Handedness?>(null)
		val playingStyle = MutableStateFlow<PlayingStyle?>(null)
		val notes = MutableStateFlow("")

		val isValid: StateFlow<Boolean> = name.mapState(scope) { it.isNotBlank() }

		val ratingValue: Double? get() = rating.value.toDoubleOrNull()
	}
}
