package xyz.tleskiv.tt.analytics

import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.enums.SessionType
import kotlin.uuid.Uuid

/** One calendar week of training, starting on the user's first day of week. */
data class TrainingWeek(
	val start: LocalDate,
	val sessionCount: Int,
	val totalMinutes: Int,
	/** Session RPE × minutes, summed: how hard the week was, not just how long. */
	val load: Int
)

/**
 * Consecutive weeks with at least one session. Counted in weeks rather than days so planned rest
 * days do not break it.
 */
data class TrainingStreak(
	/** Ends at this week, or at last week while this one has nothing logged yet. */
	val currentWeeks: Int,
	val longestWeeks: Int
)

/** Sessions and minutes of one session type. `type` is null for sessions logged without one. */
data class SessionTypeShare(
	val type: SessionType?,
	val sessionCount: Int,
	val totalMinutes: Int
)

/** Head-to-head against one opponent, across every logged match. */
data class OpponentRecord(
	val opponentId: Uuid,
	val name: String,
	val wins: Int,
	val losses: Int,
	val gamesWon: Int,
	val gamesLost: Int,
	/** Up to [OPPONENT_RECENT_RESULTS] results, oldest first; `true` is a win. */
	val recentResults: List<Boolean>,
	val lastPlayed: LocalDate
) {
	val matchCount: Int get() = wins + losses
}

data class TrainingInsights(
	val streak: TrainingStreak = TrainingStreak(currentWeeks = 0, longestWeeks = 0),
	/** Most minutes first. */
	val sessionTypes: List<SessionTypeShare> = emptyList(),
	/** Most recently played first. */
	val opponents: List<OpponentRecord> = emptyList()
)

const val OPPONENT_RECENT_RESULTS = 5
