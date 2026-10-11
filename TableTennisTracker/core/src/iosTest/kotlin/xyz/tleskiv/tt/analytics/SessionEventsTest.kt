package xyz.tleskiv.tt.analytics

import io.kotest.matchers.maps.shouldContainKeys
import io.kotest.matchers.maps.shouldNotContainKey
import io.kotest.matchers.shouldBe
import xyz.tleskiv.tt.data.model.enums.SessionType
import kotlin.test.Test

class SessionEventsTest {

	private val durationMinutes = 72
	private val rpe = 7
	private val matchCount = 2

	private fun properties(isLinkedToHealth: Boolean) =
		sessionEventProperties(SessionType.TECHNIQUE, durationMinutes, rpe, matchCount, isLinkedToHealth)

	@Test
	fun sessionEventProperties_unlinkedSession_includesDurationAndRpe() {
		val properties = properties(isLinkedToHealth = false)

		properties["duration_minutes"] shouldBe durationMinutes
		properties["rpe"] shouldBe rpe
	}

	@Test
	fun sessionEventProperties_linkedSession_leavesOutHealthDerivedValues() {
		val properties = properties(isLinkedToHealth = true)

		properties.shouldNotContainKey("duration_minutes")
		properties.shouldNotContainKey("rpe")
		properties.shouldContainKeys("session_type", "match_count", "health_linked")
	}
}
