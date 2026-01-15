package xyz.tleskiv.tt.repo

import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.db.Training_session
import kotlin.uuid.Uuid

interface TrainingSessionsRepository {
	fun addSession(
		date: Long,
		durationMinutes: Int,
		rpe: Int?,
		sessionType: SessionType?,
		notes: String?
	): Uuid

	fun editSession(
		id: Uuid,
		date: Long,
		durationMinutes: Int,
		rpe: Int?,
		sessionType: SessionType?,
		notes: String?
	)

	fun getAllSessions(): List<Training_session>
}
