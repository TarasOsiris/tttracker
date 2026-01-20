package xyz.tleskiv.tt.service

import kotlinx.coroutines.flow.Flow
import kotlinx.datetime.LocalDateTime
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.db.Training_session
import kotlin.uuid.Uuid

interface TrainingSessionService {
	val allSessions: Flow<List<Training_session>>

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

	suspend fun getAllSessions(): List<Training_session>

	suspend fun getSessionById(id: Uuid): Training_session?

	suspend fun deleteSession(id: Uuid)

	suspend fun deleteAllSessions()
}
