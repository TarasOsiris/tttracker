package xyz.tleskiv.tt.viewmodel.sessions

import androidx.compose.runtime.*
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.viewmodel.ViewModelBase

abstract class CreateSessionScreenViewModel : ViewModelBase() {
	abstract val initialDate: LocalDate

	abstract val inputData: InputData

	abstract fun saveSession(onSuccess: () -> Unit)

	@Stable
	class InputData(initialDate: LocalDate, initialDurationMinutes: Int = 60) {
		val selectedDate = mutableStateOf(initialDate)
		val durationMinutes = mutableIntStateOf(initialDurationMinutes)
		val selectedSessionType = mutableStateOf<SessionType>(SessionType.TECHNIQUE)
		val rpeValue = mutableIntStateOf(5)
		val notes = mutableStateOf("")
		val showDatePicker = mutableStateOf(false)

		val isFormValid by derivedStateOf {
			durationMinutes.intValue in 10..300
		}
	}
}
