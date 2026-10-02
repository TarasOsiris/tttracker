package xyz.tleskiv.tt.analytics

import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.daysUntil
import kotlinx.datetime.isoDayNumber
import kotlinx.datetime.minus
import kotlinx.datetime.plus
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.util.ext.toLocalDate

/*
 * The arithmetic behind the insights, as pure functions of the session list so it can be tested
 * without a database and shared by both UIs.
 */

/** The first day of the week [date] falls in. */
fun weekStart(date: LocalDate, firstDayOfWeek: DayOfWeek): LocalDate {
	val daysIn = (date.dayOfWeek.isoDayNumber - firstDayOfWeek.isoDayNumber + 7) % 7
	return date.minus(daysIn, DateTimeUnit.DAY)
}

/**
 * The [weeks] weeks up to and including the one [today] is in, oldest first, empty weeks included.
 * [weeks] of 0 or less means every week since the first session, and never fewer than [minWeeks].
 */
fun trainingWeeks(
	sessions: List<TrainingSession>,
	firstDayOfWeek: DayOfWeek,
	today: LocalDate,
	weeks: Int,
	minWeeks: Int = 1
): List<TrainingWeek> {
	val byWeek = sessions.groupBy { weekStart(it.date.toLocalDate(), firstDayOfWeek) }
	val currentWeek = weekStart(today, firstDayOfWeek)
	val count = if (weeks > 0) weeks else {
		val first = byWeek.keys.minOrNull()?.takeIf { it <= currentWeek }
		val sinceFirst = first?.let { it.daysUntil(currentWeek) / 7 + 1 } ?: 0
		maxOf(sinceFirst, minWeeks)
	}

	return (count - 1 downTo 0).map { weeksAgo ->
		val start = currentWeek.minus(weeksAgo * 7, DateTimeUnit.DAY)
		val inWeek = byWeek[start].orEmpty()
		TrainingWeek(
			start = start,
			sessionCount = inWeek.size,
			totalMinutes = inWeek.sumOf { it.durationMinutes },
			load = inWeek.sumOf { it.durationMinutes * it.rpe }
		)
	}
}

fun trainingStreak(
	sessionDates: Collection<LocalDate>,
	firstDayOfWeek: DayOfWeek,
	today: LocalDate
): TrainingStreak {
	val activeWeeks = sessionDates.mapTo(HashSet()) { weekStart(it, firstDayOfWeek) }
	if (activeWeeks.isEmpty()) return TrainingStreak(currentWeeks = 0, longestWeeks = 0)

	fun LocalDate.previousWeek() = minus(7, DateTimeUnit.DAY)

	val thisWeek = weekStart(today, firstDayOfWeek)
	var cursor = if (thisWeek in activeWeeks) thisWeek else thisWeek.previousWeek()
	var current = 0
	while (cursor in activeWeeks) {
		current++
		cursor = cursor.previousWeek()
	}

	var longest = 0
	var run = 0
	var previous: LocalDate? = null
	for (week in activeWeeks.sorted()) {
		run = if (previous != null && previous.plus(7, DateTimeUnit.DAY) == week) run + 1 else 1
		longest = maxOf(longest, run)
		previous = week
	}
	return TrainingStreak(currentWeeks = current, longestWeeks = longest)
}

fun sessionTypeBreakdown(sessions: List<TrainingSession>): List<SessionTypeShare> =
	sessions.groupBy { it.sessionType }
		.map { (type, ofType) ->
			SessionTypeShare(type = type, sessionCount = ofType.size, totalMinutes = ofType.sumOf { it.durationMinutes })
		}
		.sortedWith(compareByDescending<SessionTypeShare> { it.totalMinutes }.thenByDescending { it.sessionCount })

/**
 * Wins and losses go by games won, as [xyz.tleskiv.tt.data.model.Match.isWin] does, except that a
 * level score counts as neither.
 */
fun opponentRecords(sessions: List<TrainingSession>): List<OpponentRecord> {
	val played = sessions
		.flatMap { session -> session.matches.map { match -> session.date.toLocalDate() to match } }
		.sortedWith(compareBy({ it.first }, { it.second.createdAt }))

	return played.groupBy { (_, match) -> match.opponent.id }
		.map { (opponentId, matches) ->
			val results = matches.map { it.second }
			val decided = results.filter { it.myGamesWon != it.opponentGamesWon }
			OpponentRecord(
				opponentId = opponentId,
				name = results.last().opponent.name,
				wins = decided.count { it.isWin },
				losses = decided.count { !it.isWin },
				gamesWon = results.sumOf { it.myGamesWon },
				gamesLost = results.sumOf { it.opponentGamesWon },
				recentResults = decided.takeLast(OPPONENT_RECENT_RESULTS).map { it.isWin },
				lastPlayed = matches.last().first
			)
		}
		.sortedByDescending { it.lastPlayed }
}
