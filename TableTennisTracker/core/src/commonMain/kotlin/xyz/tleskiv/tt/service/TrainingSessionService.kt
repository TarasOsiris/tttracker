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
	val notes: String? = null,
	/** The match being edited, or null for a new one; a new match may also bring a fresh id of its own. */
	val id: Uuid? = null
)

interface TrainingSessionService {
	val allSessions: Flow<List<TrainingSession>>

	suspend fun addSession(
		dateTime: LocalDateTime,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?,
		matches: List<MatchInput> = emptyList(),
		healthWorkoutId: String? = null
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

	/** Links the session to an Apple Health workout, or unlinks it when [workoutId] is null. */
	suspend fun setHealthWorkout(id: Uuid, workoutId: String?)

	suspend fun getAllSessions(): List<TrainingSession>

	suspend fun getSessionById(id: Uuid): TrainingSession?

	suspend fun deleteSession(id: Uuid)

	suspend fun deleteAllSessions()
}
