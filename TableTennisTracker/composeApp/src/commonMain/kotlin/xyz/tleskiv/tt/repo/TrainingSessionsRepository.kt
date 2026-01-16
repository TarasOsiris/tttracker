package xyz.tleskiv.tt.repo

import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.db.Training_session
import kotlin.uuid.Uuid

interface TrainingSessionsRepository {
	suspend fun addSession(
		date: Long,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?
	): Uuid

	suspend fun editSession(
		id: Uuid,
		date: Long,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?
	)

	suspend fun getAllSessions(): List<Training_session>

	suspend fun getSessionById(id: Uuid): Training_session?
}
