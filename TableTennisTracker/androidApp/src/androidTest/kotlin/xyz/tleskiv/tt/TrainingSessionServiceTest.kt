package xyz.tleskiv.tt

import androidx.test.ext.junit.runners.AndroidJUnit4
import kotlinx.coroutines.runBlocking
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.koin.core.context.GlobalContext
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.MatchInput
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDate
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid.Companion.random

@OptIn(ExperimentalUuidApi::class)
@RunWith(AndroidJUnit4::class)
class TrainingSessionServiceTest {

	private lateinit var service: TrainingSessionService

	@Before
	fun setup() {
		service = GlobalContext.get().get()

		runBlocking {
			service.deleteAllSessions()
		}
	}

	@Test
	fun addSessionWithAllParameters_thenRetrieve_returnsCorrectData() = runBlocking {
		val testDate = LocalDate(2024, 6, 15)
		val testDateTime = LocalDateTime(testDate.year, testDate.month, testDate.day, 14, 30)
		val testDuration = 90
		val testRpe = 7
		val testSessionType = SessionType.TOURNAMENT
		val testNotes = "Great tournament practice session"

		val match1OpponentName = "Player One"
		val match1MyGamesWon = 3
		val match1OpponentGamesWon = 1
		val match1IsDoubles = false
		val match1IsRanked = true
		val match1CompetitionLevel = CompetitionLevel.TOURNAMENT

		val match2OpponentName = "Player Two"
		val match2MyGamesWon = 2
		val match2OpponentGamesWon = 3
		val match2IsDoubles = true
		val match2IsRanked = false
		val match2CompetitionLevel = CompetitionLevel.PRACTICE

		val testMatches = listOf(
			MatchInput(
				opponentId = null,
				opponentName = match1OpponentName,
				myGamesWon = match1MyGamesWon,
				opponentGamesWon = match1OpponentGamesWon,
				isDoubles = match1IsDoubles,
				isRanked = match1IsRanked,
				competitionLevel = match1CompetitionLevel
			),
			MatchInput(
				opponentId = null,
				opponentName = match2OpponentName,
				myGamesWon = match2MyGamesWon,
				opponentGamesWon = match2OpponentGamesWon,
				isDoubles = match2IsDoubles,
				isRanked = match2IsRanked,
				competitionLevel = match2CompetitionLevel
			)
		)
		val expectedMatchCount = testMatches.size
		val expectedSessionCount = 1

		val sessionId = service.addSession(
			dateTime = testDateTime,
			durationMinutes = testDuration,
			rpe = testRpe,
			sessionType = testSessionType,
			notes = testNotes,
			matches = testMatches
		)

		assertNotNull(sessionId)

		val allSessions = service.getAllSessions()
		assertEquals(expectedSessionCount, allSessions.size)

		val session = allSessions.first()
		assertEquals(sessionId, session.id)
		assertEquals(testDate, session.date.toLocalDate())
		assertEquals(testDuration, session.durationMinutes)
		assertEquals(testRpe, session.rpe)
		assertEquals(testSessionType, session.sessionType)
		assertEquals(testNotes, session.notes)
		assertTrue(session.createdAt > 0)
		assertTrue(session.updatedAt > 0)

		assertEquals(expectedMatchCount, session.matches.size)

		val match1 = session.matches.find { it.opponent.name == match1OpponentName }
		assertNotNull(match1)
		match1!!
		assertNotNull(match1.id)
		assertEquals(sessionId, match1.sessionId)
		assertEquals(match1MyGamesWon, match1.myGamesWon)
		assertEquals(match1OpponentGamesWon, match1.opponentGamesWon)
		assertEquals(match1IsDoubles, match1.isDoubles)
		assertEquals(match1IsRanked, match1.isRanked)
		assertEquals(match1CompetitionLevel, match1.competitionLevel)
		assertTrue(match1.isWin)
		assertTrue(match1.createdAt > 0)
		assertTrue(match1.updatedAt > 0)
		assertNotNull(match1.opponent.id)
		assertEquals(match1OpponentName, match1.opponent.name)

		val match2 = session.matches.find { it.opponent.name == match2OpponentName }
		assertNotNull(match2)
		match2!!
		assertNotNull(match2.id)
		assertEquals(sessionId, match2.sessionId)
		assertEquals(match2MyGamesWon, match2.myGamesWon)
		assertEquals(match2OpponentGamesWon, match2.opponentGamesWon)
		assertEquals(match2IsDoubles, match2.isDoubles)
		assertEquals(match2IsRanked, match2.isRanked)
		assertEquals(match2CompetitionLevel, match2.competitionLevel)
		assertFalse(match2.isWin)
		assertTrue(match2.createdAt > 0)
		assertTrue(match2.updatedAt > 0)
		assertNotNull(match2.opponent.id)
		assertEquals(match2OpponentName, match2.opponent.name)
	}

