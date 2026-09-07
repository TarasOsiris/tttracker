package xyz.tleskiv.tt.previews.fakes

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.data.model.Opponent
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.viewmodel.settings.OpponentsScreenViewModel
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
class FakeOpponentsScreenViewModel(
	opponents: List<Opponent> = sampleOpponents
) : OpponentsScreenViewModel() {
	override val opponents: StateFlow<List<Opponent>> = MutableStateFlow(opponents)

	override fun deleteOpponent(id: Uuid) {}

	companion object {
		private const val NOW = 1706300000000L
		private val names = listOf("Zhang Wei", "Maria Schmidt", "Kenji Tanaka", "Alex Johnson", "Li Na")
		private val clubs = listOf("Beijing TT Club", "Munich Sports", null, "Local Club", "Tokyo TT")
		private val ratings = listOf(2150.0, 1890.0, 2050.0, null, 1950.0)
		private val handednesses =
			listOf(Handedness.RIGHT, Handedness.LEFT, Handedness.RIGHT, null, Handedness.RIGHT)
		private val styles = listOf(
			PlayingStyle.ATTACKER, PlayingStyle.DEFENDER, PlayingStyle.CHOPPER, null, PlayingStyle.ALL_ROUND
		)
		private val notesList = listOf("Strong forehand", null, "Uses long pips", "Beginner", "Fast footwork")

		private val sampleOpponents = List(5) { i ->
			Opponent(
				id = Uuid.random(),
				name = names[i],
				club = clubs[i],
				rating = ratings[i],
				handedness = handednesses[i],
				style = styles[i],
				notes = notesList[i],
				createdAt = NOW,
				updatedAt = NOW
			)
		}

		fun withOpponents() = FakeOpponentsScreenViewModel(sampleOpponents)
		fun empty() = FakeOpponentsScreenViewModel(emptyList())
	}
}
