package xyz.tleskiv.tt.viewmodel.impl.settings

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.viewmodel.settings.SettingsScreenViewModel

class SettingsScreenViewModelImpl(
	private val userPreferencesService: UserPreferencesService
) : SettingsScreenViewModel() {

	private val _defaultSessionDuration = MutableStateFlow(UserPreferencesService.DEFAULT_SESSION_DURATION_MINUTES)
	override val defaultSessionDuration: StateFlow<Int> = _defaultSessionDuration.asStateFlow()

	private val _defaultRpe = MutableStateFlow(UserPreferencesService.DEFAULT_RPE)
	override val defaultRpe: StateFlow<Int> = _defaultRpe.asStateFlow()

	init {
		viewModelScope.launch {
			val prefs = userPreferencesService.getAllPreferences()
			_defaultSessionDuration.value = prefs.defaultSessionDurationMinutes
			_defaultRpe.value = prefs.defaultRpe
		}
	}

	override fun setDefaultSessionDuration(minutes: Int) {
		viewModelScope.launch {
			userPreferencesService.setDefaultSessionDuration(minutes)
			_defaultSessionDuration.value = minutes
		}
	}

	override fun setDefaultRpe(rpe: Int) {
		viewModelScope.launch {
			userPreferencesService.setDefaultRpe(rpe)
			_defaultRpe.value = rpe
		}
	}
}
