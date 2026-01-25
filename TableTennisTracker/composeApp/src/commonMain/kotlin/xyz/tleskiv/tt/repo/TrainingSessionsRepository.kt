package xyz.tleskiv.tt.repo

import kotlinx.coroutines.flow.Flow
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.MatchInput
import kotlin.uuid.Uuid

interface TrainingSessionsRepository {
	val allSessions: Flow<List<TrainingSession>>

	suspend fun addSession(
		date: LocalDate,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?,
		matches: List<MatchInput> = emptyList()
	): Uuid

	suspend fun editSession(
		id: Uuid,
		date: LocalDate,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?
	)

	suspend fun getAllSessions(): List<TrainingSession>

	suspend fun getSessionById(id: Uuid): TrainingSession?

	suspend fun deleteSession(id: Uuid)

	suspend fun deleteAllSessions()
}
