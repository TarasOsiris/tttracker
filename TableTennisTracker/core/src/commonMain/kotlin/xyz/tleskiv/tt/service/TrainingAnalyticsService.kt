package xyz.tleskiv.tt.service

import kotlinx.coroutines.flow.Flow
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.analytics.DailyTrainingLoad
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.data.model.TrainingSession

/**
 * Aggregations behind the analytics screen.
 *
 * These live here rather than in a ViewModel because both the Compose UI and the native iOS UI need
 * the same numbers. The weekly charts are bucketed by [InsightsService.trainingWeeks].
 *
 * Everything derives from one shared subscription to the session list, so a database change costs a
 * single query and a single grouping pass no matter how many of these a screen observes.
 */
interface TrainingAnalyticsService {
	val summary: Flow<SummaryStats>

	/** Sessions grouped by the day they happened on. */
	val sessionsByDay: Flow<Map<LocalDate, List<TrainingSession>>>

	/** One entry per day that has at least one session, ascending by date. */
	val dailyLoad: Flow<List<DailyTrainingLoad>>

	companion object {
		/** The fewest weeks the weekly charts show, so a new user still sees a full chart. */
		const val WEEKS_SHOWN = 8
	}
}
