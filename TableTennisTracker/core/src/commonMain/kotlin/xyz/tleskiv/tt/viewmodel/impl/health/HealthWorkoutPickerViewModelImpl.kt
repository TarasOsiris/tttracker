package xyz.tleskiv.tt.viewmodel.impl.health

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.di.components.HealthDataSource
import xyz.tleskiv.tt.health.HealthWorkoutMatching
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.viewmodel.health.HealthWorkoutPickerViewModel

class HealthWorkoutPickerViewModelImpl(
	private val target: Target?,
	private val health: HealthDataSource,
	private val sessions: TrainingSessionService
) : HealthWorkoutPickerViewModel() {
	private val _uiState = MutableStateFlow(UiState())
	override val uiState: StateFlow<UiState> = _uiState.asStateFlow()

	init {
		load()
	}

	override fun load() {
		viewModelScope.launch {
			_uiState.value = _uiState.value.copy(isLoading = true)
			if (!health.hasReadAccess()) {
				_uiState.value = UiState(isLoading = false, needsAccess = true)
				return@launch
			}
			val recent = runCatching { health.recentWorkouts() }.getOrDefault(emptyList())
			val linked = sessions.getAllSessions().mapNotNull { it.healthWorkoutId }.toSet()
			if (target == null) {
				_uiState.value = UiState(isLoading = false, workouts = recent.filter { it.id !in linked })
				return@launch
			}
			val candidates = recent.map { it.toCandidate() }
			val byId = recent.associateBy { it.id }
			val ranked = HealthWorkoutMatching.rank(target.date, target.durationMinutes, candidates, linked)
			val suggestion = HealthWorkoutMatching.suggestion(target.date, target.durationMinutes, candidates, linked)
			_uiState.value = UiState(
				isLoading = false,
				workouts = ranked.mapNotNull { byId[it.id] },
				suggestedId = suggestion?.id
			)
		}
	}
}