	@Test
	fun addSessionWithoutMatches_thenRetrieve_returnsEmptyMatchList() = runBlocking {
		val testDate = LocalDate(2024, 7, 20)
		val testDateTime = LocalDateTime(testDate.year, testDate.month, testDate.day, 10, 0)
		val testDuration = 60
		val testRpe = 5
		val testSessionType = SessionType.TECHNIQUE
		val testNotes = "Focused on backhand technique"
		val testMatches = emptyList<MatchInput>()

		val sessionId = service.addSession(
			dateTime = testDateTime,
			durationMinutes = testDuration,
			rpe = testRpe,
			sessionType = testSessionType,
			notes = testNotes,
			matches = testMatches
		)

		assertNotNull(sessionId)

		val session = service.getSessionById(sessionId)

		assertNotNull(session)
		session!!
		assertEquals(sessionId, session.id)
		assertEquals(testDate, session.date.toLocalDate())
		assertEquals(testDuration, session.durationMinutes)
		assertEquals(testRpe, session.rpe)
		assertEquals(testSessionType, session.sessionType)
		assertEquals(testNotes, session.notes)
		assertTrue(session.createdAt > 0)
		assertTrue(session.updatedAt > 0)
		assertTrue(session.matches.isEmpty())
	}

	@Test
	fun addSession_withNullOptionalFields_thenRetrieve_returnsNullValues() = runBlocking {
		val testDate = LocalDate(2024, 8, 1)
		val testDateTime = LocalDateTime(testDate.year, testDate.month, testDate.day, 18, 0)
		val testDuration = 45
		val testRpe = 3
		val testMatches = emptyList<MatchInput>()

		val sessionId = service.addSession(
			dateTime = testDateTime,
			durationMinutes = testDuration,
			rpe = testRpe,
			sessionType = null,
			notes = null,
			matches = testMatches
		)

		assertNotNull(sessionId)

		val session = service.getSessionById(sessionId)

		assertNotNull(session)
		session!!
		assertEquals(sessionId, session.id)
		assertEquals(testDate, session.date.toLocalDate())
		assertEquals(testDuration, session.durationMinutes)
		assertEquals(testRpe, session.rpe)
		assertNull(session.sessionType)
		assertNull(session.notes)
		assertTrue(session.createdAt > 0)
		assertTrue(session.updatedAt > 0)
		assertTrue(session.matches.isEmpty())
	}

	@Test
	fun editSession_updatesAllFields() = runBlocking {
		val initialDate = LocalDate(2024, 5, 10)
		val initialDateTime = LocalDateTime(initialDate.year, initialDate.month, initialDate.day, 9, 0)
		val initialDuration = 30
		val initialRpe = 4
		val initialSessionType = SessionType.FREE_PLAY
		val initialNotes = "Initial notes"
		val initialMatches = emptyList<MatchInput>()

		val sessionId = service.addSession(
			dateTime = initialDateTime,
			durationMinutes = initialDuration,
			rpe = initialRpe,
			sessionType = initialSessionType,
			notes = initialNotes,
			matches = initialMatches
		)

		val updatedDate = LocalDate(2024, 5, 11)
		val updatedDateTime = LocalDateTime(updatedDate.year, updatedDate.month, updatedDate.day, 15, 0)
		val updatedDuration = 120
		val updatedRpe = 9
		val updatedSessionType = SessionType.PHYSICAL
		val updatedNotes = "Updated notes after edit"

		service.editSession(
			id = sessionId,
			dateTime = updatedDateTime,
			durationMinutes = updatedDuration,
			rpe = updatedRpe,
			sessionType = updatedSessionType,
			notes = updatedNotes
		)

		val session = service.getSessionById(sessionId)

		assertNotNull(session)
		session!!
		assertEquals(sessionId, session.id)
		assertEquals(updatedDate, session.date.toLocalDate())
		assertEquals(updatedDuration, session.durationMinutes)
		assertEquals(updatedRpe, session.rpe)
		assertEquals(updatedSessionType, session.sessionType)
		assertEquals(updatedNotes, session.notes)
		assertTrue(session.createdAt > 0)
		assertTrue(session.updatedAt > 0)
		assertTrue(session.updatedAt >= session.createdAt)
	}

