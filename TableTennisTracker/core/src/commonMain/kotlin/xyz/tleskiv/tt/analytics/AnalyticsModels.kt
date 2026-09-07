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
