package xyz.tleskiv.tt.viewmodel.impl.settings

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.model.WeekStartDay
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.service.UserPreferencesService.UserPreferences
import xyz.tleskiv.tt.viewmodel.settings.GeneralSettingsScreenViewModel

class GeneralSettingsScreenViewModelImpl(
	private val userPreferencesService: UserPreferencesService,
	private val userPreferencesRepository: UserPreferencesRepository
) : GeneralSettingsScreenViewModel() {

	override val inputData = InputData()

	override val themeMode: StateFlow<AppThemeMode> = userPreferencesRepository.themeMode
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), AppThemeMode.SYSTEM)

	override val weekStartDay: StateFlow<WeekStartDay> = userPreferencesRepository.weekStartDay
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), WeekStartDay.MONDAY)

	override val highlightCurrentDay: StateFlow<Boolean> = userPreferencesRepository.highlightCurrentDay
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), true)

	override fun setThemeMode(mode: AppThemeMode) {
		viewModelScope.launch {
			userPreferencesRepository.setThemeMode(mode)
		}
	}

	override fun setWeekStartDay(day: WeekStartDay) {
		viewModelScope.launch {
			userPreferencesRepository.setWeekStartDay(day)
		}
	}

	override fun setHighlightCurrentDay(highlight: Boolean) {
		viewModelScope.launch {
			userPreferencesRepository.setHighlightCurrentDay(highlight)
		}
	}

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
