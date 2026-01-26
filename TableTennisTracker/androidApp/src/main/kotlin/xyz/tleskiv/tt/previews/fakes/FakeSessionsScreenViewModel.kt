package xyz.tleskiv.tt.previews.fakes

import com.kizitonwose.calendar.core.now
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.minus
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
class FakeSessionsScreenViewModel(
	sessions: Map<LocalDate, List<SessionUiModel>> = createSampleSessions()
) : SessionsScreenViewModel() {
	override val sessions: StateFlow<Map<LocalDate, List<SessionUiModel>>> = MutableStateFlow(sessions)
	override val firstDayOfWeek: StateFlow<DayOfWeek> = MutableStateFlow(DayOfWeek.MONDAY)
	override val highlightCurrentDay: StateFlow<Boolean> = MutableStateFlow(true)
	override val inputData: InputData = InputData()

	companion object {
		private val sessionCounts = listOf(1, 2, 0, 1, 0, 1, 0, 1)
		private val durations = listOf(90, 120, 0, 60, 0, 75, 0, 45)
		private val types = listOf(
			SessionType.TECHNIQUE,
			SessionType.TOURNAMENT,
			null,
			SessionType.MATCH_PLAY,
			null,
			SessionType.SERVE_PRACTICE,
			null,
			SessionType.FREE_PLAY
		)
		private val notes =
			listOf("Morning practice", "Club tournament", null, "Footwork drills", null, "Serve practice", null, null)

		private fun createSampleSessions(): Map<LocalDate, List<SessionUiModel>> {
			val today = LocalDate.now()
			return List(8) { i -> today.minus(i, DateTimeUnit.DAY) }
				.mapIndexedNotNull { i, date ->
					val count = sessionCounts[i]
					if (count == 0) null
					else date to List(count) { j ->
						SessionUiModel(
							id = Uuid.random(),
							date = date,
							durationMinutes = durations[i] - j * 30,
							sessionType = types[i],
							rpe = 5 + (i + j) % 4,
							notes = if (j == 0) notes[i] else null
						)
					}
				}.toMap()
		}

		fun withData() = FakeSessionsScreenViewModel(createSampleSessions())
		fun empty() = FakeSessionsScreenViewModel(emptyMap())
	}
}
