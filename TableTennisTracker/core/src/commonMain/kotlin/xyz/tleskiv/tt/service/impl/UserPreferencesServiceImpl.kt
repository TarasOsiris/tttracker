package xyz.tleskiv.tt.service.impl

import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.DEFAULT_NOTES
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.DEFAULT_RPE
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.DEFAULT_SESSION_DURATION_MINUTES
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.DEFAULT_SESSION_TYPE
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.KEY_DEFAULT_NOTES
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.KEY_DEFAULT_RPE
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.KEY_DEFAULT_SESSION_DURATION_MINUTES
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.KEY_DEFAULT_SESSION_TYPE
import xyz.tleskiv.tt.service.UserPreferencesService.UserPreferences

class UserPreferencesServiceImpl(
	private val repository: UserPreferencesRepository
) : UserPreferencesService {

	override suspend fun getAllPreferences(): UserPreferences {
		val all = repository.getAllPreferences()
		return UserPreferences(
			defaultSessionDurationMinutes = all[KEY_DEFAULT_SESSION_DURATION_MINUTES]
				?.toIntOrNull() ?: DEFAULT_SESSION_DURATION_MINUTES,
			defaultRpe = all[KEY_DEFAULT_RPE]?.toIntOrNull() ?: DEFAULT_RPE,
			defaultSessionType = all[KEY_DEFAULT_SESSION_TYPE]
				?.let { value ->
					runCatching { SessionType.fromDb(value) }.getOrDefault(DEFAULT_SESSION_TYPE)
				} ?: DEFAULT_SESSION_TYPE,
			defaultNotes = all[KEY_DEFAULT_NOTES] ?: DEFAULT_NOTES
		)
	}

	override suspend fun setAllPreferences(preferences: UserPreferences) {
		repository.setPreferences(
			mapOf(
				KEY_DEFAULT_SESSION_DURATION_MINUTES to preferences.defaultSessionDurationMinutes.toString(),
				KEY_DEFAULT_RPE to preferences.defaultRpe.toString(),
				KEY_DEFAULT_SESSION_TYPE to preferences.defaultSessionType.dbValue,
				KEY_DEFAULT_NOTES to preferences.defaultNotes
			)
		)
	}
}
