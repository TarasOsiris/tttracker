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

	override suspend fun setDefaultSessionDuration(minutes: Int) =
		repository.setPreference(KEY_DEFAULT_SESSION_DURATION_MINUTES, minutes.toString())

	override suspend fun setDefaultRpe(rpe: Int) =
		repository.setPreference(KEY_DEFAULT_RPE, rpe.toString())

	override suspend fun setDefaultSessionType(sessionType: SessionType) =
		repository.setPreference(KEY_DEFAULT_SESSION_TYPE, sessionType.dbValue)

	override suspend fun setDefaultNotes(notes: String) =
		repository.setPreference(KEY_DEFAULT_NOTES, notes)
}
