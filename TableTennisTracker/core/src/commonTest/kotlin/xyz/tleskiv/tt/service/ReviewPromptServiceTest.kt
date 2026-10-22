package xyz.tleskiv.tt.service

import io.kotest.matchers.collections.shouldContainExactly
import io.kotest.matchers.maps.shouldBeEmpty
import io.kotest.matchers.shouldBe
import kotlinx.coroutines.runBlocking
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.di.components.NativeInfoProvider
import xyz.tleskiv.tt.repo.MetadataRepository
import xyz.tleskiv.tt.service.impl.ReviewPromptServiceImpl
import xyz.tleskiv.tt.service.impl.ReviewPromptServiceImpl.Companion.KEY_FIRST_SESSION_AT
import xyz.tleskiv.tt.service.impl.ReviewPromptServiceImpl.Companion.KEY_LAST_REQUESTED_AT
import xyz.tleskiv.tt.service.impl.ReviewPromptServiceImpl.Companion.KEY_LAST_REQUESTED_VERSION
import xyz.tleskiv.tt.service.impl.ReviewPromptServiceImpl.Companion.KEY_SESSIONS_CREATED
import kotlin.test.Test
import kotlin.time.Clock
import kotlin.time.Duration
import kotlin.time.Duration.Companion.days
import kotlin.time.Duration.Companion.milliseconds
import kotlin.time.Instant

private class InMemoryMetadataRepository : MetadataRepository {
	val stored = mutableMapOf<String, String>()

	override suspend fun getValue(key: String): String? = stored[key]
	override suspend fun getValues(keys: Collection<String>): Map<String, String> = stored.filterKeys { it in keys }
	override suspend fun setValue(key: String, value: String) {
		stored[key] = value
	}

	override suspend fun update(values: Map<String, String>, deletedKeys: Collection<String>) {
		stored += values
		stored -= deletedKeys
	}
}

private class RecordingAnalyticsService : AnalyticsService {
	val events = mutableListOf<Pair<String, Map<String, Any>?>>()

	override fun capture(event: String, properties: Map<String, Any>?) {
		events += event to properties
	}

	override fun screen(screenName: String, properties: Map<String, Any>?) = Unit
	override fun identify(userId: String, properties: Map<String, Any>?) = Unit
	override fun reset() = Unit
}

private class FixedInfoProvider(override val versionName: String) : NativeInfoProvider {
	override val buildNumber = "1"
	override val isDebugBuild = false
	override val sentryDsn = ""
}

private class MovableClock(private var current: Instant) : Clock {
	override fun now(): Instant = current

	fun advance(by: Duration) {
		current += by
	}
}

class ReviewPromptStateTest {

	private val now = Instant.fromEpochMilliseconds(1_800_000_000_000)
	private val version = "1.4.0"
	private val previousVersion = "1.3.0"

	private val eligible = ReviewPromptState(
		sessionsCreated = ReviewPromptState.MIN_SESSIONS_CREATED,
		firstSessionAt = now - ReviewPromptState.MIN_TIME_SINCE_FIRST_SESSION
	)

	@Test
	fun isDue_withThreeSessionsOverThreeDaysNeverAsked_returnsTrue() {
		eligible.isDue(version, now) shouldBe true
	}

	@Test
	fun isDue_withTwoSessions_returnsFalse() {
		val sessionsCreated = ReviewPromptState.MIN_SESSIONS_CREATED - 1

		eligible.copy(sessionsCreated = sessionsCreated).isDue(version, now) shouldBe false
	}

	@Test
	fun isDue_withFirstSessionJustUnderThreeDaysAgo_returnsFalse() {
		val firstSessionAt = now - ReviewPromptState.MIN_TIME_SINCE_FIRST_SESSION + 1.milliseconds

		eligible.copy(firstSessionAt = firstSessionAt).isDue(version, now) shouldBe false
	}

	@Test
	fun isDue_withFirstSessionTwoDaysAgo_returnsFalse() {
		val firstSessionAt = now - 2.days

		eligible.copy(firstSessionAt = firstSessionAt).isDue(version, now) shouldBe false
	}

	@Test
	fun isDue_withNoFirstSession_returnsFalse() {
		eligible.copy(firstSessionAt = null).isDue(version, now) shouldBe false
	}

	@Test
	fun isDue_askedForSameVersion_returnsFalse() {
		val askedLongAgo = now - 365.days
		val state = eligible.copy(lastRequestedVersion = version, lastRequestedAt = askedLongAgo)

		state.isDue(version, now) shouldBe false
	}

