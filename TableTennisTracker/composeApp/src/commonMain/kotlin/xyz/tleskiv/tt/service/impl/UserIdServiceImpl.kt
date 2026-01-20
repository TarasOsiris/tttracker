package xyz.tleskiv.tt.service.impl

import xyz.tleskiv.tt.repo.MetadataRepository
import xyz.tleskiv.tt.service.UserIdService
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
class UserIdServiceImpl(
	private val metadataRepository: MetadataRepository
) : UserIdService {

	private var cachedUserId: String? = null

	override suspend fun getUserId(): String {
		cachedUserId?.let { return it }

		val existing = metadataRepository.getValue(KEY_USER_ID)
		if (existing != null) {
			cachedUserId = existing
			return existing
		}

		val newUserId = Uuid.random().toString()
		metadataRepository.setValue(KEY_USER_ID, newUserId)
		cachedUserId = newUserId
		return newUserId
	}

	companion object {
		private const val KEY_USER_ID = "user_id"
	}
}
