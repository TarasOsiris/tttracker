package xyz.tleskiv.tt.appwidget

import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.isoDayNumber
import kotlinx.datetime.minus
import xyz.tleskiv.tt.analytics.DailyTrainingLoad
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.analytics.TrainingStreak
import xyz.tleskiv.tt.analytics.TrainingWeek
import xyz.tleskiv.tt.analytics.heatmapLevel
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.model.AppAccent
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.util.ext.toLocalDate

/// Everything the home-screen widgets draw — the Android counterpart of iOS's `WidgetSnapshot`.
/// Android widgets render in the app's own process, so this is read straight from `:core` rather
/// than through a file, but it keeps the snapshot's shape: equality on it is what decides whether a
/// change is worth re-rendering the widgets for.
data class WidgetData(
	val summary: SummaryStats = SummaryStats(),
	/// Oldest first, one entry per day with sessions inside the heatmap's widest window.
	val days: List<WidgetDayLoad> = emptyList(),
	val lastSession: WidgetLastSession? = null,
	val streak: TrainingStreak = TrainingStreak(currentWeeks = 0, longestWeeks = 0),
	/// The last [LOAD_WEEKS] weeks, oldest first, the current one last.
	val weeks: List<TrainingWeek> = emptyList(),
	val firstDayOfWeek: DayOfWeek = DayOfWeek.MONDAY,
	val locale: AppLocale = AppLocale.SYSTEM,
	val pro: WidgetProState = WidgetProState(),
	val today: LocalDate
) {
	val isEmpty: Boolean get() = summary.totalSessions == 0

	/// The Pro accent, already the default when it is not Pro's to show.
	val accent: AppAccent get() = if (pro.isPro) pro.accent else AppAccent.DEFAULT

	companion object {
		/// How much history the heatmap widgets can show at their widest.
		const val HISTORY_DAYS = 53 * 7

		/// Weeks of load the Pro widgets chart.
		const val LOAD_WEEKS = 8
	}
}

data class WidgetDayLoad(
	val date: LocalDate,
	val sessions: Int,
	/// Intensity bucket, 0 through 4, from `heatmapLevel`.
	val level: Int
)

data class WidgetProState(val isPro: Boolean = false, val accent: AppAccent = AppAccent.DEFAULT)

data class WidgetLastSession(
	val id: String,
	val date: LocalDate,
	val minutes: Int,
	val rpe: Int,
	val type: SessionType?,
	val matchesWon: Int,
	val matchesLost: Int,
	/// The session's first match, the one the medium widget names.
	val firstMatch: WidgetMatch?
) {
	val matchCount: Int get() = matchesWon + matchesLost
}

data class WidgetMatch(val opponent: String, val myGames: Int, val opponentGames: Int)

val SummaryStats.winRate: Double?
	get() = (matchesWon + matchesLost).takeIf { it > 0 }?.let { matchesWon.toDouble() / it }

/// The heatmap's days, bucketed by the rule `:core` shares with both in-app heatmaps; the busiest
/// day is taken over the whole log, as on iOS, so a day keeps its shade as the window moves.
fun List<DailyTrainingLoad>.toWidgetDays(today: LocalDate): List<WidgetDayLoad> {
	val earliest = today.minus(WidgetData.HISTORY_DAYS, DateTimeUnit.DAY)
	val busiest = maxOfOrNull { it.sessionCount } ?: 0
	return filter { it.date >= earliest }
		.sortedBy { it.date }
		.map { WidgetDayLoad(it.date, it.sessionCount, heatmapLevel(it.sessionCount, busiest)) }
}

/// The newest session, tie-broken by creation like the day list does.
fun List<TrainingSession>.latestForWidget(): WidgetLastSession? {
	val newest = maxWithOrNull(compareBy<TrainingSession>({ it.date }, { it.createdAt })) ?: return null
	return WidgetLastSession(
		id = newest.id.toString(),
		date = newest.date.toLocalDate(),
		minutes = newest.durationMinutes,
		rpe = newest.rpe,
		type = newest.sessionType,
		matchesWon = newest.matches.count { it.isWin },
		// Not `!isWin`: a drawn match is neither, and the summary totals leave draws out too.
		matchesLost = newest.matches.count { it.opponentGamesWon > it.myGamesWon },
		firstMatch = newest.matches.firstOrNull()?.let { WidgetMatch(it.opponent.name, it.myGamesWon, it.opponentGamesWon) }
	)
}

/// Every day of a heatmap window, oldest first: [weeks] whole weeks followed by the current one up
/// to [endingOn], so a seven-row grid lays each column out as one week starting on [firstDayOfWeek].
fun heatmapDays(firstDayOfWeek: DayOfWeek, weeks: Int, endingOn: LocalDate): List<LocalDate> {
	val daysIntoWeek = (endingOn.dayOfWeek.isoDayNumber - firstDayOfWeek.isoDayNumber + 7) % 7
	val total = weeks * 7 + daysIntoWeek + 1
	return (total - 1 downTo 0).map { endingOn.minus(it, DateTimeUnit.DAY) }
}

/// The window split into [bandCount] bands of [columns] week-columns each, oldest first.
///
/// A week less than the total is asked for because [heatmapDays] adds the current partial week on
/// top, which is what makes the last band come to exactly [columns] — a widget cannot scroll, so
/// one column more would be clipped.
fun heatmapBands(firstDayOfWeek: DayOfWeek, endingOn: LocalDate, columns: Int, bandCount: Int): List<List<List<LocalDate>>> {
	val weeks = heatmapDays(firstDayOfWeek, columns * bandCount - 1, endingOn).chunked(7)
	return weeks.chunked(columns)
}
