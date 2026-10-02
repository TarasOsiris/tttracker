package xyz.tleskiv.tt.export

import xyz.tleskiv.tt.data.model.Match
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.util.ext.toLocalDate

/*
 * The user's log as CSV, for a spreadsheet. Column names and enum values are stable English
 * identifiers rather than translated labels, so a file reads the same whatever language exported it
 * and stays easy to filter on. Rows are oldest first.
 */

fun sessionsCsv(sessions: List<TrainingSession>): String = csv(
	header = listOf(
		"date", "duration_minutes", "rpe", "session_type", "matches_won", "matches_lost", "notes"
	),
	rows = sessions.sortedWith(compareBy({ it.date }, { it.createdAt })).map { session ->
		listOf(
			session.date.toLocalDate().toString(),
			session.durationMinutes.toString(),
			session.rpe.toString(),
			session.sessionType?.dbValue.orEmpty(),
			session.matches.count { it.result == WIN }.toString(),
			session.matches.count { it.result == LOSS }.toString(),
			session.notes.orEmpty()
		)
	}
)

fun matchesCsv(sessions: List<TrainingSession>): String = csv(
	header = listOf(
		"date", "opponent", "my_games", "opponent_games", "result", "games", "doubles", "ranked",
		"competition_level", "rpe", "notes"
	),
	rows = sessions.sortedWith(compareBy({ it.date }, { it.createdAt })).flatMap { session ->
		session.matches.sortedBy { it.createdAt }.map { match ->
			listOf(
				session.date.toLocalDate().toString(),
				match.opponent.name,
				match.myGamesWon.toString(),
				match.opponentGamesWon.toString(),
				match.result,
				match.games.orEmpty(),
				match.isDoubles.toString(),
				match.isRanked.toString(),
				match.competitionLevel?.dbValue.orEmpty(),
				match.rpe?.toString().orEmpty(),
				match.notes.orEmpty()
			)
		}
	}
)

private const val WIN = "win"
private const val LOSS = "loss"
private const val DRAW = "draw"

private val Match.result: String
	get() = when {
		myGamesWon > opponentGamesWon -> WIN
		myGamesWon < opponentGamesWon -> LOSS
		else -> DRAW
	}

/** RFC 4180, with CRLF line endings, which is what spreadsheet apps expect. */
private fun csv(header: List<String>, rows: List<List<String>>): String =
	(listOf(header) + rows).joinToString(separator = "\r\n", postfix = "\r\n") { row ->
		row.joinToString(",") { escape(it) }
	}

internal fun escape(field: String): String {
	// A cell starting with one of these is run as a formula by spreadsheet apps; a leading
	// apostrophe makes it plain text. Notes and opponent names are free text, so this matters.
	val safe = if (field.firstOrNull() in FORMULA_PREFIXES) "'$field" else field
	val needsQuotes = safe.any { it == ',' || it == '"' || it == '\n' || it == '\r' }
	return if (needsQuotes) "\"" + safe.replace("\"", "\"\"") + "\"" else safe
}

private val FORMULA_PREFIXES = setOf('=', '+', '-', '@', '\t')