	@Test
	fun isDue_askedForPreviousVersion119DaysAgo_returnsFalse() {
		val askedAt = now - 119.days
		val state = eligible.copy(lastRequestedVersion = previousVersion, lastRequestedAt = askedAt)

		state.isDue(version, now) shouldBe false
	}

	@Test
	fun isDue_askedForPreviousVersion120DaysAgo_returnsTrue() {
		val askedAt = now - ReviewPromptState.MIN_TIME_BETWEEN_REQUESTS
		val state = eligible.copy(lastRequestedVersion = previousVersion, lastRequestedAt = askedAt)

		state.isDue(version, now) shouldBe true
	}

	@Test
	fun isDue_forced_returnsTrueWhateverTheCounts() {
		val state = ReviewPromptState(lastRequestedVersion = version, lastRequestedAt = now, isForced = true)

		state.isDue(version, now) shouldBe true
	}
}

class ReviewPromptServiceTest {

	private val version = "1.4.0"
	private val start = Instant.fromEpochMilliseconds(1_800_000_000_000)

	private val repository = InMemoryMetadataRepository()
	private val analytics = RecordingAnalyticsService()
	private val clock = MovableClock(start)
	private val service = ReviewPromptServiceImpl(repository, FixedInfoProvider(version), analytics, clock)

	private suspend fun createSessions(count: Int) = repeat(count) { service.recordSessionCreated() }

	@Test
	fun recordSessionCreated_incrementsCountOncePerCall() = runBlocking<Unit> {
		val sessions = 2

		createSessions(sessions)

		repository.stored[KEY_SESSIONS_CREATED] shouldBe sessions.toString()
	}

	@Test
	fun recordSessionCreated_setsFirstSessionDateOnlyOnce() = runBlocking<Unit> {
		val expectedFirstSessionAt = start.toEpochMilliseconds().toString()
		val dayLater = 1.days

		service.recordSessionCreated()
		clock.advance(dayLater)
		service.recordSessionCreated()

		repository.stored[KEY_FIRST_SESSION_AT] shouldBe expectedFirstSessionAt
	}

	@Test
	fun shouldRequestReview_afterThreeSessionsOverThreeDays_returnsTrue() = runBlocking<Unit> {
		createSessions(ReviewPromptState.MIN_SESSIONS_CREATED)
		clock.advance(ReviewPromptState.MIN_TIME_SINCE_FIRST_SESSION)

		service.shouldRequestReview() shouldBe true
	}

	@Test
	fun shouldRequestReview_afterThreeSessionsInOneDay_returnsFalse() = runBlocking<Unit> {
		val sameDay = 1.days
		createSessions(ReviewPromptState.MIN_SESSIONS_CREATED)
		clock.advance(sameDay)

		service.shouldRequestReview() shouldBe false
	}

	@Test
	fun markRequested_storesVersionAndTime_andStopsAskingForThisVersion() = runBlocking<Unit> {
		createSessions(ReviewPromptState.MIN_SESSIONS_CREATED)
		clock.advance(ReviewPromptState.MIN_TIME_SINCE_FIRST_SESSION)
		val expectedRequestedAt = clock.now().toEpochMilliseconds().toString()

		service.markRequested()

		repository.stored[KEY_LAST_REQUESTED_VERSION] shouldBe version
		repository.stored[KEY_LAST_REQUESTED_AT] shouldBe expectedRequestedAt
		service.shouldRequestReview() shouldBe false
	}

	@Test
	fun markRequested_capturesEventWithSessionCountAndVersion() = runBlocking<Unit> {
		val sessions = ReviewPromptState.MIN_SESSIONS_CREATED
		val expectedProperties = mapOf<String, Any>("sessions_created" to sessions, "version" to version)
		val expectedEvent = "review_prompt_requested" to expectedProperties
		createSessions(sessions)

		service.markRequested()

		analytics.events shouldContainExactly listOf(expectedEvent)
	}

	@Test
	fun forceNextRequest_asksOnce_thenFollowsTheRulesAgain() = runBlocking<Unit> {
		service.forceNextRequest()
		val forced = service.shouldRequestReview()
		service.markRequested()

		forced shouldBe true
		service.shouldRequestReview() shouldBe false
	}

	@Test
	fun reset_clearsEverything() = runBlocking<Unit> {
		createSessions(ReviewPromptState.MIN_SESSIONS_CREATED)
		service.markRequested()
		service.forceNextRequest()

		service.reset()

		repository.stored.shouldBeEmpty()
		service.shouldRequestReview() shouldBe false
	}
}
