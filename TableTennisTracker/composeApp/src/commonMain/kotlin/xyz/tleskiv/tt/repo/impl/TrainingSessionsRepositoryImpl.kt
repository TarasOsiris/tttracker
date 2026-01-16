package xyz.tleskiv.tt.repo.impl

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.Training_session
import xyz.tleskiv.tt.repo.TrainingSessionsRepository
import xyz.tleskiv.tt.util.nowMillis
import kotlin.uuid.Uuid

class TrainingSessionsRepositoryImpl(
	private val database: AppDatabase,
	private val ioDispatcher: CoroutineDispatcher
) : TrainingSessionsRepository {

	override suspend fun addSession(
		date: Long,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?
	): Uuid = withContext(ioDispatcher) {
		val sessionId = Uuid.random()

		database.appDatabaseQueries.insertSession(
			id = sessionId,
			date = date,
			duration_min = durationMinutes.toLong(),
			rpe = rpe.toLong(),
			session_type = sessionType?.dbValue,
			notes = notes,
			updated_at = nowMillis
		)

		sessionId
	}

	override suspend fun editSession(
		id: Uuid,
		date: Long,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?
	): Unit = withContext(ioDispatcher) {
		database.appDatabaseQueries.updateSession(
			date = date,
			duration_min = durationMinutes.toLong(),
			rpe = rpe.toLong(),
			session_type = sessionType?.dbValue,
			notes = notes,
			updated_at = nowMillis,
			id = id
		)
	}

	override suspend fun getAllSessions(): List<Training_session> = withContext(ioDispatcher) {
		database.appDatabaseQueries.selectAllSessions().executeAsList()
	}

	override suspend fun getSessionById(id: Uuid): Training_session? = withContext(ioDispatcher) {
		database.appDatabaseQueries.getSessionById(id).executeAsOneOrNull()
	}
}
