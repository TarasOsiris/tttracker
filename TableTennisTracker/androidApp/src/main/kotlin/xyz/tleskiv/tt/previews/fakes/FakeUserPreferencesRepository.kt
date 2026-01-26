package xyz.tleskiv.tt.previews.fakes

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import xyz.tleskiv.tt.db.User_preferences
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.model.WeekStartDay
import xyz.tleskiv.tt.repo.UserPreferencesRepository

class FakeUserPreferencesRepository : UserPreferencesRepository {
	override val allPreferences: Flow<List<User_preferences>> = MutableStateFlow(emptyList())
	override val themeMode: Flow<AppThemeMode> = MutableStateFlow(AppThemeMode.SYSTEM)
	override val weekStartDay: Flow<WeekStartDay> = MutableStateFlow(WeekStartDay.MONDAY)
	override val highlightCurrentDay: Flow<Boolean> = MutableStateFlow(true)
	override val appLocale: Flow<AppLocale> = MutableStateFlow(AppLocale.SYSTEM)

	override suspend fun getAllPreferences(): Map<String, String> = emptyMap()
	override suspend fun getPreference(key: String): String? = null
	override suspend fun setPreference(key: String, value: String) {}
	override suspend fun setThemeMode(mode: AppThemeMode) {}
	override suspend fun setWeekStartDay(day: WeekStartDay) {}
	override suspend fun setHighlightCurrentDay(highlight: Boolean) {}
	override suspend fun setAppLocale(locale: AppLocale) {}
	override suspend fun setPreferences(preferences: Map<String, String>) {}
	override suspend fun deletePreference(key: String) {}
	override suspend fun deleteAllPreferences() {}
}
