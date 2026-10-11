package xyz.tleskiv.tt.di.components

import xyz.tleskiv.tt.health.HealthWorkout
import xyz.tleskiv.tt.health.HeartRatePoint

/**
 * Read-only access to the platform's health store: Health Connect on Android. iOS reads Apple Health
 * from Swift and does not use this.
 *
 * Nothing read through it may be stored or sent to analytics; a session keeps only the workout's id.
 */
interface HealthDataSource {
	/** False when the device has no usable health store, which hides every health surface. */
	val isAvailable: Boolean

	/** Whether every permission the app reads with has been granted. Asking is the UI's job. */
	suspend fun hasReadAccess(): Boolean

	/** Table tennis workouts of the last [LOOKBACK_DAYS] days, newest first. */
	suspend fun recentWorkouts(): List<HealthWorkout>

	/** The workout with this id, or null when it is not in the health store or cannot be read. */
	suspend fun workout(id: String): HealthWorkout?

	/** Average heart rate per minute across the workout. */
	suspend fun heartRate(workout: HealthWorkout): List<HeartRatePoint>

	companion object {
		const val LOOKBACK_DAYS = 30
	}
}

/** For platforms without one. */
object UnavailableHealthDataSource : HealthDataSource {
	override val isAvailable = false
	override suspend fun hasReadAccess() = false
	override suspend fun recentWorkouts() = emptyList<HealthWorkout>()
	override suspend fun workout(id: String): HealthWorkout? = null
	override suspend fun heartRate(workout: HealthWorkout) = emptyList<HeartRatePoint>()
}
