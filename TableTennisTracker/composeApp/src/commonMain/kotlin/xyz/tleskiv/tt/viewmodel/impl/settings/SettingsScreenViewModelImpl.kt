package xyz.tleskiv.tt.viewmodel.impl.settings

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.viewmodel.settings.SettingsScreenViewModel

class SettingsScreenViewModelImpl(
	private val userPreferencesService: UserPreferencesService
) : SettingsScreenViewModel() {

	private val _defaultSessionDuration = MutableStateFlow(UserPreferencesService.DEFAULT_SESSION_DURATION_MINUTES)
	override val defaultSessionDuration: StateFlow<Int> = _defaultSessionDuration.asStateFlow()

	private val _defaultRpe = MutableStateFlow(UserPreferencesService.DEFAULT_RPE)
	override val defaultRpe: StateFlow<Int> = _defaultRpe.asStateFlow()

	private val _defaultSessionType = MutableStateFlow(UserPreferencesService.DEFAULT_SESSION_TYPE)
	override val defaultSessionType: StateFlow<SessionType> = _defaultSessionType.asStateFlow()

	private val _defaultNotes = MutableStateFlow(UserPreferencesService.DEFAULT_NOTES)
	override val defaultNotes: StateFlow<String> = _defaultNotes.asStateFlow()

	init {
		viewModelScope.launch {
			val prefs = userPreferencesService.getAllPreferences()
			_defaultSessionDuration.value = prefs.defaultSessionDurationMinutes
			_defaultRpe.value = prefs.defaultRpe
			_defaultSessionType.value = prefs.defaultSessionType
			_defaultNotes.value = prefs.defaultNotes
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

	override fun setDefaultSessionType(sessionType: SessionType) {
		viewModelScope.launch {
			userPreferencesService.setDefaultSessionType(sessionType)
			_defaultSessionType.value = sessionType
		}
	}

	override fun setDefaultNotes(notes: String) {
		viewModelScope.launch {
			userPreferencesService.setDefaultNotes(notes)
			_defaultNotes.value = notes
		}
	}
}
