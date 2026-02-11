package xyz.tleskiv.tt.viewmodel.impl.settings

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.model.WeekStartDay
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.service.UserPreferencesService.UserPreferences
import xyz.tleskiv.tt.viewmodel.settings.GeneralSettingsScreenViewModel

class GeneralSettingsScreenViewModelImpl(
	private val userPreferencesService: UserPreferencesService,
	private val userPreferencesRepository: UserPreferencesRepository,
	private val analyticsService: AnalyticsService
) : GeneralSettingsScreenViewModel() {

	override val inputData = InputData()

	override val themeMode: StateFlow<AppThemeMode> = userPreferencesRepository.themeMode
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), AppThemeMode.SYSTEM)

	override val weekStartDay: StateFlow<WeekStartDay> = userPreferencesRepository.weekStartDay
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), WeekStartDay.MONDAY)

	override val highlightCurrentDay: StateFlow<Boolean> = userPreferencesRepository.highlightCurrentDay
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), true)

	override val appLocale: StateFlow<AppLocale> = userPreferencesRepository.appLocale
		.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), AppLocale.SYSTEM)

	override fun setThemeMode(mode: AppThemeMode) {
		viewModelScope.launch {
			userPreferencesRepository.setThemeMode(mode)
			analyticsService.capture("theme_changed", mapOf("theme" to mode.name))
		}
	}

	override fun setWeekStartDay(day: WeekStartDay) {
		viewModelScope.launch {
			userPreferencesRepository.setWeekStartDay(day)
			analyticsService.capture("week_start_day_changed", mapOf("day" to day.name))
		}
	}

	override fun setHighlightCurrentDay(highlight: Boolean) {
		viewModelScope.launch {
			userPreferencesRepository.setHighlightCurrentDay(highlight)
			analyticsService.capture("highlight_current_day_toggled", mapOf("enabled" to highlight))
		}
	}

	override fun setAppLocale(locale: AppLocale) {
		viewModelScope.launch {
			userPreferencesRepository.setAppLocale(locale)
			analyticsService.capture("locale_changed", mapOf("locale" to locale.name))
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
