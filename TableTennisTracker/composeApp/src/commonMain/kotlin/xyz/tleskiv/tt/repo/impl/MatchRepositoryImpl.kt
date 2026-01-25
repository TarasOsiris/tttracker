package xyz.tleskiv.tt.repo.impl

import app.cash.sqldelight.coroutines.asFlow
import app.cash.sqldelight.coroutines.mapToList
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.Match
import xyz.tleskiv.tt.repo.MatchRepository
import xyz.tleskiv.tt.util.nowMillis
import kotlin.uuid.Uuid

class MatchRepositoryImpl(
    private val database: AppDatabase,
    private val ioDispatcher: CoroutineDispatcher
) : MatchRepository {

    override val allMatches: Flow<List<Match>> =
        database.appDatabaseQueries.selectAllMatches().asFlow().mapToList(ioDispatcher)

    override suspend fun addMatch(
        sessionId: Uuid,
        opponentId: Uuid,
        myGamesWon: Int,
        opponentGamesWon: Int,
        games: String?,
        isDoubles: Boolean,
        isRanked: Boolean,
        competitionLevel: CompetitionLevel?,
        rpe: Int?,
        notes: String?
    ): Uuid = withContext(ioDispatcher) {
        val id = Uuid.random()
        database.appDatabaseQueries.insertMatch(
            id = id,
            session_id = sessionId,
            opponent_id = opponentId,
            my_games_won = myGamesWon.toLong(),
            opponent_games_won = opponentGamesWon.toLong(),
            games = games,
            is_doubles = if (isDoubles) 1L else 0L,
            is_ranked = if (isRanked) 1L else 0L,
            competition_level = competitionLevel?.dbValue,
            rpe = rpe?.toLong(),
            notes = notes,
            updated_at = nowMillis
        )
        id
    }

    override suspend fun updateMatch(
        id: Uuid,
        opponentId: Uuid,
        myGamesWon: Int,
        opponentGamesWon: Int,
        games: String?,
        isDoubles: Boolean,
        isRanked: Boolean,
        competitionLevel: CompetitionLevel?,
        rpe: Int?,
        notes: String?
    ): Unit = withContext(ioDispatcher) {
        database.appDatabaseQueries.updateMatch(
            opponent_id = opponentId,
            my_games_won = myGamesWon.toLong(),
            opponent_games_won = opponentGamesWon.toLong(),
            games = games,
            is_doubles = if (isDoubles) 1L else 0L,
            is_ranked = if (isRanked) 1L else 0L,
            competition_level = competitionLevel?.dbValue,
            rpe = rpe?.toLong(),
            notes = notes,
            updated_at = nowMillis,
            id = id
        )
    }

    override suspend fun getAllMatches(): List<Match> = withContext(ioDispatcher) {
        database.appDatabaseQueries.selectAllMatches().executeAsList()
    }

    override suspend fun getMatchById(id: Uuid): Match? = withContext(ioDispatcher) {
        database.appDatabaseQueries.getMatchById(id).executeAsOneOrNull()
    }

    override suspend fun getMatchesBySessionId(sessionId: Uuid): List<Match> = withContext(ioDispatcher) {
        database.appDatabaseQueries.getMatchesBySessionId(sessionId).executeAsList()
    }

    override suspend fun getMatchesByOpponentId(opponentId: Uuid): List<Match> = withContext(ioDispatcher) {
        database.appDatabaseQueries.getMatchesByOpponentId(opponentId).executeAsList()
    }

    override suspend fun deleteMatch(id: Uuid): Unit = withContext(ioDispatcher) {
        database.appDatabaseQueries.deleteMatch(updated_at = nowMillis, id = id)
    }

    override suspend fun deleteMatchesBySessionId(sessionId: Uuid): Unit = withContext(ioDispatcher) {
        database.appDatabaseQueries.deleteMatchesBySessionId(updated_at = nowMillis, session_id = sessionId)
    }

    override suspend fun deleteAllMatches(): Unit = withContext(ioDispatcher) {
        database.appDatabaseQueries.deleteAllMatches()
    }
}
