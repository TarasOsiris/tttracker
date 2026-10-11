package xyz.tleskiv.tt.health

import kotlinx.datetime.LocalDate
import kotlin.math.abs

/** A workout read from the platform's health store, reduced to what matching it to a session needs. */
class HealthWorkoutCandidate(val id: String, val date: LocalDate, val durationMinutes: Int)

/**
 * Which health workouts a session could have been played in. Pure, so both platforms rank the same
 * way: Apple Health on iOS today, Health Connect on Android later.
 */
object HealthWorkoutMatching {

	/**
	 * The workouts not linked to another session, those on the session's own day first and closest
	 * in duration first, then the rest by how many days away they are.
	 */
	fun rank(
		date: LocalDate,
		durationMinutes: Int,
		candidates: List<HealthWorkoutCandidate>,
		linkedIds: Set<String>
	): List<HealthWorkoutCandidate> = candidates
		.filter { it.id !in linkedIds }
		.sortedWith(
			compareBy<HealthWorkoutCandidate> { abs(it.date.toEpochDays() - date.toEpochDays()) }
				.thenBy { abs(it.durationMinutes - durationMinutes) }
		)

	/** The workout to suggest for a session: the best-ranked one played on the same day, if any. */
	fun suggestion(
		date: LocalDate,
		durationMinutes: Int,
		candidates: List<HealthWorkoutCandidate>,
		linkedIds: Set<String>
	): HealthWorkoutCandidate? = rank(date, durationMinutes, candidates, linkedIds).firstOrNull { it.date == date }
}
