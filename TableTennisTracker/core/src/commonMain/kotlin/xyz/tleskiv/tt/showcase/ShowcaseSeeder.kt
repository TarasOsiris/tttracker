package xyz.tleskiv.tt.showcase

import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.minus
import kotlinx.datetime.toLocalDateTime
import xyz.tleskiv.tt.service.MatchInput
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.service.TrainingSessionService
import kotlin.time.Clock

/// Writes [ShowcaseData] into the database.
///
/// One implementation, called from the Compose debug screen, the SwiftUI debug screen and the
/// Android screenshot test — the iPhone, iPad and Android rows of the store listing only show the
/// same player if all three write the same rows, and two hand-written loops would not stay equal.
class ShowcaseSeeder(
	private val trainingSessionService: TrainingSessionService,
	private val opponentService: OpponentService
) {
	/// [languageTag] picks which translation of the session notes gets written — the notes are user
	/// content, so a capture run has to re-seed for each language rather than seed once.
	///
	/// Replaces rather than appends. Seeding is the whole showcase dataset, so a second call on a
	/// database that already holds it would double the roster and the history — which is what a
	/// capture run does on every language after the first, and what a second tap of the debug
	/// button does by hand. Sessions go before opponents so no match is left pointing at a deleted
	/// player.
	suspend fun seed(languageTag: String) {
		trainingSessionService.deleteAllSessions()
		opponentService.deleteAllOpponents()

		val roster = ShowcaseData.opponents.map { opponent ->
			opponentService.addOpponent(
				name = opponent.name,
				club = opponent.club,
				rating = opponent.rating,
				handedness = opponent.handedness,
				style = opponent.style,
				notes = opponent.notes
			) to opponent.name
		}

		val today = Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()).date

		ShowcaseData.sessions.forEach { session ->
			val date = today.minus(session.daysAgo, DateTimeUnit.DAY)

			trainingSessionService.addSession(
				dateTime = LocalDateTime(date.year, date.month, date.day, NOON, 0),
				durationMinutes = session.durationMinutes,
				rpe = session.rpe,
				sessionType = session.sessionType,
				notes = session.note?.let { ShowcaseData.note(languageTag, it) },
				matches = session.matches.mapNotNull { match ->
					val opponent = roster.getOrNull(match.opponentIndex) ?: return@mapNotNull null
					MatchInput(
						opponentId = opponent.first,
						opponentName = opponent.second,
						myGamesWon = match.myGamesWon,
						opponentGamesWon = match.opponentGamesWon,
						isDoubles = match.isDoubles,
						isRanked = match.isRanked,
						competitionLevel = match.competitionLevel
					)
				}
			)
		}
	}

	private companion object {
		/// Only `dateTime.date` reaches the repository, so the time of day is never stored. Midday is
		/// what every other writer sends, and matching it keeps the seeded rows identical.
		const val NOON = 12
	}
}
