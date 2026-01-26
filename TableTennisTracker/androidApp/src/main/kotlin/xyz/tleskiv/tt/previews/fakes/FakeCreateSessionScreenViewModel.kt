package xyz.tleskiv.tt.previews.fakes

import com.kizitonwose.calendar.core.now
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch
import kotlin.uuid.ExperimentalUuidApi

@OptIn(ExperimentalUuidApi::class)
class FakeCreateSessionScreenViewModel(
	override val initialDate: LocalDate = LocalDate.now(),
	withSampleData: Boolean = true
) : CreateSessionScreenViewModel() {
	override val inputData: InputData = InputData(initialDate, initialDurationMinutes = 90).apply {
		if (withSampleData) {
			selectedSessionType.value = SessionType.TECHNIQUE
			rpeValue.intValue = 7
			notes.value = "Practice session notes"
			pendingMatches.addAll(sampleMatches)
		}
	}

	override fun saveSession(onSuccess: () -> Unit) {}
	override fun addPendingMatch(match: PendingMatch) {}
	override fun updatePendingMatch(match: PendingMatch) {}
	override fun removePendingMatch(matchId: String) {}

	companion object {
		private val names = listOf("Zhang Wei", "Maria Schmidt", "Kenji Tanaka")
		private val myScores = listOf(3, 2, 3)
		private val oppScores = listOf(1, 3, 2)
		private val levels = listOf(CompetitionLevel.LEAGUE, CompetitionLevel.LEAGUE, CompetitionLevel.TOURNAMENT)

		private val sampleMatches = List(3) { i ->
			PendingMatch(
				id = "${i + 1}",
				opponentName = names[i],
				opponentId = null,
				myGamesWon = myScores[i],
				opponentGamesWon = oppScores[i],
				isDoubles = i == 2,
				isRanked = true,
				competitionLevel = levels[i]
			)
		}

		fun withData() = FakeCreateSessionScreenViewModel(withSampleData = true)
		fun empty() = FakeCreateSessionScreenViewModel(withSampleData = false)
	}
}
