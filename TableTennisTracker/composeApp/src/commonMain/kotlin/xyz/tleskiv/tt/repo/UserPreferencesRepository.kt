package xyz.tleskiv.tt.repo

import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.db.User_preferences

interface UserPreferencesRepository {
	val allPreferences: Flow<List<User_preferences>>

	suspend fun getAllPreferences(): Map<String, String>

	suspend fun getPreference(key: String): String?

	suspend fun setPreference(key: String, value: String)

	suspend fun setPreferences(preferences: Map<String, String>)

	suspend fun deletePreference(key: String)

	suspend fun deleteAllPreferences()
}
