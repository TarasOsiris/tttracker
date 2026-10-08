package xyz.tleskiv.tt.analytics

import xyz.tleskiv.tt.service.InsightsService

/** How far back the weekly chart reaches. Everything past the free eight weeks is Pro. */
enum class WeeklyChartRange(val weeks: Int) {
	EIGHT_WEEKS(8),
	SIX_MONTHS(26),
	YEAR(52),
	ALL(InsightsService.ALL_WEEKS);

	val needsPro: Boolean get() = this != EIGHT_WEEKS
}
