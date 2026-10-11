package xyz.tleskiv.tt.health

import io.kotest.matchers.collections.shouldContainExactly
import io.kotest.matchers.nulls.shouldBeNull
import io.kotest.matchers.shouldBe
import kotlinx.datetime.LocalDate
import kotlin.test.Test

class HealthWorkoutMatchingTest {

	private val sessionDate = LocalDate(2026, 10, 9)
	private val sessionMinutes = 90

	private fun workout(id: String, date: LocalDate = sessionDate, minutes: Int = sessionMinutes) =
		HealthWorkoutCandidate(id, date, minutes)

	@Test
	fun rank_sameDayWorkouts_putsClosestDurationFirst() {
		val short = workout("short", minutes = 30)
		val close = workout("close", minutes = 85)

		val ranked = HealthWorkoutMatching.rank(sessionDate, sessionMinutes, listOf(short, close), emptySet())

		ranked.map { it.id } shouldContainExactly listOf("close", "short")
	}

	@Test
	fun rank_otherDays_comeAfterSameDayByDistance() {
		val twoDaysAway = workout("twoDays", date = LocalDate(2026, 10, 11))
		val dayBefore = workout("dayBefore", date = LocalDate(2026, 10, 8))
		val sameDay = workout("sameDay", minutes = 20)

		val ranked = HealthWorkoutMatching.rank(sessionDate, sessionMinutes, listOf(twoDaysAway, dayBefore, sameDay), emptySet())

		ranked.map { it.id } shouldContainExactly listOf("sameDay", "dayBefore", "twoDays")
	}

	@Test
	fun rank_linkedWorkout_isLeftOut() {
		val linked = workout("linked")
		val free = workout("free", minutes = 40)

		val ranked = HealthWorkoutMatching.rank(sessionDate, sessionMinutes, listOf(linked, free), setOf("linked"))

		ranked.map { it.id } shouldContainExactly listOf("free")
	}

	@Test
	fun suggestion_withSameDayWorkout_returnsIt() {
		val expectedId = "match"
		val candidates = listOf(workout("otherDay", date = LocalDate(2026, 10, 8)), workout(expectedId, minutes = 75))

		HealthWorkoutMatching.suggestion(sessionDate, sessionMinutes, candidates, emptySet())?.id shouldBe expectedId
	}

	@Test
	fun suggestion_withOnlyOtherDays_returnsNull() {
		val candidates = listOf(workout("otherDay", date = LocalDate(2026, 10, 8)))

		HealthWorkoutMatching.suggestion(sessionDate, sessionMinutes, candidates, emptySet()).shouldBeNull()
	}
}
