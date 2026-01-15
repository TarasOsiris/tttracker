package xyz.tleskiv.tt.service

import kotlinx.datetime.LocalDateTime
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.db.Training_session
import kotlin.uuid.Uuid

interface TrainingSessionService {
	fun addSession(
		dateTime: LocalDateTime,
		durationMinutes: Int,
		rpe: Int?,
		sessionType: SessionType?,
		notes: String?
	): Uuid

	fun editSession(
		id: Uuid,
		dateTime: LocalDateTime,
		durationMinutes: Int,
		rpe: Int?,
		sessionType: SessionType?,
		notes: String?
	)

	fun getAllSessions(): List<Training_session>

	fun getSessionById(id: Uuid): Training_session?
}
