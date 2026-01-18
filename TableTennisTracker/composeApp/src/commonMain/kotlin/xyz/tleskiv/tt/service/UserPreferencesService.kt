package xyz.tleskiv.tt.service

interface UserPreferencesService {
	suspend fun getAllPreferences(): UserPreferences

	suspend fun setDefaultSessionDuration(minutes: Int)

	suspend fun setDefaultRpe(rpe: Int)

	companion object {
		const val KEY_DEFAULT_SESSION_DURATION_MINUTES = "default_session_duration_minutes"
		const val DEFAULT_SESSION_DURATION_MINUTES = 60

		const val KEY_DEFAULT_RPE = "default_rpe"
		const val DEFAULT_RPE = 5
	}

	data class UserPreferences(
		val defaultSessionDurationMinutes: Int = DEFAULT_SESSION_DURATION_MINUTES,
		val defaultRpe: Int = DEFAULT_RPE
	)
}
