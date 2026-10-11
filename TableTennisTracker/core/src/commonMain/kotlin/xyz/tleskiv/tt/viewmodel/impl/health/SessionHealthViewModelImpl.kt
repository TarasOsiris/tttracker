package xyz.tleskiv.tt.viewmodel.impl.health

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.di.components.HealthDataSource
import xyz.tleskiv.tt.health.HealthWorkout
import xyz.tleskiv.tt.health.HealthWorkoutMatching
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDateUtc
import xyz.tleskiv.tt.viewmodel.health.SessionHealthViewModel
import kotlin.uuid.Uuid

/**
 * Follows the session through the same flow the list uses, so linking or unlinking — here or from
 * iCloud on another device — redraws the section without a reload.
 */
class SessionHealthViewModelImpl(
	sessionId: String,
	private val health: HealthDataSource,
	private val sessions: TrainingSessionService,
	private val analytics: AnalyticsService
) : SessionHealthViewModel() {
	private val id = Uuid.parse(sessionId)
	private val _state = MutableStateFlow<State>(if (health.isAvailable) State.Loading else State.Unavailable)
	override val state: StateFlow<State> = _state.asStateFlow()

	private var session: TrainingSession? = null

	init {
		if (health.isAvailable) {
			viewModelScope.launch {
				sessions.allSessions
					.map { all -> all.find { it.id == id } }
					.distinctUntilChanged { old, new ->
						old?.healthWorkoutId == new?.healthWorkoutId && old?.date == new?.date &&
							old?.durationMinutes == new?.durationMinutes
					}
					.collectLatest { current ->
						session = current
						if (current != null) load(current)
					}
			}
		}
	}

	override fun refresh() {
		val current = session ?: return
		viewModelScope.launch { load(current) }
	}

	override fun link(workout: HealthWorkout, via: String) {
		viewModelScope.launch {
			sessions.setHealthWorkout(id, workout.id)
			analytics.capture("health_workout_linked", mapOf("via" to via))
		}
	}

	override fun unlink() {
		viewModelScope.launch {
			sessions.setHealthWorkout(id, null)
			analytics.capture("health_workout_unlinked")
		}
	}

	private suspend fun load(current: TrainingSession) {
		val hasAccess = health.hasReadAccess()
		val workoutId = current.healthWorkoutId
		_state.value = when {
			workoutId != null && !hasAccess -> State.NeedsAccess
			workoutId != null -> runCatching { health.workout(workoutId) }.getOrNull()
				?.let { State.Linked(it, runCatching { health.heartRate(it) }.getOrDefault(emptyList())) }
				?: State.Missing
			else -> State.Unlinked(if (hasAccess) suggestion(current) else null)
		}
	}

	private suspend fun suggestion(current: TrainingSession): HealthWorkout? {
		val recent = runCatching { health.recentWorkouts() }.getOrDefault(emptyList())
		val linked = sessions.getAllSessions().mapNotNull { it.healthWorkoutId }.toSet()
		val match = HealthWorkoutMatching.suggestion(
			current.date.toLocalDateUtc(), current.durationMinutes, recent.map { it.toCandidate() }, linked
		)
		return recent.find { it.id == match?.id }
	}
}
