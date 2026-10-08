package xyz.tleskiv.tt.appwidget

import io.kotest.core.spec.style.FunSpec
import io.kotest.matchers.collections.shouldBeEmpty
import io.kotest.matchers.collections.shouldContainExactly
import io.kotest.matchers.collections.shouldHaveSize
import io.kotest.matchers.nulls.shouldBeNull
import io.kotest.matchers.nulls.shouldNotBeNull
import io.kotest.matchers.shouldBe
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.atTime
import kotlinx.datetime.minus
import kotlinx.datetime.toInstant
import xyz.tleskiv.tt.analytics.DailyTrainingLoad
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.data.model.Match
import xyz.tleskiv.tt.data.model.Opponent
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.model.AppAccent
import kotlin.uuid.Uuid

class WidgetDataTest : FunSpec({

	// A Wednesday.
	val today = LocalDate(2026, 10, 7)

	fun millis(date: LocalDate, hour: Int = 12) =
		date.atTime(hour, 0).toInstant(TimeZone.currentSystemDefault()).toEpochMilliseconds()

	val opponentName = "Ana"

	fun match(sessionId: Uuid, myGames: Int, opponentGames: Int) = Match(
		id = Uuid.random(),
		sessionId = sessionId,
		opponent = Opponent(Uuid.random(), opponentName, null, null, null, null, null, 0, 0),
		myGamesWon = myGames,
		opponentGamesWon = opponentGames,
		games = null,
		isDoubles = false,
		isRanked = false,
		competitionLevel = null,
		rpe = null,
		notes = null,
		createdAt = 0,
		updatedAt = 0
	)

	fun session(date: LocalDate, createdAt: Long = 0, matches: (Uuid) -> List<Match> = { emptyList() }): TrainingSession {
		val id = Uuid.random()
		return TrainingSession(
			id = id,
			date = millis(date),
			durationMinutes = 90,
			rpe = 7,
			sessionType = SessionType.MATCH_PLAY,
			notes = null,
			matches = matches(id),
			createdAt = createdAt,
			updatedAt = createdAt
		)
	}

	test("toWidgetDays_bucketsAgainstTheBusiestDay") {
		val busiest = 4
		val load = listOf(
			DailyTrainingLoad(today, sessionCount = busiest, totalMinutes = 240),
			DailyTrainingLoad(today.minus(1, DateTimeUnit.DAY), sessionCount = 1, totalMinutes = 60)
		)
		val expectedLevels = listOf(1, 4)

		load.toWidgetDays(today).map { it.level } shouldContainExactly expectedLevels
	}

	test("toWidgetDays_sortsOldestFirstAndDropsDaysOutsideTheWindow") {
		val inWindow = today.minus(WidgetData.HISTORY_DAYS, DateTimeUnit.DAY)
		val tooOld = inWindow.minus(1, DateTimeUnit.DAY)
		val load = listOf(
			DailyTrainingLoad(today, 1, 60),
			DailyTrainingLoad(tooOld, 1, 60),
			DailyTrainingLoad(inWindow, 1, 60)
		)

		load.toWidgetDays(today).map { it.date } shouldContainExactly listOf(inWindow, today)
	}

	test("toWidgetDays_withNoLoad_isEmpty") {
		emptyList<DailyTrainingLoad>().toWidgetDays(today).shouldBeEmpty()
	}

	test("latestForWidget_picksTheNewestDayThenTheLatestCreated") {
		val older = session(today.minus(1, DateTimeUnit.DAY), createdAt = 9)
		val first = session(today, createdAt = 1)
		val second = session(today, createdAt = 2)

		listOf(older, second, first).latestForWidget()?.id shouldBe second.id.toString()
	}

	test("latestForWidget_countsWinsAndLossesButNotDraws") {
		val expectedWins = 2
		val expectedLosses = 1
		val firstMatch = WidgetMatch(opponent = opponentName, myGames = 3, opponentGames = 1)
		val latest = listOf(
			session(today) { id ->
				listOf(match(id, firstMatch.myGames, firstMatch.opponentGames), match(id, 3, 2), match(id, 1, 3), match(id, 2, 2))
			}
		).latestForWidget()

		latest.shouldNotBeNull()
		latest.matchesWon shouldBe expectedWins
		latest.matchesLost shouldBe expectedLosses
		latest.date shouldBe today
		latest.firstMatch shouldBe firstMatch
	}

	test("latestForWidget_withNoSessions_returnsNull") {
		emptyList<TrainingSession>().latestForWidget().shouldBeNull()
	}

	test("heatmapDays_startsOnTheFirstDayOfWeekAndEndsToday") {
		val weeks = 2
		val daysIntoWeek = 2
		val days = heatmapDays(DayOfWeek.MONDAY, weeks, today)

		days.first().dayOfWeek shouldBe DayOfWeek.MONDAY
		days.last() shouldBe today
		days shouldHaveSize weeks * 7 + daysIntoWeek + 1
	}

	test("heatmapDays_followsTheWeekStartPreference") {
		val days = heatmapDays(DayOfWeek.SUNDAY, weeks = 1, endingOn = today)

		days.first().dayOfWeek shouldBe DayOfWeek.SUNDAY
		days.last() shouldBe today
	}

	test("heatmapBands_splitsIntoBandsOfExactlyTheColumnsAsked") {
		val columns = 5
		val bandCount = 2
		val bands = heatmapBands(DayOfWeek.MONDAY, today, columns, bandCount)

		bands shouldHaveSize bandCount
		bands.forEach { it shouldHaveSize columns }
		bands.last().last().last() shouldBe today
		bands.flatten().dropLast(1).forEach { it shouldHaveSize 7 }
	}

	test("winRate_withoutMatches_isNull") {
		SummaryStats(totalSessions = 3).winRate.shouldBeNull()
	}

	test("winRate_isTheShareOfMatchesWon") {
		val expectedRate = 0.75
		SummaryStats(matchesWon = 3, matchesLost = 1).winRate shouldBe expectedRate
	}

	test("accent_withoutPro_isTheDefault") {
		val chosen = AppAccent.PINK
		val free = WidgetData(today = today, pro = WidgetProState(isPro = false, accent = chosen))
		val pro = WidgetData(today = today, pro = WidgetProState(isPro = true, accent = chosen))

		free.accent shouldBe AppAccent.DEFAULT
		pro.accent shouldBe chosen
	}
})
