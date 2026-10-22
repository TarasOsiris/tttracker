package xyz.tleskiv.tt.viewmodel.impl.sessions

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import kotlin.math.roundToInt
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.LocalTime
import xyz.tleskiv.tt.analytics.sessionEventProperties
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.di.components.HealthDataSource
import xyz.tleskiv.tt.health.HealthWorkout
import xyz.tleskiv.tt.model.mappers.toMatchInput
import xyz.tleskiv.tt.service.ReviewPromptService
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.util.today
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch

class CreateSessionScreenViewModelImpl(
	date: LocalDate?,
	private val sessionService: TrainingSessionService,
	private val preferencesService: UserPreferencesService,
	private val analyticsService: AnalyticsService,
	private val healthDataSource: HealthDataSource,
	private val reviewPromptService: ReviewPromptService
) : CreateSessionScreenViewModel() {
	private val _startDate = date ?: today()
	override val initialDate: LocalDate = _startDate
	override val inputData = InputData(viewModelScope, _startDate)
	override val canImportFromHealth: Boolean get() = healthDataSource.isAvailable

	init {
		viewModelScope.launch {
			val prefs = preferencesService.getAllPreferences()
			inputData.durationMinutes.value = prefs.defaultSessionDurationMinutes
			inputData.rpeValue.value = prefs.defaultRpe
			inputData.selectedSessionType.value = prefs.defaultSessionType
			inputData.notes.value = prefs.defaultNotes
		}
	}

	/** Set by the first Save, so a double tap cannot add the session (and its matches) twice. */
	private var isSaving = false

	override fun saveSession(onSuccess: () -> Unit) {
		if (isSaving) return
		isSaving = true
		viewModelScope.launch {
			sessionService.addSession(
				dateTime = LocalDateTime(inputData.selectedDate.value, LocalTime(12, 0)),
				durationMinutes = inputData.durationMinutes.value,
				rpe = inputData.rpeValue.value,
				sessionType = inputData.selectedSessionType.value,
				notes = inputData.notes.value.takeIf { it.isNotBlank() },
				matches = inputData.pendingMatches.value.map { it.toMatchInput() },
				healthWorkoutId = inputData.healthWorkout.value?.id
			)
			analyticsService.capture(
				"session_created", sessionEventProperties(
					sessionType = inputData.selectedSessionType.value,
					durationMinutes = inputData.durationMinutes.value,
					rpe = inputData.rpeValue.value,
					matchCount = inputData.pendingMatches.value.size,
					isLinkedToHealth = inputData.healthWorkout.value != null
				)
			)
			if (inputData.healthWorkout.value != null) analyticsService.capture("health_workout_imported")
			reviewPromptService.recordSessionCreated()
			onSuccess()
		}
	}

	override fun importHealthWorkout(workout: HealthWorkout) {
		inputData.healthWorkout.value = workout
		inputData.selectedDate.value = workout.date()
		inputData.durationMinutes.value = (workout.durationMinutes.toDouble() / DURATION_STEP).roundToInt()
			.times(DURATION_STEP).coerceIn(MIN_DURATION, MAX_DURATION)
	}

	override fun removeHealthWorkout() {
		inputData.healthWorkout.value = null
	}

	private companion object {
		/** Rounded to 5 minutes like the iOS form, within the durations a session accepts. */
		const val DURATION_STEP = 5
		const val MIN_DURATION = 10
		const val MAX_DURATION = 300
	}

	override fun addPendingMatch(match: PendingMatch) = inputData.addMatch(match)

	override fun updatePendingMatch(match: PendingMatch) = inputData.updateMatch(match)

	override fun removePendingMatch(matchId: String) = inputData.removeMatch(matchId)
}
