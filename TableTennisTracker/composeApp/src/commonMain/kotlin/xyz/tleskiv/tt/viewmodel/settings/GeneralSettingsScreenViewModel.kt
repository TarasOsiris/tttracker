package xyz.tleskiv.tt.viewmodel.settings

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.model.WeekStartDay
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.viewmodel.ViewModelBase

abstract class GeneralSettingsScreenViewModel : ViewModelBase() {
	abstract val inputData: InputData
	abstract val themeMode: StateFlow<AppThemeMode>
	abstract val weekStartDay: StateFlow<WeekStartDay>
	abstract val highlightCurrentDay: StateFlow<Boolean>
	abstract val appLocale: StateFlow<AppLocale>
	abstract fun setThemeMode(mode: AppThemeMode)
	abstract fun setWeekStartDay(day: WeekStartDay)
	abstract fun setHighlightCurrentDay(highlight: Boolean)
	abstract fun setAppLocale(locale: AppLocale)

	class InputData(
		defaultSessionDurationMinutes: Int = UserPreferencesService.DEFAULT_SESSION_DURATION_MINUTES,
		defaultRpe: Int = UserPreferencesService.DEFAULT_RPE,
		defaultSessionType: SessionType = UserPreferencesService.DEFAULT_SESSION_TYPE,
		defaultNotes: String = UserPreferencesService.DEFAULT_NOTES
	) {
		val defaultSessionDuration = MutableStateFlow(defaultSessionDurationMinutes)
		val defaultRpe = MutableStateFlow(defaultRpe)
		val defaultSessionType = MutableStateFlow(defaultSessionType)
		val defaultNotes = MutableStateFlow(defaultNotes)
	}
}
