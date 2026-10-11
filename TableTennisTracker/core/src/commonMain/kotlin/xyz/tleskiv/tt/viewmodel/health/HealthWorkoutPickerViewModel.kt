package xyz.tleskiv.tt.viewmodel.health

import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.health.HealthWorkout
import xyz.tleskiv.tt.viewmodel.ViewModelBase

/** The table tennis workouts a session could be linked to, minus those other sessions already have. */
abstract class HealthWorkoutPickerViewModel : ViewModelBase() {
	abstract val uiState: StateFlow<UiState>

	/** Reads the workouts again, after the permission request returns or when the picker reopens. */
	abstract fun load()

	/** The session being linked, which ranks its own day first; null when importing a new one. */
	data class Target(val date: LocalDate, val durationMinutes: Int)

	data class UiState(
		val isLoading: Boolean = true,
		val needsAccess: Boolean = false,
		val workouts: List<HealthWorkout> = emptyList(),
		val suggestedId: String? = null
	)
}
