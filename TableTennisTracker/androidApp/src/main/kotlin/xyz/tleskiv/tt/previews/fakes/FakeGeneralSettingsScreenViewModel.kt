package xyz.tleskiv.tt.previews.fakes

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.model.WeekStartDay
import xyz.tleskiv.tt.viewmodel.settings.GeneralSettingsScreenViewModel

class FakeGeneralSettingsScreenViewModel : GeneralSettingsScreenViewModel() {
	override val inputData: InputData = InputData()
	private val _themeMode = MutableStateFlow(AppThemeMode.SYSTEM)
	override val themeMode: StateFlow<AppThemeMode> = _themeMode
	private val _weekStartDay = MutableStateFlow(WeekStartDay.MONDAY)
	override val weekStartDay: StateFlow<WeekStartDay> = _weekStartDay
	private val _highlightCurrentDay = MutableStateFlow(true)
	override val highlightCurrentDay: StateFlow<Boolean> = _highlightCurrentDay
	private val _appLocale = MutableStateFlow(AppLocale.SYSTEM)
	override val appLocale: StateFlow<AppLocale> = _appLocale

	override fun setThemeMode(mode: AppThemeMode) {
		_themeMode.value = mode
	}

	override fun setWeekStartDay(day: WeekStartDay) {
		_weekStartDay.value = day
	}

	override fun setHighlightCurrentDay(highlight: Boolean) {
		_highlightCurrentDay.value = highlight
	}

	override fun setAppLocale(locale: AppLocale) {
		_appLocale.value = locale
	}
}
