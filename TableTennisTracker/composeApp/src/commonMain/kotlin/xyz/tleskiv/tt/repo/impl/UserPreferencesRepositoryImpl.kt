package xyz.tleskiv.tt.repo.impl

import app.cash.sqldelight.coroutines.asFlow
import app.cash.sqldelight.coroutines.mapToList
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.withContext
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.User_preferences
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.model.WeekStartDay
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.util.nowInstant

class UserPreferencesRepositoryImpl(
	private val database: AppDatabase,
	private val ioDispatcher: CoroutineDispatcher
) : UserPreferencesRepository {

	private val KEY_AVATAR_URI = "avatar_uri"
	private val KEY_APP_THEME = "app_theme"
	private val KEY_WEEK_START_DAY = "week_start_day"
	private val KEY_HIGHLIGHT_CURRENT_DAY = "highlight_current_day"

	override val allPreferences: Flow<List<User_preferences>> =
		database.appDatabaseQueries.selectAllPreferences().asFlow().mapToList(ioDispatcher)

	override val themeMode: Flow<AppThemeMode> = allPreferences.map { prefs ->
		val themeString = prefs.find { it.key == KEY_APP_THEME }?.value_
		try {
			if (themeString != null) AppThemeMode.valueOf(themeString) else AppThemeMode.SYSTEM
		} catch (_: Exception) {
			AppThemeMode.SYSTEM
		}
	}

	override val weekStartDay: Flow<WeekStartDay> = allPreferences.map { prefs ->
		val dayString = prefs.find { it.key == KEY_WEEK_START_DAY }?.value_
		try {
			if (dayString != null) WeekStartDay.valueOf(dayString) else WeekStartDay.MONDAY
		} catch (_: Exception) {
			WeekStartDay.MONDAY
		}
	}

	override val highlightCurrentDay: Flow<Boolean> = allPreferences.map { prefs ->
		val value = prefs.find { it.key == KEY_HIGHLIGHT_CURRENT_DAY }?.value_
		value?.toBooleanStrictOrNull() ?: true
	}

	override suspend fun getAllPreferences(): Map<String, String> = withContext(ioDispatcher) {
		database.appDatabaseQueries.selectAllPreferences().executeAsList().associate { it.key to it.value_ }
	}

	override suspend fun getPreference(key: String): String? = withContext(ioDispatcher) {
		database.appDatabaseQueries.selectPreferenceByKey(key).executeAsOneOrNull()?.value_
	}

	override suspend fun setPreference(key: String, value: String): Unit = withContext(ioDispatcher) {
		val now = nowInstant
		database.appDatabaseQueries.insertOrUpdatePreference(key, value, now, now)
	}

	override suspend fun setThemeMode(mode: AppThemeMode) {
		setPreference(KEY_APP_THEME, mode.name)
	}

	override suspend fun setWeekStartDay(day: WeekStartDay) {
		setPreference(KEY_WEEK_START_DAY, day.name)
	}

	override suspend fun setHighlightCurrentDay(highlight: Boolean) {
		setPreference(KEY_HIGHLIGHT_CURRENT_DAY, highlight.toString())
	}

	override suspend fun setPreferences(preferences: Map<String, String>): Unit = withContext(ioDispatcher) {
		val now = nowInstant
		database.transaction {
			preferences.forEach { (key, value) ->
				database.appDatabaseQueries.insertOrUpdatePreference(key, value, now, now)
			}
		}
	}

	override suspend fun deletePreference(key: String): Unit = withContext(ioDispatcher) {
		database.appDatabaseQueries.deletePreferenceByKey(key)
	}

	override suspend fun deleteAllPreferences(): Unit = withContext(ioDispatcher) {
		database.appDatabaseQueries.deleteAllPreferences()
	}
}
