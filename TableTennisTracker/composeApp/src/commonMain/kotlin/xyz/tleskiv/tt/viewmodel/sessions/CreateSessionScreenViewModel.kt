package xyz.tleskiv.tt.viewmodel.sessions

import androidx.compose.runtime.*
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.viewmodel.ViewModelBase

abstract class CreateSessionScreenViewModel : ViewModelBase() {
	abstract val initialDate: LocalDate

	abstract val inputData: InputData

	@Stable
	class InputData(initialDate: LocalDate) {
		val selectedDate = mutableStateOf(initialDate)
		val durationText = mutableStateOf("")
		val selectedSessionType = mutableStateOf<SessionType?>(null)
		val rpeValue = mutableFloatStateOf(5f)
		val notes = mutableStateOf("")
		val showDatePicker = mutableStateOf(false)

		val isFormValid by derivedStateOf {
			val duration = durationText.value.toIntOrNull()
			duration != null && duration in 5..300 && selectedSessionType.value != null
		}
	}
}