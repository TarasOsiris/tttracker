package xyz.tleskiv.tt.service

interface UserPreferencesService {
	suspend fun getAllPreferences(): UserPreferences

	suspend fun setDefaultSessionDuration(minutes: Int)

	companion object {
		const val KEY_DEFAULT_SESSION_DURATION_MINUTES = "default_session_duration_minutes"
		const val DEFAULT_SESSION_DURATION_MINUTES = 60
	}

	data class UserPreferences(
		val defaultSessionDurationMinutes: Int = DEFAULT_SESSION_DURATION_MINUTES
	)
}
