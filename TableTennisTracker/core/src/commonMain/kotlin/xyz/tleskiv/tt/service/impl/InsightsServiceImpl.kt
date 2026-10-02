package xyz.tleskiv.tt.service.impl

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.shareIn
import kotlinx.datetime.DayOfWeek
import xyz.tleskiv.tt.analytics.TrainingInsights
import xyz.tleskiv.tt.analytics.TrainingWeek
import xyz.tleskiv.tt.analytics.opponentRecords
import xyz.tleskiv.tt.analytics.sessionTypeBreakdown
import xyz.tleskiv.tt.analytics.trainingStreak
import xyz.tleskiv.tt.analytics.trainingWeeks
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.InsightsService
import xyz.tleskiv.tt.service.TrainingAnalyticsService
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.ext.toLocalDate
import xyz.tleskiv.tt.util.today

class InsightsServiceImpl(
	sessionService: TrainingSessionService,
	userPreferencesRepository: UserPreferencesRepository
) : InsightsService {

	// See TrainingAnalyticsServiceImpl: a singleton's sharing scope, not a dependency.
	private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

	private class Input(val sessions: List<TrainingSession>, val firstDayOfWeek: DayOfWeek)

	private val input: Flow<Input> =
		combine(sessionService.allSessions, userPreferencesRepository.weekStartDay) { sessions, weekStartDay ->
			Input(sessions, weekStartDay.toDayOfWeek())
		}.shareIn(scope, SharingStarted.WhileSubscribed(SHARE_TIMEOUT_MS), replay = 1)

	override val insights: Flow<TrainingInsights> = input.map {
		TrainingInsights(
			streak = trainingStreak(it.sessions.map { session -> session.date.toLocalDate() }, it.firstDayOfWeek, today()),
			sessionTypes = sessionTypeBreakdown(it.sessions),
			opponents = opponentRecords(it.sessions)
		)
	}

	override fun trainingWeeks(weeks: Int): Flow<List<TrainingWeek>> = input.map {
		trainingWeeks(it.sessions, it.firstDayOfWeek, today(), weeks, minWeeks = TrainingAnalyticsService.WEEKS_SHOWN)
	}

	private companion object {
		const val SHARE_TIMEOUT_MS = 5_000L
	}
}
