package xyz.tleskiv.tt.previews.widgets.analytics

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.analytics.WeeklyTrainingAnalyticsWidget
import xyz.tleskiv.tt.viewmodel.analytics.WeeklyTrainingData

@Preview(showBackground = true, name = "No Training Data")
@Composable
fun WeeklyTrainingWidgetEmptyPreview() {
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WeeklyTrainingAnalyticsWidget(weeklyData = emptyList())
		}
	}
}

@Preview(showBackground = true, name = "All Zero Minutes")
@Composable
fun WeeklyTrainingWidgetZeroMinutesPreview() {
	val data = listOf(
		WeeklyTrainingData("6/1", 0),
		WeeklyTrainingData("13/1", 0),
		WeeklyTrainingData("20/1", 0),
		WeeklyTrainingData("27/1", 0)
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WeeklyTrainingAnalyticsWidget(weeklyData = data)
		}
	}
}

@Preview(showBackground = true, name = "Consistent Training")
@Composable
fun WeeklyTrainingWidgetConsistentPreview() {
	val data = listOf(
		WeeklyTrainingData("2/12", 180),
		WeeklyTrainingData("9/12", 175),
		WeeklyTrainingData("16/12", 190),
		WeeklyTrainingData("23/12", 165),
		WeeklyTrainingData("30/12", 180),
		WeeklyTrainingData("6/1", 170),
		WeeklyTrainingData("13/1", 185),
		WeeklyTrainingData("20/1", 175)
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WeeklyTrainingAnalyticsWidget(weeklyData = data)
		}
	}
}

@Preview(showBackground = true, name = "Increasing Trend")
@Composable
fun WeeklyTrainingWidgetIncreasingPreview() {
	val data = listOf(
		WeeklyTrainingData("2/12", 60),
		WeeklyTrainingData("9/12", 90),
		WeeklyTrainingData("16/12", 120),
		WeeklyTrainingData("23/12", 150),
		WeeklyTrainingData("30/12", 180),
		WeeklyTrainingData("6/1", 210),
		WeeklyTrainingData("13/1", 240),
		WeeklyTrainingData("20/1", 270)
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WeeklyTrainingAnalyticsWidget(weeklyData = data)
		}
	}
}

@Preview(showBackground = true, name = "Variable Training")
@Composable
fun WeeklyTrainingWidgetVariablePreview() {
	val data = listOf(
		WeeklyTrainingData("2/12", 240),
		WeeklyTrainingData("9/12", 45),
		WeeklyTrainingData("16/12", 180),
		WeeklyTrainingData("23/12", 0),
		WeeklyTrainingData("30/12", 120),
		WeeklyTrainingData("6/1", 300),
		WeeklyTrainingData("13/1", 60),
		WeeklyTrainingData("20/1", 150)
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WeeklyTrainingAnalyticsWidget(weeklyData = data)
		}
	}
}

@Preview(showBackground = true, name = "Few Weeks")
@Composable
fun WeeklyTrainingWidgetFewWeeksPreview() {
	val data = listOf(
		WeeklyTrainingData("13/1", 120),
		WeeklyTrainingData("20/1", 180),
		WeeklyTrainingData("27/1", 90)
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WeeklyTrainingAnalyticsWidget(weeklyData = data)
		}
	}
}

@Preview(showBackground = true, name = "High Volume Training")
@Composable
fun WeeklyTrainingWidgetHighVolumePreview() {
	val data = listOf(
		WeeklyTrainingData("2/12", 420),
		WeeklyTrainingData("9/12", 380),
		WeeklyTrainingData("16/12", 450),
		WeeklyTrainingData("23/12", 390),
		WeeklyTrainingData("30/12", 480),
		WeeklyTrainingData("6/1", 410),
		WeeklyTrainingData("13/1", 440),
		WeeklyTrainingData("20/1", 520)
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WeeklyTrainingAnalyticsWidget(weeklyData = data)
		}
	}
}

@Preview(showBackground = true, name = "Low Volume Training")
@Composable
fun WeeklyTrainingWidgetLowVolumePreview() {
	val data = listOf(
		WeeklyTrainingData("2/12", 30),
		WeeklyTrainingData("9/12", 45),
		WeeklyTrainingData("16/12", 25),
		WeeklyTrainingData("23/12", 40),
		WeeklyTrainingData("30/12", 35),
		WeeklyTrainingData("6/1", 50),
		WeeklyTrainingData("13/1", 30),
		WeeklyTrainingData("20/1", 45)
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			WeeklyTrainingAnalyticsWidget(weeklyData = data)
		}
	}
}
