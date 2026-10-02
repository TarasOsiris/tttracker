package xyz.tleskiv.tt.repo.impl

import app.cash.sqldelight.coroutines.asFlow
import app.cash.sqldelight.coroutines.mapToList
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.withContext
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.User_preferences
import xyz.tleskiv.tt.model.AnalyticsWidget
import xyz.tleskiv.tt.model.AnalyticsWidgetSetting
import xyz.tleskiv.tt.model.AppAccent
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.model.WeekStartDay
import xyz.tleskiv.tt.model.parseAnalyticsWidgetOrder
import xyz.tleskiv.tt.model.toAnalyticsWidgetOrder
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.util.nowInstant

class UserPreferencesRepositoryImpl(
	private val database: AppDatabase,
	private val ioDispatcher: CoroutineDispatcher
) : UserPreferencesRepository {

	private val KEY_AVATAR_URI = "avatar_uri"
	private val KEY_APP_THEME = "app_theme"
	private val KEY_APP_ACCENT = "app_accent"
	private val KEY_WEEK_START_DAY = "week_start_day"
	private val KEY_HIGHLIGHT_CURRENT_DAY = "highlight_current_day"
	private val KEY_APP_LOCALE = "app_locale"
	private val KEY_ANALYTICS_WIDGET_ORDER = "analytics_widget_order"

	private fun showKey(widget: AnalyticsWidget) = "show_analytics_${widget.key}"

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

	override val accent: Flow<AppAccent> = allPreferences.map { prefs ->
		val accentString = prefs.find { it.key == KEY_APP_ACCENT }?.value_
		AppAccent.entries.firstOrNull { it.name == accentString } ?: AppAccent.DEFAULT
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

	override val appLocale: Flow<AppLocale> = allPreferences.map { prefs ->
		val localeString = prefs.find { it.key == KEY_APP_LOCALE }?.value_
		try {
			if (localeString != null) AppLocale.valueOf(localeString) else AppLocale.SYSTEM
		} catch (_: Exception) {
			AppLocale.SYSTEM
		}
	}

	override val analyticsWidgets: Flow<List<AnalyticsWidgetSetting>> = allPreferences.map { prefs ->
		val stored = prefs.associate { it.key to it.value_ }
		parseAnalyticsWidgetOrder(stored[KEY_ANALYTICS_WIDGET_ORDER]).map { widget ->
			AnalyticsWidgetSetting(widget, stored[showKey(widget)]?.toBooleanStrictOrNull() ?: true)
		}
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

	override suspend fun setAccent(accent: AppAccent) {
		setPreference(KEY_APP_ACCENT, accent.name)
	}

	override suspend fun setWeekStartDay(day: WeekStartDay) {
		setPreference(KEY_WEEK_START_DAY, day.name)
	}

	override suspend fun setHighlightCurrentDay(highlight: Boolean) {
		setPreference(KEY_HIGHLIGHT_CURRENT_DAY, highlight.toString())
	}

	override suspend fun setAppLocale(locale: AppLocale) {
		setPreference(KEY_APP_LOCALE, locale.name)
	}

	override suspend fun setAnalyticsWidgets(widgets: List<AnalyticsWidgetSetting>) {
		val visibility = widgets.associate { showKey(it.widget) to it.visible.toString() }
		setPreferences(visibility + (KEY_ANALYTICS_WIDGET_ORDER to widgets.map { it.widget }.toAnalyticsWidgetOrder()))
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
