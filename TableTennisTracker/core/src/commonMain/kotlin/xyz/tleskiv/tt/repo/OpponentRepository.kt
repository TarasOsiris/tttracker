package xyz.tleskiv.tt.repo

import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.db.Opponent
import kotlin.uuid.Uuid

interface OpponentRepository {
    val allOpponents: Flow<List<Opponent>>

    suspend fun addOpponent(
        name: String,
        club: String?,
        rating: Double?,
        handedness: Handedness?,
        style: PlayingStyle?,
        notes: String?
    ): Uuid

    suspend fun updateOpponent(
        id: Uuid,
        name: String,
        club: String?,
        rating: Double?,
        handedness: Handedness?,
        style: PlayingStyle?,
        notes: String?
    )

    suspend fun getAllOpponents(): List<Opponent>

    suspend fun getOpponentById(id: Uuid): Opponent?

    suspend fun deleteOpponent(id: Uuid)

    suspend fun deleteAllOpponents()
}
