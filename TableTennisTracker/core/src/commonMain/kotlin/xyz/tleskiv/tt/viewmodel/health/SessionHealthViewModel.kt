package xyz.tleskiv.tt.viewmodel.health

import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.health.HealthWorkout
import xyz.tleskiv.tt.health.HeartRatePoint
import xyz.tleskiv.tt.viewmodel.ViewModelBase

/** The health side of one session: the workout it is linked to, or one it could be. */
abstract class SessionHealthViewModel : ViewModelBase() {
	abstract val state: StateFlow<State>

	/** Reads the health store again, after the permission request returns. */
	abstract fun refresh()

	/** @param via how the user got there, for the funnel: `suggestion` or `picker`. */
	abstract fun link(workout: HealthWorkout, via: String)

	abstract fun unlink()

	sealed interface State {
		/** No health store on this device: the section is left out. */
		data object Unavailable : State
		data object Loading : State
		/** Not linked; [suggestion] is a same-day workout no other session has. */
		data class Unlinked(val suggestion: HealthWorkout?) : State
		/** Linked, but reading is not allowed on this device. */
		data object NeedsAccess : State
		/** Linked to a workout this device cannot find. */
		data object Missing : State
		data class Linked(val workout: HealthWorkout, val heartRate: List<HeartRatePoint>) : State
	}
}
