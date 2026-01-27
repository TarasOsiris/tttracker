package xyz.tleskiv.tt.ui.widgets.analytics

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.analytics_hours_minutes
import tabletennistracker.composeapp.generated.resources.analytics_no_training
import tabletennistracker.composeapp.generated.resources.analytics_weekly_avg
import tabletennistracker.composeapp.generated.resources.analytics_weekly_total
import tabletennistracker.composeapp.generated.resources.analytics_weekly_training
import tabletennistracker.composeapp.generated.resources.suffix_minutes_value
import xyz.tleskiv.tt.viewmodel.analytics.WeeklyTrainingData

private const val CHART_HEIGHT = 140
private const val GRID_LINES = 3

@Composable
fun WeeklyTrainingAnalyticsWidget(weeklyData: List<WeeklyTrainingData>) {
	val barColor = MaterialTheme.colorScheme.primary
	val currentWeekColor = MaterialTheme.colorScheme.tertiary

	AnalyticsWidget(title = Res.string.analytics_weekly_training) {
		if (weeklyData.isEmpty() || weeklyData.all { it.totalMinutes == 0 }) {
			Box(
				modifier = Modifier.fillMaxWidth().height(200.dp),
				contentAlignment = Alignment.Center
			) {
				Text(
					text = stringResource(Res.string.analytics_no_training),
					style = MaterialTheme.typography.bodyMedium,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}
		} else {
			val maxMinutes = remember(weeklyData) { weeklyData.maxOfOrNull { it.totalMinutes } ?: 60 }
			val totalMinutes = remember(weeklyData) { weeklyData.sumOf { it.totalMinutes } }
			val avgMinutes = remember(weeklyData) { totalMinutes / weeklyData.size }
			val roundedMax = remember(maxMinutes) { roundUpToNiceNumber(maxMinutes) }

			Column(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
				Row(modifier = Modifier.fillMaxWidth()) {
					YAxisLabels(roundedMax = roundedMax)
					ChartArea(
						weeklyData = weeklyData,
						roundedMax = roundedMax,
						barColor = barColor,
						currentWeekColor = currentWeekColor
					)
				}

				Spacer(modifier = Modifier.height(6.dp))
				WeekLabels(weeklyData = weeklyData)

				Spacer(modifier = Modifier.height(12.dp))
				HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
				Spacer(modifier = Modifier.height(12.dp))

				TrainingSummaryRow(totalMinutes = totalMinutes, avgMinutes = avgMinutes)
			}
		}
	}
}

@Composable
private fun YAxisLabels(roundedMax: Int) {
	Column(
		modifier = Modifier.width(36.dp).height(CHART_HEIGHT.dp),
		verticalArrangement = Arrangement.SpaceBetween
	) {
		Text(
			text = formatMinutesShort(roundedMax),
			style = MaterialTheme.typography.labelSmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
		Text(
			text = formatMinutesShort(roundedMax / 2),
			style = MaterialTheme.typography.labelSmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
		Text(
			text = "0",
			style = MaterialTheme.typography.labelSmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}

@Composable
private fun RowScope.ChartArea(
	weeklyData: List<WeeklyTrainingData>,
	roundedMax: Int,
	barColor: Color,
	currentWeekColor: Color
) {
	Box(modifier = Modifier.weight(1f).height(CHART_HEIGHT.dp)) {
		ChartGridLines()
		ChartBars(
			weeklyData = weeklyData,
			roundedMax = roundedMax,
			barColor = barColor,
			currentWeekColor = currentWeekColor
		)
	}
}

@Composable
private fun ChartGridLines() {
	Column(
		modifier = Modifier.fillMaxWidth().fillMaxHeight(),
		verticalArrangement = Arrangement.SpaceBetween
	) {
		repeat(GRID_LINES) {
			HorizontalDivider(
				color = MaterialTheme.colorScheme.outlineVariant.copy(alpha = 0.5f),
				thickness = 1.dp
			)
		}
	}
}

@Composable
private fun ChartBars(
	weeklyData: List<WeeklyTrainingData>,
	roundedMax: Int,
	barColor: Color,
	currentWeekColor: Color
) {
	Row(
		modifier = Modifier.fillMaxWidth().fillMaxHeight(),
		horizontalArrangement = Arrangement.SpaceEvenly,
		verticalAlignment = Alignment.Bottom
	) {
		weeklyData.forEachIndexed { index, data ->
			val isCurrentWeek = index == weeklyData.lastIndex
			val heightFraction = if (roundedMax > 0) {
				data.totalMinutes.toFloat() / roundedMax
			} else 0f

			Column(
				horizontalAlignment = Alignment.CenterHorizontally,
				modifier = Modifier.weight(1f)
			) {
				if (data.totalMinutes > 0) {
					Text(
						text = formatMinutesShort(data.totalMinutes),
						style = MaterialTheme.typography.labelSmall,
						color = MaterialTheme.colorScheme.onSurfaceVariant,
						fontWeight = if (isCurrentWeek) FontWeight.Bold else FontWeight.Normal
					)
					Spacer(modifier = Modifier.height(2.dp))
				}
				Box(
					modifier = Modifier
						.width(20.dp)
						.fillMaxHeight(heightFraction.coerceAtLeast(if (data.totalMinutes > 0) 0.02f else 0f))
						.clip(MaterialTheme.shapes.extraSmall)
						.background(if (isCurrentWeek) currentWeekColor else barColor)
				)
			}
		}
	}
}

@Composable
private fun WeekLabels(weeklyData: List<WeeklyTrainingData>) {
	Row(
		modifier = Modifier.fillMaxWidth().padding(start = 36.dp),
		horizontalArrangement = Arrangement.SpaceEvenly
	) {
		weeklyData.forEachIndexed { index, data ->
			val isCurrentWeek = index == weeklyData.lastIndex
			Text(
				text = data.weekLabel,
				style = MaterialTheme.typography.labelSmall,
				color = if (isCurrentWeek) {
					MaterialTheme.colorScheme.tertiary
				} else {
					MaterialTheme.colorScheme.onSurfaceVariant
				},
				fontWeight = if (isCurrentWeek) FontWeight.SemiBold else FontWeight.Normal,
				modifier = Modifier.weight(1f),
				textAlign = TextAlign.Center
			)
		}
	}
}

@Composable
private fun TrainingSummaryRow(totalMinutes: Int, avgMinutes: Int) {
	Row(
		modifier = Modifier.fillMaxWidth(),
		horizontalArrangement = Arrangement.SpaceEvenly
	) {
		SummaryItem(
			label = stringResource(Res.string.analytics_weekly_total),
			value = formatMinutesFull(totalMinutes)
		)
		SummaryItem(
			label = stringResource(Res.string.analytics_weekly_avg),
			value = formatMinutesFull(avgMinutes)
		)
	}
}

@Composable
private fun SummaryItem(label: String, value: String) {
	Column(horizontalAlignment = Alignment.CenterHorizontally) {
		Text(
			text = value,
			style = MaterialTheme.typography.titleMedium,
			fontWeight = FontWeight.SemiBold,
			color = MaterialTheme.colorScheme.onSurface
		)
		Text(
			text = label,
			style = MaterialTheme.typography.labelSmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}

@Composable
private fun formatMinutesFull(minutes: Int): String {
	return if (minutes >= 60) {
		val hours = minutes / 60
		val mins = minutes % 60
		stringResource(Res.string.analytics_hours_minutes, hours, mins)
	} else {
		stringResource(Res.string.suffix_minutes_value, minutes)
	}
}

private fun formatMinutesShort(minutes: Int): String {
	return if (minutes >= 60) {
		val hours = minutes / 60
		val mins = minutes % 60
		if (mins == 0) "${hours}h" else "${hours}h${mins}"
	} else {
		"${minutes}m"
	}
}

private fun roundUpToNiceNumber(value: Int): Int {
	if (value <= 0) return 60
	return when {
		value <= 30 -> 30
		value <= 60 -> 60
		value <= 120 -> 120
		value <= 180 -> 180
		value <= 240 -> 240
		value <= 300 -> 300
		value <= 360 -> 360
		value <= 480 -> 480
		value <= 600 -> 600
		else -> ((value + 59) / 60) * 60
	}
}
