package xyz.tleskiv.tt.repo.impl

import app.cash.sqldelight.coroutines.asFlow
import app.cash.sqldelight.coroutines.mapToList
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.withContext
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.Match
import xyz.tleskiv.tt.data.model.Opponent
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.GetSessionWithMatchesById
import xyz.tleskiv.tt.db.SelectAllSessionsWithMatches
import xyz.tleskiv.tt.repo.TrainingSessionsRepository
import xyz.tleskiv.tt.service.MatchInput
import xyz.tleskiv.tt.util.ext.toEpochMillis
import xyz.tleskiv.tt.util.nowInstant
import kotlin.uuid.Uuid

class TrainingSessionsRepositoryImpl(
	private val database: AppDatabase,
	private val ioDispatcher: CoroutineDispatcher
) : TrainingSessionsRepository {

	override val allSessions: Flow<List<TrainingSession>> =
		database.appDatabaseQueries.selectAllSessionsWithMatches().asFlow().mapToList(ioDispatcher).map { rows ->
			rows.groupBySession()
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

			for (matchInput in matches) {
				val opponentId = matchInput.opponentId ?: run {
					val newOpponentId = Uuid.random()
					database.appDatabaseQueries.insertOpponent(
						id = newOpponentId,
						name = matchInput.opponentName,
						club = null,
						rating = null,
						handedness = null,
						style = null,
						notes = null,
						updated_at = nowInstant
					)
					newOpponentId
				}

				database.appDatabaseQueries.insertMatch(
					id = Uuid.random(),
					session_id = sessionId,
					opponent_id = opponentId,
					my_games_won = matchInput.myGamesWon.toLong(),
					opponent_games_won = matchInput.opponentGamesWon.toLong(),
					games = null,
					is_doubles = matchInput.isDoubles,
					is_ranked = matchInput.isRanked,
					competition_level = matchInput.competitionLevel?.dbValue,
					rpe = null,
					notes = null,
					updated_at = nowInstant
				)
			}
		}

		sessionId
	}

	override suspend fun editSession(
		id: Uuid,
		date: LocalDate,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?
	): Unit = withContext(ioDispatcher) {
		database.appDatabaseQueries.updateSession(
			date = date,
			duration_min = durationMinutes.toLong(),
			rpe = rpe.toLong(),
			session_type = sessionType?.dbValue,
			notes = notes,
			updated_at = nowInstant,
			id = id
		)
	}

	override suspend fun getAllSessions(): List<TrainingSession> = withContext(ioDispatcher) {
		database.appDatabaseQueries.selectAllSessionsWithMatches().executeAsList().groupBySession()
	}

	override suspend fun getSessionById(id: Uuid): TrainingSession? = withContext(ioDispatcher) {
		val rows = database.appDatabaseQueries.getSessionWithMatchesById(id).executeAsList()
		rows.groupBySessionSingle()
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

	private fun List<SelectAllSessionsWithMatches>.groupBySession(): List<TrainingSession> {
		return groupBy { it.session_id }.map { (sessionId, rows) ->
			val first = rows.first()
			TrainingSession(
				id = sessionId,
				date = first.session_date.toEpochMillis(),
				durationMinutes = first.session_duration_min.toInt(),
				rpe = first.session_rpe.toInt(),
				sessionType = first.session_type?.let { SessionType.fromDb(it) },
				notes = first.session_notes,
				matches = rows.mapNotNull { it.toMatch() },
				createdAt = first.session_created_at.toEpochMilliseconds(),
				updatedAt = first.session_updated_at.toEpochMilliseconds()
			)
		}
	}

	private fun SelectAllSessionsWithMatches.toMatch(): Match? {
		val matchId = match_id ?: return null
		val opponentId = opponent_id ?: return null
		val opponentName = opponent_name ?: return null

		return Match(
			id = matchId,
			sessionId = session_id,
			opponent = Opponent(
				id = opponentId,
				name = opponentName,
				club = opponent_club,
				rating = opponent_rating,
				handedness = opponent_handedness?.let { Handedness.fromDb(it) },
				style = opponent_style?.let { PlayingStyle.fromDb(it) },
				notes = opponent_notes,
				createdAt = opponent_created_at?.toEpochMilliseconds() ?: 0L,
				updatedAt = opponent_updated_at?.toEpochMilliseconds() ?: 0L
			),
			myGamesWon = match_my_games_won?.toInt() ?: 0,
			opponentGamesWon = match_opponent_games_won?.toInt() ?: 0,
			games = match_games,
			isDoubles = match_is_doubles ?: false,
			isRanked = match_is_ranked ?: false,
			competitionLevel = match_competition_level?.let { CompetitionLevel.fromDb(it) },
			rpe = match_rpe?.toInt(),
			notes = match_notes,
			createdAt = match_created_at?.toEpochMilliseconds() ?: 0L,
			updatedAt = match_updated_at?.toEpochMilliseconds() ?: 0L
		)
	}

	private fun List<GetSessionWithMatchesById>.groupBySessionSingle(): TrainingSession? {
		if (isEmpty()) return null
		val first = first()
		return TrainingSession(
			id = first.session_id,
			date = first.session_date.toEpochMillis(),
			durationMinutes = first.session_duration_min.toInt(),
			rpe = first.session_rpe.toInt(),
			sessionType = first.session_type?.let { SessionType.fromDb(it) },
			notes = first.session_notes,
			matches = mapNotNull { it.toMatch() },
			createdAt = first.session_created_at.toEpochMilliseconds(),
			updatedAt = first.session_updated_at.toEpochMilliseconds()
		)
	}

	private fun GetSessionWithMatchesById.toMatch(): Match? {
		val matchId = match_id ?: return null
		val opponentId = opponent_id ?: return null
		val opponentName = opponent_name ?: return null

		return Match(
			id = matchId,
			sessionId = session_id,
			opponent = Opponent(
				id = opponentId,
				name = opponentName,
				club = opponent_club,
				rating = opponent_rating,
				handedness = opponent_handedness?.let { Handedness.fromDb(it) },
				style = opponent_style?.let { PlayingStyle.fromDb(it) },
				notes = opponent_notes,
				createdAt = opponent_created_at?.toEpochMilliseconds() ?: 0L,
				updatedAt = opponent_updated_at?.toEpochMilliseconds() ?: 0L
			),
			myGamesWon = match_my_games_won?.toInt() ?: 0,
			opponentGamesWon = match_opponent_games_won?.toInt() ?: 0,
			games = match_games,
			isDoubles = match_is_doubles ?: false,
			isRanked = match_is_ranked ?: false,
			competitionLevel = match_competition_level?.let { CompetitionLevel.fromDb(it) },
			rpe = match_rpe?.toInt(),
			notes = match_notes,
			createdAt = match_created_at?.toEpochMilliseconds() ?: 0L,
			updatedAt = match_updated_at?.toEpochMilliseconds() ?: 0L
		)
	}
}
