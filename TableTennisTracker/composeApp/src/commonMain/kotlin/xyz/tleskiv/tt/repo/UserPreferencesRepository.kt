package xyz.tleskiv.tt.repo

import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.db.User_preferences
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.model.WeekStartDay

interface UserPreferencesRepository {
	val allPreferences: Flow<List<User_preferences>>
	val themeMode: Flow<AppThemeMode>
	val weekStartDay: Flow<WeekStartDay>
	val highlightCurrentDay: Flow<Boolean>
	val appLocale: Flow<AppLocale>

	val showAnalyticsSummary: Flow<Boolean>
	val showAnalyticsWinLoss: Flow<Boolean>
	val showAnalyticsWeekly: Flow<Boolean>
	val showAnalyticsHeatmap: Flow<Boolean>

	suspend fun getAllPreferences(): Map<String, String>

	suspend fun getPreference(key: String): String?

	suspend fun setPreference(key: String, value: String)

	suspend fun setThemeMode(mode: AppThemeMode)

	suspend fun setWeekStartDay(day: WeekStartDay)

	suspend fun setHighlightCurrentDay(highlight: Boolean)

	suspend fun setAppLocale(locale: AppLocale)

	suspend fun setShowAnalyticsSummary(show: Boolean)

	suspend fun setShowAnalyticsWinLoss(show: Boolean)

	suspend fun setShowAnalyticsWeekly(show: Boolean)

	suspend fun setShowAnalyticsHeatmap(show: Boolean)

	suspend fun setPreferences(preferences: Map<String, String>)

	suspend fun deletePreference(key: String)

	suspend fun deleteAllPreferences()
}
