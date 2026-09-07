package xyz.tleskiv.tt.service.impl

import kotlinx.coroutines.flow.Flow
import kotlinx.datetime.LocalDateTime
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.repo.TrainingSessionsRepository
import xyz.tleskiv.tt.service.MatchInput
import xyz.tleskiv.tt.service.TrainingSessionService
import kotlin.uuid.Uuid

class TrainingSessionServiceImpl(
	private val repository: TrainingSessionsRepository
) : TrainingSessionService {

	override val allSessions: Flow<List<TrainingSession>> = repository.allSessions

	override suspend fun addSession(
		dateTime: LocalDateTime,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?,
		matches: List<MatchInput>
	): Uuid = repository.addSession(
		date = dateTime.date,
		durationMinutes = durationMinutes,
		rpe = rpe,
		sessionType = sessionType,
		notes = notes,
		matches = matches
	)

	override suspend fun editSession(
		id: Uuid,
		dateTime: LocalDateTime,
		durationMinutes: Int,
		rpe: Int,
		sessionType: SessionType?,
		notes: String?,
		matches: List<MatchInput>?
	) {
		repository.editSession(
			id = id,
			date = dateTime.date,
			durationMinutes = durationMinutes,
			rpe = rpe,
			sessionType = sessionType,
			notes = notes,
			matches = matches
		)
	}

	override suspend fun getAllSessions(): List<TrainingSession> {
		return repository.getAllSessions()
	}

	override suspend fun getSessionById(id: Uuid): TrainingSession? {
		return repository.getSessionById(id)
	}

	override suspend fun deleteSession(id: Uuid) {
		repository.deleteSession(id)
	}

	override suspend fun deleteAllSessions() {
		repository.deleteAllSessions()
	}
}
