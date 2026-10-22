package xyz.tleskiv.tt.service.impl

import kotlinx.coroutines.channels.BufferOverflow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.di.components.NativeInfoProvider
import xyz.tleskiv.tt.repo.MetadataRepository
import xyz.tleskiv.tt.service.ReviewPromptService
import xyz.tleskiv.tt.service.ReviewPromptState
import xyz.tleskiv.tt.util.catchingFailures
import kotlin.time.Clock
import kotlin.time.Instant

class ReviewPromptServiceImpl(
	private val metadataRepository: MetadataRepository,
	private val nativeInfoProvider: NativeInfoProvider,
	private val analyticsService: AnalyticsService,
	private val clock: Clock = Clock.System
) : ReviewPromptService {

	private val mutex = Mutex()

	private val _sessionCreated = MutableSharedFlow<Unit>(
		extraBufferCapacity = 1,
		onBufferOverflow = BufferOverflow.DROP_OLDEST
	)
	override val sessionCreated: SharedFlow<Unit> = _sessionCreated.asSharedFlow()

	override suspend fun recordSessionCreated() {
		catchingFailures(Unit) {
			mutex.withLock {
				val stored = metadataRepository.getValues(listOf(KEY_SESSIONS_CREATED, KEY_FIRST_SESSION_AT))
				val sessionsCreated = (stored[KEY_SESSIONS_CREATED]?.toIntOrNull() ?: 0) + 1
				val firstSessionAt = stored[KEY_FIRST_SESSION_AT] ?: nowStored()
				metadataRepository.update(
					mapOf(KEY_SESSIONS_CREATED to sessionsCreated.toString(), KEY_FIRST_SESSION_AT to firstSessionAt)
				)
			}
		}
		_sessionCreated.tryEmit(Unit)
	}

	override suspend fun shouldRequestReview(): Boolean = catchingFailures(false) {
		mutex.withLock { readState() }.isDue(nativeInfoProvider.versionName, clock.now())
	}

	override suspend fun markRequested() {
		val sessionsCreated = catchingFailures(null) {
			mutex.withLock {
				metadataRepository.update(
					values = mapOf(
						KEY_LAST_REQUESTED_VERSION to nativeInfoProvider.versionName,
						KEY_LAST_REQUESTED_AT to nowStored()
					),
					deletedKeys = listOf(KEY_FORCED)
				)
				metadataRepository.getValue(KEY_SESSIONS_CREATED)?.toIntOrNull() ?: 0
			}
		} ?: return
		analyticsService.capture(
			"review_prompt_requested",
			mapOf("sessions_created" to sessionsCreated, "version" to nativeInfoProvider.versionName)
		)
	}

	override suspend fun reset() {
		catchingFailures(Unit) { mutex.withLock { metadataRepository.update(deletedKeys = ALL_KEYS) } }
	}

	override suspend fun forceNextRequest() {
		catchingFailures(Unit) { mutex.withLock { metadataRepository.setValue(KEY_FORCED, true.toString()) } }
	}

	private suspend fun readState(): ReviewPromptState {
		val stored = metadataRepository.getValues(ALL_KEYS)
		return ReviewPromptState(
			sessionsCreated = stored[KEY_SESSIONS_CREATED]?.toIntOrNull() ?: 0,
			firstSessionAt = stored[KEY_FIRST_SESSION_AT]?.toInstant(),
			lastRequestedVersion = stored[KEY_LAST_REQUESTED_VERSION],
			lastRequestedAt = stored[KEY_LAST_REQUESTED_AT]?.toInstant(),
			isForced = stored[KEY_FORCED] != null
		)
	}

	private fun nowStored(): String = clock.now().toEpochMilliseconds().toString()

	private fun String.toInstant(): Instant? = toLongOrNull()?.let(Instant::fromEpochMilliseconds)

	companion object {
		const val KEY_SESSIONS_CREATED = "review.sessions_created"
		const val KEY_FIRST_SESSION_AT = "review.first_session_at"
		const val KEY_LAST_REQUESTED_VERSION = "review.last_requested_version"
		const val KEY_LAST_REQUESTED_AT = "review.last_requested_at"
		const val KEY_FORCED = "review.forced"

		private val ALL_KEYS = listOf(
			KEY_SESSIONS_CREATED, KEY_FIRST_SESSION_AT, KEY_LAST_REQUESTED_VERSION, KEY_LAST_REQUESTED_AT, KEY_FORCED
		)
	}
}
