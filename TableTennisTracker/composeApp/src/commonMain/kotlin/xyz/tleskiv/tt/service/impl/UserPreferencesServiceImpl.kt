package xyz.tleskiv.tt.service.impl

import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.DEFAULT_RPE
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.DEFAULT_SESSION_DURATION_MINUTES
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.KEY_DEFAULT_RPE
import xyz.tleskiv.tt.service.UserPreferencesService.Companion.KEY_DEFAULT_SESSION_DURATION_MINUTES
import xyz.tleskiv.tt.service.UserPreferencesService.UserPreferences

class UserPreferencesServiceImpl(
	private val repository: UserPreferencesRepository
) : UserPreferencesService {

	override suspend fun getAllPreferences(): UserPreferences {
		val all = repository.getAllPreferences()
		return UserPreferences(
			defaultSessionDurationMinutes = all[KEY_DEFAULT_SESSION_DURATION_MINUTES]
				?.toIntOrNull() ?: DEFAULT_SESSION_DURATION_MINUTES,
			defaultRpe = all[KEY_DEFAULT_RPE]?.toIntOrNull() ?: DEFAULT_RPE
		)
	}

	override suspend fun setDefaultSessionDuration(minutes: Int) =
		repository.setPreference(KEY_DEFAULT_SESSION_DURATION_MINUTES, minutes.toString())

	override suspend fun setDefaultRpe(rpe: Int) =
		repository.setPreference(KEY_DEFAULT_RPE, rpe.toString())
}
