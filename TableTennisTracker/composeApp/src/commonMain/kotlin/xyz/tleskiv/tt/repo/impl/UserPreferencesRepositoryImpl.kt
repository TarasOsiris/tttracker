package xyz.tleskiv.tt.repo.impl

import app.cash.sqldelight.coroutines.asFlow
import app.cash.sqldelight.coroutines.mapToList
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.User_preferences
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.util.nowMillis

class UserPreferencesRepositoryImpl(
	private val database: AppDatabase,
	private val ioDispatcher: CoroutineDispatcher
) : UserPreferencesRepository {

	override val allPreferences: Flow<List<User_preferences>> =
		database.appDatabaseQueries.selectAllPreferences().asFlow().mapToList(ioDispatcher)

	override suspend fun getAllPreferences(): Map<String, String> = withContext(ioDispatcher) {
		database.appDatabaseQueries.selectAllPreferences().executeAsList().associate { it.key to it.value_ }
	}

	override suspend fun getPreference(key: String): String? = withContext(ioDispatcher) {
		database.appDatabaseQueries.selectPreferenceByKey(key).executeAsOneOrNull()?.value_
	}

	override suspend fun setPreference(key: String, value: String): Unit = withContext(ioDispatcher) {
		val now = nowMillis
		database.appDatabaseQueries.insertOrUpdatePreference(key, value, now, now)
	}

	override suspend fun deletePreference(key: String): Unit = withContext(ioDispatcher) {
		database.appDatabaseQueries.deletePreferenceByKey(key)
	}

	override suspend fun deleteAllPreferences(): Unit = withContext(ioDispatcher) {
		database.appDatabaseQueries.deleteAllPreferences()
	}
}
