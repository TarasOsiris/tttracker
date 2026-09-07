package xyz.tleskiv.tt.viewmodel.dialogs

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.viewmodel.ViewModelBase

abstract class EditOpponentDialogViewModel : ViewModelBase() {
	abstract val inputData: InputData
	abstract val isLoading: StateFlow<Boolean>
	abstract fun updateOpponent(onSuccess: () -> Unit)

	class InputData(scope: CoroutineScope) {
		val name = MutableStateFlow("")
		val club = MutableStateFlow("")
		val rating = MutableStateFlow("")
		val handedness = MutableStateFlow<Handedness?>(null)
		val playingStyle = MutableStateFlow<PlayingStyle?>(null)
		val notes = MutableStateFlow("")

		val isValid: StateFlow<Boolean> = name
			.map { it.isNotBlank() }
			.stateIn(scope, SharingStarted.Eagerly, false)

		val ratingValue: Double? get() = rating.value.toDoubleOrNull()
	}
}
