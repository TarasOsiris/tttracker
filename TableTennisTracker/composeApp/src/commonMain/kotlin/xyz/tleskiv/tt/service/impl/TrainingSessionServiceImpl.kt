package xyz.tleskiv.tt.service.impl

import kotlinx.coroutines.flow.Flow
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toInstant
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.db.Training_session
import xyz.tleskiv.tt.repo.TrainingSessionsRepository
import xyz.tleskiv.tt.service.TrainingSessionService
import kotlin.uuid.Uuid

class TrainingSessionServiceImpl(
	private val repository: TrainingSessionsRepository
) : TrainingSessionService {

	override val allSessions: Flow<List<Training_session>> = repository.allSessions

	override suspend fun addSession(
		dateTime: LocalDateTime,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?
	): Uuid {
		return repository.addSession(
			date = dateTime.toInstant(TimeZone.currentSystemDefault()).toEpochMilliseconds(),
			durationMinutes = durationMinutes,
			rpe = rpe,
			sessionType = sessionType,
			notes = notes
		)
	}

	override suspend fun editSession(
		id: Uuid,
		dateTime: LocalDateTime,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?
	) {
		repository.editSession(
			id = id,
			date = dateTime.toInstant(TimeZone.currentSystemDefault()).toEpochMilliseconds(),
			durationMinutes = durationMinutes,
			rpe = rpe,
			sessionType = sessionType,
			notes = notes
		)
	}

	override suspend fun getAllSessions(): List<Training_session> {
		return repository.getAllSessions()
	}

	override suspend fun getSessionById(id: Uuid): Training_session? {
		return repository.getSessionById(id)
	}

	override suspend fun deleteSession(id: Uuid) {
		repository.deleteSession(id)
	}
}
