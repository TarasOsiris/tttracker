package xyz.tleskiv.tt.previews.fakes

import com.kizitonwose.calendar.core.now
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.minus
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel
import xyz.tleskiv.tt.viewmodel.analytics.SummaryStats
import xyz.tleskiv.tt.viewmodel.analytics.WeeklyTrainingData
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
class FakeAnalyticsScreenViewModel : AnalyticsScreenViewModel() {
	companion object {
		private val sessionCounts = listOf(2, 1, 3, 1, 2, 1, 2, 3, 1, 2, 1, 1, 2, 1, 3)
		private val durations = listOf(90, 60, 120, 45, 75, 60, 90, 105, 60, 80, 55, 70, 95, 65, 110)

		private fun createSampleDates() = List(15) { i -> LocalDate.now().minus(i, DateTimeUnit.DAY) }

		private fun createSessionsByDate() = createSampleDates().mapIndexed { i, date ->
			date to sessionCounts[i]
		}.toMap()

		private fun createMinutesByDate() = createSampleDates().mapIndexed { i, date ->
			date to durations[i] * sessionCounts[i]
		}.toMap()

		private fun createSessionsList() = createSampleDates().mapIndexed { i, date ->
			date to List(sessionCounts[i]) { j ->
				SessionUiModel(
					id = Uuid.random(),
					date = date,
					durationMinutes = durations[i],
					sessionType = SessionType.entries[j % SessionType.entries.size],
					rpe = 5 + (i + j) % 5,
					notes = if (j % 2 == 0) "Practice session" else null
				)
			}
		}.toMap()
	}

	override val sessionsByDate: StateFlow<Map<LocalDate, Int>> = MutableStateFlow(createSessionsByDate())
	override val totalMinutesByDate: StateFlow<Map<LocalDate, Int>> = MutableStateFlow(createMinutesByDate())
	override val sessionsListByDate: StateFlow<Map<LocalDate, List<SessionUiModel>>> =
		MutableStateFlow(createSessionsList())
	override val firstDayOfWeek: StateFlow<DayOfWeek> = MutableStateFlow(DayOfWeek.MONDAY)
	override val summaryStats: StateFlow<SummaryStats> = MutableStateFlow(
		SummaryStats(totalSessions = 33, totalTrainingMinutes = 1250, matchesWon = 42, matchesLost = 13)
	)
	override val weeklyTrainingData: StateFlow<List<WeeklyTrainingData>> = MutableStateFlow(
		listOf(
			WeeklyTrainingData("23/12", 120),
			WeeklyTrainingData("30/12", 180),
			WeeklyTrainingData("6/1", 90),
			WeeklyTrainingData("13/1", 240),
			WeeklyTrainingData("20/1", 150),
			WeeklyTrainingData("27/1", 200),
			WeeklyTrainingData("3/2", 160),
			WeeklyTrainingData("10/2", 220)
		)
	)
}