	@Test
	fun deleteSession_removesFromDatabase() = runBlocking {
		val testDate = LocalDate(2024, 9, 1)
		val testDateTime = LocalDateTime(testDate.year, testDate.month, testDate.day, 12, 0)
		val testDuration = 60
		val testRpe = 6
		val testSessionType = SessionType.MATCH_PLAY
		val testNotes = "Session to delete"
		val testMatches = emptyList<MatchInput>()
		val expectedCountAfterAdd = 1
		val expectedCountAfterDelete = 0

		val sessionId = service.addSession(
			dateTime = testDateTime,
			durationMinutes = testDuration,
			rpe = testRpe,
			sessionType = testSessionType,
			notes = testNotes,
			matches = testMatches
		)

		var allSessions = service.getAllSessions()
		assertEquals(expectedCountAfterAdd, allSessions.size)

		service.deleteSession(sessionId)

		allSessions = service.getAllSessions()
		assertEquals(expectedCountAfterDelete, allSessions.size)

		val deletedSession = service.getSessionById(sessionId)
		assertNull(deletedSession)
	}

	@Test
	fun getSessionById_withNonExistentId_returnsNull() = runBlocking {
		val nonExistentId = random()

		val session = service.getSessionById(nonExistentId)

		assertNull(session)
	}

	@Test
	fun getAllSessions_whenEmpty_returnsEmptyList() = runBlocking {
		val expectedCount = 0

		val sessions = service.getAllSessions()

		assertEquals(expectedCount, sessions.size)
	}

	@Test
	fun addMultipleSessions_thenRetrieve_returnsAllInCorrectOrder() = runBlocking {
		val date1 = LocalDate(2024, 1, 15)
		val dateTime1 = LocalDateTime(date1.year, date1.month, date1.day, 10, 0)
		val date2 = LocalDate(2024, 2, 20)
		val dateTime2 = LocalDateTime(date2.year, date2.month, date2.day, 14, 0)
		val date3 = LocalDate(2024, 3, 25)
		val dateTime3 = LocalDateTime(date3.year, date3.month, date3.day, 18, 0)

		val duration1 = 30
		val duration2 = 60
		val duration3 = 90
		val rpe = 5
		val expectedSessionCount = 3

		val sessionId1 = service.addSession(
			dateTime = dateTime1,
			durationMinutes = duration1,
			rpe = rpe,
			sessionType = null,
			notes = null,
			matches = emptyList()
		)

		val sessionId2 = service.addSession(
			dateTime = dateTime2,
			durationMinutes = duration2,
			rpe = rpe,
			sessionType = null,
			notes = null,
			matches = emptyList()
		)

		val sessionId3 = service.addSession(
			dateTime = dateTime3,
			durationMinutes = duration3,
			rpe = rpe,
			sessionType = null,
			notes = null,
			matches = emptyList()
		)

		val sessions = service.getAllSessions()

		assertEquals(expectedSessionCount, sessions.size)

		val retrievedSession1 = sessions.find { it.id == sessionId1 }
		val retrievedSession2 = sessions.find { it.id == sessionId2 }
		val retrievedSession3 = sessions.find { it.id == sessionId3 }

		assertNotNull(retrievedSession1)
		assertNotNull(retrievedSession2)
		assertNotNull(retrievedSession3)

		assertEquals(date1, retrievedSession1!!.date.toLocalDate())
		assertEquals(duration1, retrievedSession1.durationMinutes)

		assertEquals(date2, retrievedSession2!!.date.toLocalDate())
		assertEquals(duration2, retrievedSession2.durationMinutes)

		assertEquals(date3, retrievedSession3!!.date.toLocalDate())
		assertEquals(duration3, retrievedSession3.durationMinutes)
	}
}
