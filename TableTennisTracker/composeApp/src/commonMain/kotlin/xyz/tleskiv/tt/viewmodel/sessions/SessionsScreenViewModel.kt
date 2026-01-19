package xyz.tleskiv.tt.viewmodel.sessions

import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import kotlin.uuid.Uuid

data class SessionUiModel(
	val id: Uuid,
	val date: LocalDate,
	val durationMinutes: Int,
	val sessionType: SessionType?,
	val rpe: Int,
	val notes: String?
)

abstract class SessionsScreenViewModel : ViewModelBase() {
	abstract val sessions: StateFlow<Map<LocalDate, List<SessionUiModel>>>
	abstract val inputData: InputData

	@Stable
	class InputData {
		var isWeekMode by mutableStateOf(true)
	}
}
