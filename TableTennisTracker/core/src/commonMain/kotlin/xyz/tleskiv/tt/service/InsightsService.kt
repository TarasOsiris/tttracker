package xyz.tleskiv.tt.service

import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.analytics.TrainingInsights
import xyz.tleskiv.tt.analytics.TrainingWeek

/**
 * The deeper analytics: streaks, weekly load, session types and head-to-head records.
 *
 * Knows nothing about Pro; the UI decides what to show to whom.
 */
interface InsightsService {
	val insights: Flow<TrainingInsights>

	/**
	 * The last [weeks] weeks, oldest first, bucketed by the user's first day of week. [ALL_WEEKS]
	 * means every week since the first session.
	 */
	fun trainingWeeks(weeks: Int): Flow<List<TrainingWeek>>

	companion object {
		const val ALL_WEEKS = 0
	}
}
