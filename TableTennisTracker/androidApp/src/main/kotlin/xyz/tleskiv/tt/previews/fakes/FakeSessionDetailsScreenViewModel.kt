package xyz.tleskiv.tt.previews.fakes

import com.kizitonwose.calendar.core.now
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
class FakeSessionDetailsScreenViewModel(
	uiState: UiState = createSampleUiState()
) : SessionDetailsScreenViewModel() {
	override val uiState: StateFlow<UiState> = MutableStateFlow(uiState)

	override fun deleteSession(onDeleted: () -> Unit) {}

	companion object {
		private val names = listOf("Zhang Wei", "Maria Schmidt", "Kenji Tanaka", "Alex Johnson")
		private val myScores = listOf(3, 2, 3, 1)
		private val oppScores = listOf(1, 3, 0, 3)
		private val isDoublesList = listOf(false, false, true, false)
		private val isRankedList = listOf(true, true, false, true)
		private val levels = listOf(CompetitionLevel.LEAGUE, CompetitionLevel.LEAGUE, null, CompetitionLevel.TOURNAMENT)
		private val matchNotes = listOf("Good match", "Close game", null, "Tough opponent")

		private fun createSampleSession() = SessionUiModel(
			id = Uuid.random(),
			date = LocalDate.now(),
			durationMinutes = 120,
			sessionType = SessionType.TECHNIQUE,
			rpe = 7,
			notes = "Great practice session with focus on backhand loops"
		)

		private fun createSampleMatches() = List(4) { i ->
			MatchUiModel(
				id = Uuid.random(),
				opponentName = names[i],
				myGamesWon = myScores[i],
				opponentGamesWon = oppScores[i],
				isDoubles = isDoublesList[i],
				isRanked = isRankedList[i],
				competitionLevel = levels[i],
				rpe = 5 + i,
				notes = matchNotes[i]
			)
		}

		private fun createSampleUiState() = UiState(
			session = createSampleSession(),
			matches = createSampleMatches(),
			isLoading = false,
			error = null
		)

		fun withData() = FakeSessionDetailsScreenViewModel(createSampleUiState())
		fun loading() = FakeSessionDetailsScreenViewModel(UiState(isLoading = true))
		fun error() = FakeSessionDetailsScreenViewModel(UiState(error = "Session not found"))
	}
}
