package xyz.tleskiv.tt.export

import io.kotest.matchers.shouldBe
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

class CsvExportTest {

	private fun millis(date: LocalDate) =
		date.atTime(12, 0).toInstant(TimeZone.currentSystemDefault()).toEpochMilliseconds()

	private val opponent = Opponent(
		id = Uuid.random(), name = "Smith, Jo", club = null, rating = null, handedness = null,
		style = null, notes = null, createdAt = 0, updatedAt = 0
	)

	private fun match(mine: Int, theirs: Int, notes: String? = null) = Match(
		id = Uuid.random(), sessionId = Uuid.random(), opponent = opponent, myGamesWon = mine,
		opponentGamesWon = theirs, games = null, isDoubles = false, isRanked = true,
		competitionLevel = null, rpe = null, notes = notes, createdAt = 0, updatedAt = 0
	)

	private val sessions = listOf(
		TrainingSession(
			id = Uuid.random(), date = millis(LocalDate(2026, 9, 10)), durationMinutes = 60, rpe = 7,
			sessionType = null, notes = "=SUM(A1)", matches = listOf(match(2, 2)), createdAt = 0, updatedAt = 0
		),
		TrainingSession(
			id = Uuid.random(), date = millis(LocalDate(2026, 9, 1)), durationMinutes = 90, rpe = 5,
			sessionType = SessionType.MATCH_PLAY, notes = "Good \"day\"\nlong rallies",
			matches = listOf(match(3, 1), match(0, 3, notes = "-tired")), createdAt = 0, updatedAt = 0
		)
	)

	@Test
	fun sessionsAreOldestFirstAndEscaped() {
		sessionsCsv(sessions) shouldBe
			"date,duration_minutes,rpe,session_type,matches_won,matches_lost,notes\r\n" +
			"2026-09-01,90,5,match_play,1,1,\"Good \"\"day\"\"\nlong rallies\"\r\n" +
			"2026-09-10,60,7,,0,0,'=SUM(A1)\r\n"
	}

	@Test
	fun matchesCarryTheirSessionDateAndResult() {
		matchesCsv(sessions) shouldBe
			"date,opponent,my_games,opponent_games,result,games,doubles,ranked,competition_level,rpe,notes\r\n" +
			"2026-09-01,\"Smith, Jo\",3,1,win,,false,true,,,\r\n" +
			"2026-09-01,\"Smith, Jo\",0,3,loss,,false,true,,,'-tired\r\n" +
			"2026-09-10,\"Smith, Jo\",2,2,draw,,false,true,,,\r\n"
	}

	@Test
	fun plainFieldsAreLeftAlone() {
		escape("Ana") shouldBe "Ana"
		escape("") shouldBe ""
	}
}
