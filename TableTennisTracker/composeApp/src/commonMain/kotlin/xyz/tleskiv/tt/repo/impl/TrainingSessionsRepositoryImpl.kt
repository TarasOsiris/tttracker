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
					notes = matchInput.notes,
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

			if (matches != null) {
				database.appDatabaseQueries.deleteMatchesBySessionId(updated_at = nowInstant, session_id = id)

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
						session_id = id,
						opponent_id = opponentId,
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
			}
		}
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
