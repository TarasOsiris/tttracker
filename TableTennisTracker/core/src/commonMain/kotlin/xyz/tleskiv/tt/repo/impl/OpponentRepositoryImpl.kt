package xyz.tleskiv.tt.repo.impl

import app.cash.sqldelight.coroutines.asFlow
import app.cash.sqldelight.coroutines.mapToList
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.Opponent
import xyz.tleskiv.tt.repo.OpponentRepository
import xyz.tleskiv.tt.util.nowInstant
import kotlin.uuid.Uuid

class OpponentRepositoryImpl(
    private val database: AppDatabase,
    private val ioDispatcher: CoroutineDispatcher
) : OpponentRepository {

    override val allOpponents: Flow<List<Opponent>> =
        database.appDatabaseQueries.selectAllOpponents().asFlow().mapToList(ioDispatcher)

    override suspend fun addOpponent(
        name: String,
        club: String?,
        rating: Double?,
        handedness: Handedness?,
        style: PlayingStyle?,
        notes: String?
    ): Uuid = withContext(ioDispatcher) {
        val id = Uuid.random()
        database.appDatabaseQueries.insertOpponent(
            id = id,
            name = name,
            club = club,
            rating = rating,
            handedness = handedness?.dbValue,
            style = style?.dbValue,
            notes = notes,
			updated_at = nowInstant
        )
        id
    }

    override suspend fun updateOpponent(
        id: Uuid,
        name: String,
        club: String?,
        rating: Double?,
        handedness: Handedness?,
        style: PlayingStyle?,
        notes: String?
    ): Unit = withContext(ioDispatcher) {
        database.appDatabaseQueries.updateOpponent(
            name = name,
            club = club,
            rating = rating,
            handedness = handedness?.dbValue,
            style = style?.dbValue,
            notes = notes,
			updated_at = nowInstant,
            id = id
        )
    }

    override suspend fun getAllOpponents(): List<Opponent> = withContext(ioDispatcher) {
        database.appDatabaseQueries.selectAllOpponents().executeAsList()
    }

    override suspend fun getOpponentById(id: Uuid): Opponent? = withContext(ioDispatcher) {
        database.appDatabaseQueries.getOpponentById(id).executeAsOneOrNull()
    }

    override suspend fun deleteOpponent(id: Uuid): Unit = withContext(ioDispatcher) {
		database.transaction {
			database.appDatabaseQueries.deleteMatchesByOpponentId(updated_at = nowInstant, opponent_id = id)
			database.appDatabaseQueries.deleteOpponent(updated_at = nowInstant, id = id)
		}
    }

    override suspend fun deleteAllOpponents(): Unit = withContext(ioDispatcher) {
		database.transaction {
			database.appDatabaseQueries.deleteAllMatches()
			database.appDatabaseQueries.deleteAllOpponents()
		}
    }
}
