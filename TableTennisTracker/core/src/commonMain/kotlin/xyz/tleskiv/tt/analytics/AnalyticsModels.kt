package xyz.tleskiv.tt.analytics

import kotlinx.datetime.LocalDate

data class SummaryStats(
	val totalSessions: Int = 0,
	val totalTrainingMinutes: Int = 0,
	val matchesWon: Int = 0,
	val matchesLost: Int = 0
)

data class WeeklyTrainingData(
	val weekLabel: String,
	val totalMinutes: Int
)

/**
 * One day's training, as a flat list entry rather than a map.
 *
 * A `Map<LocalDate, Int>` loses its key and value types crossing into Swift, where it arrives as an
 * untyped dictionary; a list of these keeps both and lets each UI build whatever index it needs.
 */
data class DailyTrainingLoad(
	val date: LocalDate,
	val sessionCount: Int,
	val totalMinutes: Int
)

/**
 * Intensity bucket 0..4 for a day in the training heatmap, scaled against the busiest day.
 *
 * Shared so both heatmaps shade identically — the thresholds are inclusive upper bounds, matching
 * the original Compose implementation.
 */
fun heatmapLevel(sessionCount: Int, busiestSessionCount: Int): Int {
	if (sessionCount <= 0 || busiestSessionCount <= 0) return 0
	val ratio = sessionCount.toFloat() / busiestSessionCount.toFloat()
	return when {
		ratio <= 0.25f -> 1
		ratio <= 0.5f -> 2
		ratio <= 0.75f -> 3
		else -> 4
	}
}
