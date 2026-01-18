package xyz.tleskiv.tt.service

import xyz.tleskiv.tt.data.model.enums.SessionType

interface UserPreferencesService {
	suspend fun getAllPreferences(): UserPreferences

	suspend fun setAllPreferences(preferences: UserPreferences)

	companion object {
		const val KEY_DEFAULT_SESSION_DURATION_MINUTES = "default_session_duration_minutes"
		const val DEFAULT_SESSION_DURATION_MINUTES = 60

		const val KEY_DEFAULT_RPE = "default_rpe"
		const val DEFAULT_RPE = 5

		const val KEY_DEFAULT_SESSION_TYPE = "default_session_type"
		val DEFAULT_SESSION_TYPE = SessionType.TECHNIQUE

		const val KEY_DEFAULT_NOTES = "default_notes"
		const val DEFAULT_NOTES = ""
	}

	data class UserPreferences(
		val defaultSessionDurationMinutes: Int = DEFAULT_SESSION_DURATION_MINUTES,
		val defaultRpe: Int = DEFAULT_RPE,
		val defaultSessionType: SessionType = DEFAULT_SESSION_TYPE,
		val defaultNotes: String = DEFAULT_NOTES
	)
}
