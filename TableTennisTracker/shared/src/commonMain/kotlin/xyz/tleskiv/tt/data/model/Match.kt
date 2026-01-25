package xyz.tleskiv.tt.data.model

import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
data class Match(
    val id: Uuid,
    val sessionId: Uuid,
    val opponent: Opponent,
    val myGamesWon: Int,
    val opponentGamesWon: Int,
    val games: String?,
    val isDoubles: Boolean,
    val isRanked: Boolean,
    val competitionLevel: CompetitionLevel?,
    val rpe: Int?,
    val notes: String?,
    val createdAt: Long,
    val updatedAt: Long
) {
    val isWin: Boolean get() = myGamesWon > opponentGamesWon
    val scoreDisplay: String get() = "$myGamesWon - $opponentGamesWon"
}
