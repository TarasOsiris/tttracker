package xyz.tleskiv.tt.viewmodel.settings

import androidx.compose.runtime.Stable
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.viewmodel.ViewModelBase

abstract class GeneralSettingsScreenViewModel : ViewModelBase() {
	abstract val inputData: InputData

	@Stable
	class InputData(
		defaultSessionDurationMinutes: Int = UserPreferencesService.DEFAULT_SESSION_DURATION_MINUTES,
		defaultRpe: Int = UserPreferencesService.DEFAULT_RPE,
		defaultSessionType: SessionType = UserPreferencesService.DEFAULT_SESSION_TYPE,
		defaultNotes: String = UserPreferencesService.DEFAULT_NOTES
	) {
		val defaultSessionDuration = mutableIntStateOf(defaultSessionDurationMinutes)
		val defaultRpe = mutableIntStateOf(defaultRpe)
		val defaultSessionType = mutableStateOf(defaultSessionType)
		val defaultNotes = mutableStateOf(defaultNotes)
	}
}
