package xyz.tleskiv.tt.service

import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.db.Match
import kotlin.uuid.Uuid

interface MatchService {
    val allMatches: Flow<List<Match>>
	val totalMatchesCount: Flow<Long>

    suspend fun addMatch(
        sessionId: Uuid,
        opponentId: Uuid,
        myGamesWon: Int,
        opponentGamesWon: Int,
        games: String? = null,
        isDoubles: Boolean = false,
        isRanked: Boolean = false,
        competitionLevel: CompetitionLevel? = null,
        rpe: Int? = null,
        notes: String? = null
    ): Uuid

    suspend fun updateMatch(
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
    )

    suspend fun getAllMatches(): List<Match>

    suspend fun getMatchById(id: Uuid): Match?

    suspend fun getMatchesBySessionId(sessionId: Uuid): List<Match>

    suspend fun getMatchesByOpponentId(opponentId: Uuid): List<Match>

    suspend fun deleteMatch(id: Uuid)

    suspend fun deleteMatchesBySessionId(sessionId: Uuid)

    suspend fun deleteAllMatches()
}
