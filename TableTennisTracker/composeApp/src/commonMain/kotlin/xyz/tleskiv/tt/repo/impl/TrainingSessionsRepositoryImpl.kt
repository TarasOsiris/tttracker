package xyz.tleskiv.tt.repo.impl

import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.Training_session
import xyz.tleskiv.tt.repo.TrainingSessionsRepository
import kotlin.uuid.Uuid

class TrainingSessionsRepositoryImpl(
	private val database: AppDatabase
) : TrainingSessionsRepository {

	override fun addSession(
		date: Long,
		durationMinutes: Int,
		rpe: Int?,
		sessionType: SessionType?,
		notes: String?
	): Uuid {
		val now = System.currentTimeMillis()
		val sessionId = Uuid.random()

		database.appDatabaseQueries.insertSession(
			id = sessionId,
			date = date,
			duration_min = durationMinutes.toLong(),
			rpe = rpe?.toLong(),
			session_type = sessionType?.dbValue,
			notes = notes,
			updated_at = now
		)

		return sessionId
	}

	override fun editSession(
		id: Uuid,
		date: Long,
		durationMinutes: Int,
		rpe: Int?,
		sessionType: SessionType?,
		notes: String?
	) {
		val now = System.currentTimeMillis()

		database.appDatabaseQueries.updateSession(
			date = date,
			duration_min = durationMinutes.toLong(),
			rpe = rpe?.toLong(),
			session_type = sessionType?.dbValue,
			notes = notes,
			updated_at = now,
			id = id
		)
	}

	override fun getAllSessions(): List<Training_session> {
		return database.appDatabaseQueries.selectAllSessions().executeAsList()
	}
}
