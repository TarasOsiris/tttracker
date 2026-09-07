package xyz.tleskiv.tt.service

import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.analytics.DailyTrainingLoad
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.WeeklyTrainingData

/**
 * Aggregations behind the analytics screen.
 *
 * These live here rather than in a ViewModel because both the Compose UI and the native iOS UI need
 * the same numbers, and the week bucketing in particular is the kind of arithmetic that should not
 * be written twice.
 */
interface TrainingAnalyticsService {
	val summary: Flow<SummaryStats>

	/** One entry per day that has at least one session, ascending by date. */
	val dailyLoad: Flow<List<DailyTrainingLoad>>

	/** The last [WEEKS_SHOWN] weeks, oldest first, bucketed by the user's first day of week. */
	val weeklyTraining: Flow<List<WeeklyTrainingData>>

	companion object {
		const val WEEKS_SHOWN = 8
	}
}
