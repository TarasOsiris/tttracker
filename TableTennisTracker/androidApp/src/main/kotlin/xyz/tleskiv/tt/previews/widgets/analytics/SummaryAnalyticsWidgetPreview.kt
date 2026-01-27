package xyz.tleskiv.tt.previews.widgets.analytics

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.analytics.SummaryAnalyticsWidget
import xyz.tleskiv.tt.viewmodel.analytics.SummaryStats

@Preview(showBackground = true, name = "Empty Stats")
@Composable
fun SummaryAnalyticsWidgetEmptyPreview() {
	val emptyStats = SummaryStats()
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			SummaryAnalyticsWidget(stats = emptyStats)
		}
	}
}

@Preview(showBackground = true, name = "High Win Rate (76%)")
@Composable
fun SummaryAnalyticsWidgetHighWinRatePreview() {
	val stats = SummaryStats(
		totalSessions = 42,
		totalTrainingMinutes = 1890,
		matchesWon = 38,
		matchesLost = 12
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			SummaryAnalyticsWidget(stats = stats)
		}
	}
}

@Preview(showBackground = true, name = "Medium Win Rate (50%)")
@Composable
fun SummaryAnalyticsWidgetMediumWinRatePreview() {
	val stats = SummaryStats(
		totalSessions = 20,
		totalTrainingMinutes = 900,
		matchesWon = 15,
		matchesLost = 15
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			SummaryAnalyticsWidget(stats = stats)
		}
	}
}

@Preview(showBackground = true, name = "Low Win Rate (25%)")
@Composable
fun SummaryAnalyticsWidgetLowWinRatePreview() {
	val stats = SummaryStats(
		totalSessions = 15,
		totalTrainingMinutes = 450,
		matchesWon = 5,
		matchesLost = 15
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			SummaryAnalyticsWidget(stats = stats)
		}
	}
}

@Preview(showBackground = true, name = "Large Numbers")
@Composable
fun SummaryAnalyticsWidgetLargeNumbersPreview() {
	val stats = SummaryStats(
		totalSessions = 365,
		totalTrainingMinutes = 18250,
		matchesWon = 156,
		matchesLost = 89
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			SummaryAnalyticsWidget(stats = stats)
		}
	}
}
