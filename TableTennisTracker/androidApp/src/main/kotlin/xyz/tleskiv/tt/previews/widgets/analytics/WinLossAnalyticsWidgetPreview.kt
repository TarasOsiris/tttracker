package xyz.tleskiv.tt.previews.widgets.analytics

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.analytics.WinLossAnalyticsWidget
import xyz.tleskiv.tt.viewmodel.analytics.SummaryStats

@Preview(showBackground = true, name = "No Matches")
@Composable
fun WinLossAnalyticsWidgetEmptyPreview() {
	val emptyStats = SummaryStats()
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WinLossAnalyticsWidget(stats = emptyStats)
		}
	}
}

@Preview(showBackground = true, name = "More Wins")
@Composable
fun WinLossAnalyticsWidgetMoreWinsPreview() {
	val stats = SummaryStats(
		totalSessions = 30,
		totalTrainingMinutes = 1200,
		matchesWon = 25,
		matchesLost = 8
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WinLossAnalyticsWidget(stats = stats)
		}
	}
}

@Preview(showBackground = true, name = "More Losses")
@Composable
fun WinLossAnalyticsWidgetMoreLossesPreview() {
	val stats = SummaryStats(
		totalSessions = 25,
		totalTrainingMinutes = 1000,
		matchesWon = 10,
		matchesLost = 28
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WinLossAnalyticsWidget(stats = stats)
		}
	}
}

@Preview(showBackground = true, name = "Balanced")
@Composable
fun WinLossAnalyticsWidgetBalancedPreview() {
	val stats = SummaryStats(
		totalSessions = 40,
		totalTrainingMinutes = 1800,
		matchesWon = 22,
		matchesLost = 20
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WinLossAnalyticsWidget(stats = stats)
		}
	}
}

@Preview(showBackground = true, name = "Only Wins")
@Composable
fun WinLossAnalyticsWidgetOnlyWinsPreview() {
	val stats = SummaryStats(
		totalSessions = 10,
		totalTrainingMinutes = 600,
		matchesWon = 15,
		matchesLost = 0
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WinLossAnalyticsWidget(stats = stats)
		}
	}
}

@Preview(showBackground = true, name = "Only Losses")
@Composable
fun WinLossAnalyticsWidgetOnlyLossesPreview() {
	val stats = SummaryStats(
		totalSessions = 8,
		totalTrainingMinutes = 480,
		matchesWon = 0,
		matchesLost = 12
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WinLossAnalyticsWidget(stats = stats)
		}
	}
}
