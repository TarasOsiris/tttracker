package xyz.tleskiv.tt.repo.impl

import app.cash.sqldelight.coroutines.asFlow
import app.cash.sqldelight.coroutines.mapToList
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.withContext
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.model.mappers.toTrainingSession
import xyz.tleskiv.tt.model.mappers.toTrainingSessions
import xyz.tleskiv.tt.repo.TrainingSessionsRepository
import xyz.tleskiv.tt.service.MatchInput
import xyz.tleskiv.tt.util.nowInstant
import kotlin.uuid.Uuid

class TrainingSessionsRepositoryImpl(
	private val database: AppDatabase,
	private val ioDispatcher: CoroutineDispatcher
) : TrainingSessionsRepository {

	override val allSessions: Flow<List<TrainingSession>> =
		database.appDatabaseQueries.selectAllSessionsWithMatches().asFlow().mapToList(ioDispatcher).map { rows ->
			rows.toTrainingSessions()
		}

	override suspend fun addSession(
		date: LocalDate,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?,
		matches: List<MatchInput>
	): Uuid = withContext(ioDispatcher) {
		val sessionId = Uuid.random()

		database.transaction {
			database.appDatabaseQueries.insertSession(
				id = sessionId,
				date = date,
				duration_min = durationMinutes.toLong(),
				rpe = rpe.toLong(),
				session_type = sessionType?.dbValue,
				notes = notes,
				updated_at = nowInstant
			)

			matches.forEach { insertMatch(sessionId, it) }
		}

		sessionId
	}

	override suspend fun editSession(
		id: Uuid,
		date: LocalDate,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?,
		matches: List<MatchInput>?
	): Unit = withContext(ioDispatcher) {
		database.transaction {
			database.appDatabaseQueries.updateSession(
				date = date,
				duration_min = durationMinutes.toLong(),
				rpe = rpe.toLong(),
				session_type = sessionType?.dbValue,
				notes = notes,
				updated_at = nowInstant,
				id = id
			)

			if (matches != null) replaceMatches(id, matches)
		}
	}

	/**
	 * Updates the session's matches in place rather than deleting and reinserting them: iCloud sync
	 * merges per record, so fresh ids on every save would turn two devices editing the same session
	 * into two copies of every match. Unchanged matches are left alone, removed ones are deleted.
	 */
	private fun replaceMatches(sessionId: Uuid, matches: List<MatchInput>) {
		val queries = database.appDatabaseQueries
		val existing = queries.selectLiveMatchIdsBySessionId(sessionId).executeAsList().toSet()
		val kept = matches.mapNotNull { it.id }.toSet()
		(existing - kept).forEach { queries.deleteMatch(updated_at = nowInstant, id = it) }

		for (matchInput in matches) {
			val matchId = matchInput.id
			if (matchId != null && matchId in existing) {
				// The form edits neither, so the row keeps what it has rather than having them cleared.
				val current = queries.selectMatchRowById(matchId).executeAsOne()
				queries.updateMatch(
					opponent_id = opponentIdFor(matchInput),
					my_games_won = matchInput.myGamesWon.toLong(),
					opponent_games_won = matchInput.opponentGamesWon.toLong(),
					games = current.games,
					is_doubles = matchInput.isDoubles,
					is_ranked = matchInput.isRanked,
					competition_level = matchInput.competitionLevel?.dbValue,
					rpe = current.rpe,
					notes = matchInput.notes,
					updated_at = nowInstant,
					id = matchId
				)
			} else {
				insertMatch(sessionId, matchInput)
			}
		}
	}

	/**
	 * Keeps the id the form gave a new match, so saving the same list twice (a double-tapped Save, a
	 * retry) finds it the second time instead of deleting it and inserting a copy. Falls back to a
	 * fresh id when that one is taken, by a deleted row included.
	 */
	private fun insertMatch(sessionId: Uuid, matchInput: MatchInput) {
		val queries = database.appDatabaseQueries
		val id = matchInput.id?.takeIf { queries.selectMatchRowById(it).executeAsOneOrNull() == null } ?: Uuid.random()
		queries.insertMatch(
			id = id,
			session_id = sessionId,
			opponent_id = opponentIdFor(matchInput),
			my_games_won = matchInput.myGamesWon.toLong(),
			opponent_games_won = matchInput.opponentGamesWon.toLong(),
			games = null,
			is_doubles = matchInput.isDoubles,
			is_ranked = matchInput.isRanked,
			competition_level = matchInput.competitionLevel?.dbValue,
			rpe = null,
			notes = matchInput.notes,
			updated_at = nowInstant
		)
	}

	private fun opponentIdFor(matchInput: MatchInput): Uuid = matchInput.opponentId ?: Uuid.random().also {
		database.appDatabaseQueries.insertOpponent(
			id = it,
			name = matchInput.opponentName,
			club = null,
			rating = null,
			handedness = null,
			style = null,
			notes = null,
			updated_at = nowInstant
		)
	}

	override suspend fun getAllSessions(): List<TrainingSession> = withContext(ioDispatcher) {
		database.appDatabaseQueries.selectAllSessionsWithMatches().executeAsList().toTrainingSessions()
	}

	override suspend fun getSessionById(id: Uuid): TrainingSession? = withContext(ioDispatcher) {
		database.appDatabaseQueries.getSessionWithMatchesById(id).executeAsList().toTrainingSession()
	}

	override suspend fun deleteSession(id: Uuid): Unit = withContext(ioDispatcher) {
		database.transaction {
			database.appDatabaseQueries.deleteMatchesBySessionId(updated_at = nowInstant, session_id = id)
			database.appDatabaseQueries.deleteSession(updated_at = nowInstant, id = id)
		}
	}

	override suspend fun deleteAllSessions(): Unit = withContext(ioDispatcher) {
		database.transaction {
			database.appDatabaseQueries.deleteAllMatches()
			database.appDatabaseQueries.deleteAllSessions()
		}
	}
}
