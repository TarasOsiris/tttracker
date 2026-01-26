package xyz.tleskiv.tt.service.impl

import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.db.Match
import xyz.tleskiv.tt.repo.MatchRepository
import xyz.tleskiv.tt.service.MatchService
import kotlin.uuid.Uuid

class MatchServiceImpl(
    private val repository: MatchRepository
) : MatchService {

    override val allMatches: Flow<List<Match>> = repository.allMatches

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
    ): Uuid = repository.addMatch(
        sessionId, opponentId, myGamesWon, opponentGamesWon,
        games, isDoubles, isRanked, competitionLevel, rpe, notes
    )

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
    ) = repository.updateMatch(
        id, opponentId, myGamesWon, opponentGamesWon,
        games, isDoubles, isRanked, competitionLevel, rpe, notes
    )

    override suspend fun getAllMatches(): List<Match> = repository.getAllMatches()

    override suspend fun getMatchById(id: Uuid): Match? = repository.getMatchById(id)

    override suspend fun getMatchesBySessionId(sessionId: Uuid): List<Match> =
        repository.getMatchesBySessionId(sessionId)

    override suspend fun getMatchesByOpponentId(opponentId: Uuid): List<Match> =
        repository.getMatchesByOpponentId(opponentId)

    override suspend fun deleteMatch(id: Uuid) = repository.deleteMatch(id)

    override suspend fun deleteMatchesBySessionId(sessionId: Uuid) =
        repository.deleteMatchesBySessionId(sessionId)

    override suspend fun deleteAllMatches() = repository.deleteAllMatches()
}
