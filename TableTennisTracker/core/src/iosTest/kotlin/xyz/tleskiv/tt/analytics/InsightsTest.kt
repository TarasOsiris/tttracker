package xyz.tleskiv.tt.analytics

import io.kotest.matchers.collections.shouldContainExactly
import io.kotest.matchers.shouldBe
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.atTime
import kotlinx.datetime.toInstant
import xyz.tleskiv.tt.data.model.Match
import xyz.tleskiv.tt.data.model.Opponent
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.data.model.enums.SessionType
import kotlin.test.Test
import kotlin.uuid.Uuid

// Wednesday. Its Monday-first week starts on 2026-09-28.
private val today = LocalDate(2026, 9, 30)

private fun session(
	date: LocalDate,
	minutes: Int = 60,
	rpe: Int = 5,
	type: SessionType? = null,
	matches: List<Match> = emptyList()
): TrainingSession {
	val id = Uuid.random()
	return TrainingSession(
		id = id,
		date = date.atTime(12, 0).toInstant(TimeZone.currentSystemDefault()).toEpochMilliseconds(),
		durationMinutes = minutes, rpe = rpe, sessionType = type, notes = null,
		matches = matches.map { it.copy(sessionId = id) },
		createdAt = 0, updatedAt = 0
	)
}

private fun opponent(name: String) = Opponent(
	id = Uuid.random(), name = name, club = null, rating = null, handedness = null, style = null,
	notes = null, createdAt = 0, updatedAt = 0
)

private fun match(opponent: Opponent, mine: Int, theirs: Int, createdAt: Long = 0) = Match(
	id = Uuid.random(), sessionId = Uuid.random(), opponent = opponent, myGamesWon = mine,
	opponentGamesWon = theirs, games = null, isDoubles = false, isRanked = false,
	competitionLevel = null, rpe = null, notes = null, createdAt = createdAt, updatedAt = 0
)

class InsightsTest {

	@Test
	fun weekStartHonoursTheFirstDayOfWeek() {
		weekStart(today, DayOfWeek.MONDAY) shouldBe LocalDate(2026, 9, 28)
		weekStart(today, DayOfWeek.SUNDAY) shouldBe LocalDate(2026, 9, 27)
		weekStart(LocalDate(2026, 9, 27), DayOfWeek.MONDAY) shouldBe LocalDate(2026, 9, 21)
	}

	@Test
	fun noSessionsMeansNoStreak() {
		trainingStreak(emptyList(), DayOfWeek.MONDAY, today) shouldBe TrainingStreak(0, 0)
	}

	@Test
	fun streakSurvivesAnEmptyCurrentWeek() {
		val dates = listOf(LocalDate(2026, 9, 22), LocalDate(2026, 9, 15), LocalDate(2026, 9, 8))
		trainingStreak(dates, DayOfWeek.MONDAY, today) shouldBe TrainingStreak(3, 3)
	}

	@Test
	fun streakBreaksOnAMissedWeekButLongestRemembersIt() {
		val dates = listOf(
			today,
			// 2026-09-21 week skipped
			LocalDate(2026, 9, 14), LocalDate(2026, 9, 9), LocalDate(2026, 9, 1), LocalDate(2026, 9, 2)
		)
		trainingStreak(dates, DayOfWeek.MONDAY, today) shouldBe TrainingStreak(1, 3)
	}

	@Test
	fun streakIsOverWhenLastWeekWasMissedToo() {
		trainingStreak(listOf(LocalDate(2026, 9, 14)), DayOfWeek.MONDAY, today) shouldBe TrainingStreak(0, 1)
	}

	@Test
	fun trainingWeeksSumsMinutesAndLoadPerWeek() {
		val sessions = listOf(
			session(today, minutes = 60, rpe = 8),
			session(LocalDate(2026, 9, 28), minutes = 30, rpe = 4),
			session(LocalDate(2026, 9, 16), minutes = 90, rpe = 6)
		)
		val weeks = trainingWeeks(sessions, DayOfWeek.MONDAY, today, weeks = 3)
		weeks.map { it.start } shouldContainExactly listOf(
			LocalDate(2026, 9, 14), LocalDate(2026, 9, 21), LocalDate(2026, 9, 28)
		)
		weeks.map { it.totalMinutes } shouldContainExactly listOf(90, 0, 90)
		weeks.map { it.load } shouldContainExactly listOf(540, 0, 600)
		weeks.map { it.sessionCount } shouldContainExactly listOf(1, 0, 2)
	}

	@Test
	fun allWeeksStartAtTheFirstSessionButNeverBelowTheMinimum() {
		val sessions = listOf(session(LocalDate(2026, 8, 31)), session(today))
		trainingWeeks(sessions, DayOfWeek.MONDAY, today, weeks = 0).size shouldBe 5
		trainingWeeks(sessions, DayOfWeek.MONDAY, today, weeks = 0, minWeeks = 8).size shouldBe 8
		trainingWeeks(emptyList(), DayOfWeek.MONDAY, today, weeks = 0, minWeeks = 8).size shouldBe 8
	}

	@Test
	fun sessionTypesAreOrderedByMinutes() {
		val sessions = listOf(
			session(today, minutes = 30, type = SessionType.TECHNIQUE),
			session(today, minutes = 30, type = SessionType.TECHNIQUE),
			session(today, minutes = 90, type = SessionType.MATCH_PLAY),
			session(today, minutes = 20, type = null)
		)
		sessionTypeBreakdown(sessions) shouldContainExactly listOf(
			SessionTypeShare(SessionType.MATCH_PLAY, sessionCount = 1, totalMinutes = 90),
			SessionTypeShare(SessionType.TECHNIQUE, sessionCount = 2, totalMinutes = 60),
			SessionTypeShare(null, sessionCount = 1, totalMinutes = 20)
		)
	}

	@Test
	fun opponentRecordsCountResultsGamesAndForm() {
		val anna = opponent("Anna")
		val ben = opponent("Ben")
		val sessions = listOf(
			session(LocalDate(2026, 9, 1), matches = listOf(match(anna, 3, 1), match(ben, 1, 3))),
			session(LocalDate(2026, 9, 10), matches = listOf(match(anna, 2, 3, createdAt = 2), match(anna, 2, 2, createdAt = 1))),
			session(LocalDate(2026, 9, 5), matches = listOf(match(ben, 3, 0)))
		)

		val records = opponentRecords(sessions)
		records.map { it.name } shouldContainExactly listOf("Anna", "Ben")

		val annaRecord = records.first()
		annaRecord.wins shouldBe 1
		annaRecord.losses shouldBe 1
		annaRecord.matchCount shouldBe 2
		annaRecord.gamesWon shouldBe 7
		annaRecord.gamesLost shouldBe 6
		annaRecord.recentResults shouldContainExactly listOf(true, false)
		annaRecord.lastPlayed shouldBe LocalDate(2026, 9, 10)

		val benRecord = records.last()
		benRecord.recentResults shouldContainExactly listOf(false, true)
		benRecord.lastPlayed shouldBe LocalDate(2026, 9, 5)
	}

	@Test
	fun recentFormKeepsOnlyTheLastFiveResults() {
		val anna = opponent("Anna")
		val sessions = (1..7).map { day ->
			session(LocalDate(2026, 9, day), matches = listOf(match(anna, if (day <= 2) 0 else 3, if (day <= 2) 3 else 0)))
		}
		opponentRecords(sessions).single().recentResults shouldContainExactly List(5) { true }
	}
}
