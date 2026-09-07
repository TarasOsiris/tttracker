package xyz.tleskiv.tt.service.impl

import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.db.Opponent
import xyz.tleskiv.tt.repo.OpponentRepository
import xyz.tleskiv.tt.service.OpponentService
import kotlin.uuid.Uuid

class OpponentServiceImpl(
    private val repository: OpponentRepository
) : OpponentService {

    override val allOpponents: Flow<List<Opponent>> = repository.allOpponents

    override suspend fun addOpponent(
        name: String,
        club: String?,
        rating: Double?,
        handedness: Handedness?,
        style: PlayingStyle?,
        notes: String?
    ): Uuid = repository.addOpponent(name, club, rating, handedness, style, notes)

    override suspend fun updateOpponent(
        id: Uuid,
        name: String,
        club: String?,
        rating: Double?,
        handedness: Handedness?,
        style: PlayingStyle?,
        notes: String?
    ) = repository.updateOpponent(id, name, club, rating, handedness, style, notes)

    override suspend fun getAllOpponents(): List<Opponent> = repository.getAllOpponents()

    override suspend fun getOpponentById(id: Uuid): Opponent? = repository.getOpponentById(id)

    override suspend fun deleteOpponent(id: Uuid) = repository.deleteOpponent(id)

    override suspend fun deleteAllOpponents() = repository.deleteAllOpponents()
}
