package xyz.tleskiv.tt.previews.widgets.analytics

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.analytics.WeeklyChartRange
import xyz.tleskiv.tt.previews.fakes.FakeAnalyticsScreenViewModel.Companion.sampleWeeks
import xyz.tleskiv.tt.ui.pro.LocalPro
import xyz.tleskiv.tt.ui.pro.ProState
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.analytics.WeeklyTrainingAnalyticsWidget

private const val YEAR_WEEKS = 52
private const val MINUTES_SPREAD = 37
private const val MINUTES_CYCLE = 300

@Composable
private fun WeeklyPreview(minutes: List<Int>, range: WeeklyChartRange = WeeklyChartRange.EIGHT_WEEKS) {
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WeeklyTrainingAnalyticsWidget(weeks = sampleWeeks(minutes), range = range, onRangeSelected = {})
		}
	}
}

@Preview(showBackground = true, name = "All Zero Minutes")
@Composable
fun WeeklyTrainingWidgetZeroMinutesPreview() {
	WeeklyPreview(minutes = List(8) { 0 })
}

@Preview(showBackground = true, name = "Consistent Training")
@Composable
fun WeeklyTrainingWidgetConsistentPreview() {
	WeeklyPreview(minutes = listOf(180, 175, 190, 165, 180, 170, 185, 175))
}

@Preview(showBackground = true, name = "Variable Training")
@Composable
fun WeeklyTrainingWidgetVariablePreview() {
	WeeklyPreview(minutes = listOf(240, 45, 180, 0, 120, 300, 60, 150))
}

@Preview(showBackground = true, name = "Low Volume Training")
@Composable
fun WeeklyTrainingWidgetLowVolumePreview() {
	WeeklyPreview(minutes = listOf(30, 45, 25, 40, 35, 50, 30, 45))
}

@Preview(showBackground = true, name = "One Year, Pro")
@Composable
fun WeeklyTrainingWidgetYearPreview() {
	CompositionLocalProvider(LocalPro provides ProState(hasProFeatures = true)) {
		WeeklyPreview(minutes = List(YEAR_WEEKS) { (it * MINUTES_SPREAD) % MINUTES_CYCLE }, range = WeeklyChartRange.YEAR)
	}
}
