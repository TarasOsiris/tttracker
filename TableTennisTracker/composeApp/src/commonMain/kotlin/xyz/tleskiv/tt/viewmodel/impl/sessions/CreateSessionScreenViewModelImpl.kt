package xyz.tleskiv.tt.viewmodel.impl.sessions

import com.kizitonwose.calendar.core.now
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel

class CreateSessionScreenViewModelImpl(val date: LocalDate?) : CreateSessionScreenViewModel() {
	private val _startDate = date ?: LocalDate.now()
	override val initialDate: LocalDate = _startDate
	override val inputData = InputData(_startDate)

	init {
		println("CreateSessionScreenViewModelImpl created")
	}

	override fun onCleared() {
		println("CreateSessionScreenViewModelImpl cleared")
		super.onCleared()
	}
}