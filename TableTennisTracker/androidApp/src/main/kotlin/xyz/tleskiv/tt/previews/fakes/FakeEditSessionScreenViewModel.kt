package xyz.tleskiv.tt.previews.fakes

import com.kizitonwose.calendar.core.now
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.EditSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.EditSessionUiState
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch
import kotlin.uuid.ExperimentalUuidApi

@OptIn(ExperimentalUuidApi::class)
class FakeEditSessionScreenViewModel(
	initialDate: LocalDate = LocalDate.now(),
	isLoading: Boolean = false,
	error: String? = null,
	withSampleData: Boolean = true
) : EditSessionScreenViewModel() {
	override val inputData: CreateSessionScreenViewModel.InputData = CreateSessionScreenViewModel.InputData(
		initialDate,
		initialDurationMinutes = 90
	).apply {
		if (withSampleData) {
			selectedSessionType.value = SessionType.MATCH_PLAY
			rpeValue.intValue = 7
			notes.value = "Edited practice session"
			pendingMatches.addAll(sampleMatches)
		}
	}
	override val uiState: StateFlow<EditSessionUiState> = MutableStateFlow(
		EditSessionUiState(isLoading = isLoading, error = error)
	)

	override fun saveSession(onSuccess: () -> Unit) {}
	override fun addPendingMatch(match: PendingMatch) {
		inputData.pendingMatches.add(match)
	}

	override fun updatePendingMatch(match: PendingMatch) {
		val index = inputData.pendingMatches.indexOfFirst { it.id == match.id }
		if (index >= 0) inputData.pendingMatches[index] = match
	}

	override fun removePendingMatch(matchId: String) {
		inputData.pendingMatches.removeAll { it.id == matchId }
	}

	companion object {
		private val names = listOf("Zhang Wei", "Maria Schmidt")
		private val myScores = listOf(3, 1)
		private val oppScores = listOf(2, 3)
		private val levels = listOf(CompetitionLevel.LEAGUE, CompetitionLevel.TOURNAMENT)

		private val sampleMatches = List(2) { i ->
			PendingMatch(
				id = "${i + 1}",
				opponentName = names[i],
				opponentId = null,
				myGamesWon = myScores[i],
				opponentGamesWon = oppScores[i],
				isDoubles = false,
				isRanked = true,
				competitionLevel = levels[i]
			)
		}

		fun withData() = FakeEditSessionScreenViewModel(withSampleData = true)
		fun empty() = FakeEditSessionScreenViewModel(withSampleData = false)
		fun loading() = FakeEditSessionScreenViewModel(isLoading = true, withSampleData = false)
		fun error() = FakeEditSessionScreenViewModel(error = "Failed to load session", withSampleData = false)
	}
}
