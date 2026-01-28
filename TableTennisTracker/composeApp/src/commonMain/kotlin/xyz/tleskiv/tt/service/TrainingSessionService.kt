package xyz.tleskiv.tt.service

import kotlinx.coroutines.flow.Flow
import kotlinx.datetime.LocalDateTime
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.data.model.enums.SessionType
import kotlin.uuid.Uuid

data class MatchInput(
	val opponentId: Uuid?,
	val opponentName: String,
	val myGamesWon: Int,
	val opponentGamesWon: Int,
	val isDoubles: Boolean = false,
	val isRanked: Boolean = false,
	val competitionLevel: CompetitionLevel? = null,
	val notes: String? = null
)

interface TrainingSessionService {
	val allSessions: Flow<List<TrainingSession>>

	suspend fun addSession(
		dateTime: LocalDateTime,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?,
		matches: List<MatchInput> = emptyList()
	): Uuid

	suspend fun editSession(
		id: Uuid,
		dateTime: LocalDateTime,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?,
		matches: List<MatchInput>? = null
	)

	suspend fun getAllSessions(): List<TrainingSession>

	suspend fun getSessionById(id: Uuid): TrainingSession?

	suspend fun deleteSession(id: Uuid)

	suspend fun deleteAllSessions()
}
