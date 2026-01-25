package xyz.tleskiv.tt.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.MatchService
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.service.TrainingSessionService
import kotlin.random.Random
import kotlin.time.Clock
import kotlin.time.Duration.Companion.days
import kotlin.uuid.Uuid

class DebugScreenViewModel(
	private val trainingSessionService: TrainingSessionService,
	private val opponentService: OpponentService,
	private val matchService: MatchService
) : ViewModel() {

	private val _isGenerating = MutableStateFlow(false)
	val isGenerating: StateFlow<Boolean> = _isGenerating

	private val _isClearing = MutableStateFlow(false)
	val isClearing: StateFlow<Boolean> = _isClearing

	private val opponentNames = listOf(
		"Alex Chen", "Maria Kovacs", "Jan Mueller", "Lisa Wang", "Tom Anderson",
		"Yuki Tanaka", "Peter Schmidt", "Anna Petrov", "Carlos Silva", "Emma Brown",
		"Wei Liu", "Sophie Martin", "Raj Patel", "Olga Ivanova", "James Wilson"
	)

	private val clubNames = listOf(
		"TTC Berlin", "Vienna Spin", "Prague Smashers", "London Blades", "Paris Elite",
		"Munich Stars", "Barcelona TT", "Amsterdam Aces", "Stockholm Spinners", null
	)

	fun generateRandomSessions(count: Int = 100) {
		viewModelScope.launch {
			_isGenerating.value = true
			try {
				val opponentIds = generateRandomOpponents()

				val now = Clock.System.now()
				val timeZone = TimeZone.currentSystemDefault()
				val sessionTypes = SessionType.entries

				repeat(count) {
					val daysAgo = Random.nextInt(0, 365)
					val hour = Random.nextInt(8, 21)
					val minute = Random.nextInt(0, 60)

					val dateTime = (now - daysAgo.days).toLocalDateTime(timeZone)
					val sessionDateTime = LocalDateTime(dateTime.year, dateTime.month, dateTime.day, hour, minute)

					val durationMinutes = listOf(30, 45, 60, 90, 120).random()
					val rpe = Random.nextInt(1, 11)
					val sessionType = if (Random.nextBoolean()) sessionTypes.random() else null
					val notes = if (Random.nextInt(100) < 30) "Random session note #${Random.nextInt(1000)}" else null

					val sessionId = trainingSessionService.addSession(
						dateTime = sessionDateTime,
						durationMinutes = durationMinutes,
						rpe = rpe,
						sessionType = sessionType,
						notes = notes
					)

					generateRandomMatchesForSession(sessionId, opponentIds)
				}
			} finally {
				_isGenerating.value = false
			}
		}
	}

	private suspend fun generateRandomOpponents(): List<Uuid> {
		return opponentNames.map { name ->
			opponentService.addOpponent(
				name = name,
				club = clubNames.random(),
				rating = if (Random.nextBoolean()) Random.nextDouble(800.0, 2500.0) else null,
				handedness = if (Random.nextBoolean()) Handedness.entries.random() else null,
				style = if (Random.nextBoolean()) PlayingStyle.entries.random() else null,
				notes = if (Random.nextInt(100) < 20) "Notes about $name" else null
			)
		}
	}

	private suspend fun generateRandomMatchesForSession(sessionId: Uuid, opponentIds: List<Uuid>) {
		val matchCount = Random.nextInt(0, 6)
		val competitionLevels = CompetitionLevel.entries

		repeat(matchCount) {
			val myGamesWon = Random.nextInt(0, 4)
			val opponentGamesWon = if (myGamesWon == 3) Random.nextInt(0, 3) else Random.nextInt(myGamesWon + 1, 4)

			matchService.addMatch(
				sessionId = sessionId,
				opponentId = opponentIds.random(),
				myGamesWon = myGamesWon,
				opponentGamesWon = opponentGamesWon,
				games = null,
				isDoubles = Random.nextInt(100) < 15,
				isRanked = Random.nextInt(100) < 40,
				competitionLevel = if (Random.nextBoolean()) competitionLevels.random() else null,
				rpe = if (Random.nextBoolean()) Random.nextInt(1, 11) else null,
				notes = if (Random.nextInt(100) < 10) "Match note #${Random.nextInt(100)}" else null
			)
		}
	}

	fun clearAllSessions() {
		viewModelScope.launch {
			_isClearing.value = true
			try {
				matchService.deleteAllMatches()
				opponentService.deleteAllOpponents()
				trainingSessionService.deleteAllSessions()
			} finally {
				_isClearing.value = false
			}
		}
	}
}
