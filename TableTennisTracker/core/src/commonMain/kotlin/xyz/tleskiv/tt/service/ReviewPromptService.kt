package xyz.tleskiv.tt.service

import kotlinx.coroutines.flow.SharedFlow
import kotlin.time.Duration.Companion.days
import kotlin.time.Instant

/**
 * When to ask for a store review. Only sessions the user creates count — not edits, debug data, the screenshot
 * seeder or iCloud imports — and the UI calls [markRequested] once it has actually asked.
 */
interface ReviewPromptService {
	val sessionCreated: SharedFlow<Unit>

	suspend fun recordSessionCreated()

	suspend fun shouldRequestReview(): Boolean

	suspend fun markRequested()

	suspend fun reset()

	/** Debug builds: the next [shouldRequestReview] says yes whatever the counts, until [markRequested]. */
	suspend fun forceNextRequest()
}

data class ReviewPromptState(
	val sessionsCreated: Int = 0,
	val firstSessionAt: Instant? = null,
	val lastRequestedVersion: String? = null,
	val lastRequestedAt: Instant? = null,
	val isForced: Boolean = false
) {
	fun isDue(versionName: String, now: Instant): Boolean {
		if (isForced) return true
		val firstSessionAt = firstSessionAt ?: return false
		if (sessionsCreated < MIN_SESSIONS_CREATED || now - firstSessionAt < MIN_TIME_SINCE_FIRST_SESSION) return false
		if (lastRequestedVersion == versionName) return false
		val lastRequestedAt = lastRequestedAt ?: return true
		return now - lastRequestedAt >= MIN_TIME_BETWEEN_REQUESTS
	}

	companion object {
		const val MIN_SESSIONS_CREATED = 3
		val MIN_TIME_SINCE_FIRST_SESSION = 3.days
		val MIN_TIME_BETWEEN_REQUESTS = 120.days
	}
}
