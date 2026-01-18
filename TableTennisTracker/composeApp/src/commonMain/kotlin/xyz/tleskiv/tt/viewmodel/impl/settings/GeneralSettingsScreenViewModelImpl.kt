package xyz.tleskiv.tt.viewmodel.impl.settings

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.service.UserPreferencesService.UserPreferences
import xyz.tleskiv.tt.viewmodel.settings.GeneralSettingsScreenViewModel

class GeneralSettingsScreenViewModelImpl(
	private val userPreferencesService: UserPreferencesService
) : GeneralSettingsScreenViewModel() {

	override val inputData = InputData()

	init {
		viewModelScope.launch {
			val prefs = userPreferencesService.getAllPreferences()
			inputData.defaultSessionDuration.intValue = prefs.defaultSessionDurationMinutes
			inputData.defaultRpe.intValue = prefs.defaultRpe
			inputData.defaultSessionType.value = prefs.defaultSessionType
			inputData.defaultNotes.value = prefs.defaultNotes
		}
	}

	override fun onCleared() {
		runBlocking {
			persistPreferences()
		}
		super.onCleared()
	}

	private suspend fun persistPreferences() {
		userPreferencesService.setAllPreferences(
			UserPreferences(
				defaultSessionDurationMinutes = inputData.defaultSessionDuration.intValue,
				defaultRpe = inputData.defaultRpe.intValue,
				defaultSessionType = inputData.defaultSessionType.value,
				defaultNotes = inputData.defaultNotes.value
			)
		)
	}
}
