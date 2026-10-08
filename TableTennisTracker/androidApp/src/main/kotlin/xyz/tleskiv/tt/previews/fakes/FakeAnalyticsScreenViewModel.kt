package xyz.tleskiv.tt.previews.fakes

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.minus
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.OpponentRecord
import xyz.tleskiv.tt.analytics.SessionTypeShare
import xyz.tleskiv.tt.analytics.TrainingInsights
import xyz.tleskiv.tt.analytics.TrainingStreak
import xyz.tleskiv.tt.analytics.TrainingWeek
import xyz.tleskiv.tt.analytics.WeeklyChartRange
import xyz.tleskiv.tt.analytics.weekStart
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.model.AnalyticsWidget
import xyz.tleskiv.tt.model.AnalyticsWidgetSetting
import xyz.tleskiv.tt.model.defaultAnalyticsWidgets
import xyz.tleskiv.tt.util.today
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
class FakeAnalyticsScreenViewModel : AnalyticsScreenViewModel() {
	companion object {
		private val sessionCounts = listOf(2, 1, 3, 1, 2, 1, 2, 3, 1, 2, 1, 1, 2, 1, 3)
		private val durations = listOf(90, 60, 120, 45, 75, 60, 90, 105, 60, 80, 55, 70, 95, 65, 110)

		private val weeklyMinutes = listOf(120, 180, 90, 240, 150, 200, 160, 220)
		private val loadMinutes = listOf(150, 90, 200, 180, 0, 240, 210, 120, 260, 190, 230, 170)
		private const val SAMPLE_RPE = 6

		fun sampleWeeks(minutes: List<Int>): List<TrainingWeek> {
			val currentWeek = weekStart(today(), DayOfWeek.MONDAY)
			return minutes.mapIndexed { i, total ->
				TrainingWeek(
					start = currentWeek.minus((minutes.lastIndex - i) * 7, DateTimeUnit.DAY),
					sessionCount = if (total > 0) 2 else 0,
					totalMinutes = total,
					load = total * SAMPLE_RPE
				)
			}
		}

		val sampleRecords = listOf(
			OpponentRecord(Uuid.random(), "Zhang Wei", 4, 2, 13, 9, listOf(true, false, true, true, false), today()),
			OpponentRecord(Uuid.random(), "Maria Schmidt", 1, 3, 6, 10, listOf(false, true, false, false), today()),
			OpponentRecord(Uuid.random(), "Kenji Tanaka", 2, 2, 8, 8, listOf(true, false, true, false), today())
		)

		private val sampleInsights = TrainingInsights(
			streak = TrainingStreak(currentWeeks = 3, longestWeeks = 7),
			sessionTypes = listOf(
				SessionTypeShare(SessionType.TECHNIQUE, sessionCount = 8, totalMinutes = 640),
				SessionTypeShare(SessionType.MATCH_PLAY, sessionCount = 5, totalMinutes = 420),
				SessionTypeShare(null, sessionCount = 2, totalMinutes = 90)
			),
			opponents = sampleRecords
		)

		private fun createSampleDates() = List(15) { i -> today().minus(i, DateTimeUnit.DAY) }

		private fun createSessionsByDate() = createSampleDates().mapIndexed { i, date ->
			date to sessionCounts[i]
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
	override val sessionsListByDate: StateFlow<Map<LocalDate, List<SessionUiModel>>> =
		MutableStateFlow(createSessionsList())
	override val firstDayOfWeek: StateFlow<DayOfWeek> = MutableStateFlow(DayOfWeek.MONDAY)
	override val summaryStats: StateFlow<SummaryStats> = MutableStateFlow(
		SummaryStats(totalSessions = 33, totalTrainingMinutes = 1250, matchesWon = 42, matchesLost = 13)
	)
	override val weeklyRange: StateFlow<WeeklyChartRange> = MutableStateFlow(WeeklyChartRange.EIGHT_WEEKS)
	override val weeklyTraining: StateFlow<List<TrainingWeek>> = MutableStateFlow(sampleWeeks(weeklyMinutes))
	override val insights: StateFlow<TrainingInsights> = MutableStateFlow(sampleInsights)
	override val trainingLoad: StateFlow<List<TrainingWeek>> = MutableStateFlow(sampleWeeks(loadMinutes))
	override val widgets: StateFlow<List<AnalyticsWidgetSetting>> = MutableStateFlow(defaultAnalyticsWidgets())

	override fun setWeeklyRange(range: WeeklyChartRange) {}
	override fun setWidgetVisible(widget: AnalyticsWidget, visible: Boolean) {}
	override fun moveWidget(widget: AnalyticsWidget, offset: Int) {}
}
