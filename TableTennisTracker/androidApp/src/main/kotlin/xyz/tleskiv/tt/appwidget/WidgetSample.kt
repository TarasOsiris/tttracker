package xyz.tleskiv.tt.appwidget

import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.minus
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.TrainingStreak
import xyz.tleskiv.tt.analytics.TrainingWeek
import xyz.tleskiv.tt.data.model.enums.SessionType

/// Stand-in content for the widget picker until the user has logged a session — the same shape as
/// iOS's `WidgetSnapshot.sample`, so the picker shows what a widget does rather than its empty state.
object WidgetSample {
	private const val SAMPLE_DAYS = 120
	private val weeklyMinutes = listOf(150, 210, 90, 240, 180, 270, 200, 120)

	fun data(base: WidgetData): WidgetData {
		val today = base.today
		val days = (SAMPLE_DAYS - 1 downTo 0)
			.filter { it % 3 != 0 }
			.map { offset ->
				val busy = offset % 7 == 1
				WidgetDayLoad(
					date = today.minus(offset, DateTimeUnit.DAY),
					sessions = if (busy) 2 else 1,
					level = if (busy) 4 else offset % 2 + 1
				)
			}
		return base.copy(
			summary = SummaryStats(totalSessions = 48, totalTrainingMinutes = 3_960, matchesWon = 31, matchesLost = 17),
			days = days,
			lastSession = WidgetLastSession(
				id = "",
				date = today,
				minutes = 90,
				rpe = 7,
				type = SessionType.MATCH_PLAY,
				matchesWon = 3,
				matchesLost = 1,
				firstMatch = null
			),
			streak = TrainingStreak(currentWeeks = 6, longestWeeks = 11),
			weeks = weeklyMinutes.mapIndexed { index, minutes ->
				TrainingWeek(
					start = today.minus(weeklyMinutes.lastIndex - index, DateTimeUnit.WEEK),
					sessionCount = minutes / 60,
					totalMinutes = minutes,
					load = minutes * 6
				)
			}
		)
	}
}
