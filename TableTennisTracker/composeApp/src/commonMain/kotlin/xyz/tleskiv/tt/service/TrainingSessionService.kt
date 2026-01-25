package xyz.tleskiv.tt.service

import kotlinx.coroutines.flow.Flow
import kotlinx.datetime.LocalDateTime
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.data.model.enums.SessionType
import kotlin.uuid.Uuid

interface TrainingSessionService {
	val allSessions: Flow<List<TrainingSession>>

	suspend fun addSession(
		dateTime: LocalDateTime,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?
	): Uuid

	suspend fun editSession(
		id: Uuid,
		dateTime: LocalDateTime,
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
