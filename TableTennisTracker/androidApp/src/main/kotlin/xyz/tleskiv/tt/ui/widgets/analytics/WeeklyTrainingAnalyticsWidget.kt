package xyz.tleskiv.tt.ui.widgets.analytics

import androidx.annotation.StringRes
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlinx.datetime.LocalDate
import kotlinx.datetime.number
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.analytics.TrainingWeek
import xyz.tleskiv.tt.analytics.WeeklyChartRange
import xyz.tleskiv.tt.pro.PaywallSource
import xyz.tleskiv.tt.ui.pro.LocalPro
import xyz.tleskiv.tt.ui.pro.ProBadge
import xyz.tleskiv.tt.util.ext.shortDisplayText

private const val MAX_AXIS_LABELS = 6
private const val YEAR_LABELS_AFTER_WEEKS = 60

/**
 * The longer ranges stay listed for everyone; picking one without Pro opens the paywall and leaves
 * the chart where it was.
 */
@Composable
fun WeeklyTrainingAnalyticsWidget(
	weeks: List<TrainingWeek>,
	range: WeeklyChartRange,
	onRangeSelected: (WeeklyChartRange) -> Unit
) {
	val pro = LocalPro.current
	AnalyticsWidget(title = R.string.analytics_weekly_training) {
		Column(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
			WeeklyRangeSelector(
				selected = range,
				isLocked = { it.needsPro && !pro.hasProFeatures },
				onSelect = { picked ->
					if (picked.needsPro && !pro.hasProFeatures) pro.openPaywall(PaywallSource.ANALYTICS_RANGE)
					else onRangeSelected(picked)
				}
			)
			Spacer(modifier = Modifier.height(16.dp))
			if (weeks.all { it.totalMinutes == 0 }) {
				AnalyticsEmptyState(message = R.string.analytics_no_training, height = 160.dp)
			} else {
				WeeklyTrainingChart(weeks = weeks, range = range)
			}
		}
	}
}

@Composable
private fun WeeklyRangeSelector(
	selected: WeeklyChartRange,
	isLocked: (WeeklyChartRange) -> Boolean,
	onSelect: (WeeklyChartRange) -> Unit
) {
	val ranges = WeeklyChartRange.entries
	SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth()) {
		ranges.forEachIndexed { index, range ->
			val isSelected = range == selected
			SegmentedButton(
				selected = isSelected,
				onClick = { onSelect(range) },
				shape = SegmentedButtonDefaults.itemShape(index = index, count = ranges.size),
				icon = {
					if (isLocked(range)) ProBadge(modifier = Modifier.size(14.dp))
					else SegmentedButtonDefaults.Icon(active = isSelected)
				},
				label = { Text(text = stringResource(range.label), maxLines = 1) }
			)
		}
	}
}

@Composable
private fun WeeklyTrainingChart(weeks: List<TrainingWeek>, range: WeeklyChartRange) {
	val minutes = remember(weeks) { weeks.map { it.totalMinutes } }
	val totalMinutes = remember(minutes) { minutes.sum() }
	val avgMinutes = remember(minutes) { totalMinutes / minutes.size.coerceAtLeast(1) }
	val axisMax = remember(minutes) { roundUpToNiceNumber(minutes.maxOrNull() ?: 0) }

	WeeklyBarChart(
		values = minutes,
		axisLabels = weeklyAxisLabels(weeks = weeks, range = range),
		axisMax = axisMax,
		formatValue = ::formatMinutesShort,
		showValueLabels = range == WeeklyChartRange.EIGHT_WEEKS
	)
	Spacer(modifier = Modifier.height(12.dp))
	HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
	Spacer(modifier = Modifier.height(12.dp))
	TrainingSummaryRow(totalMinutes = totalMinutes, avgMinutes = avgMinutes)
}

/**
 * Day and month under each bar while each bar is a labelled week, months once there are too many to
 * label, and years once the months would repeat.
 */
@Composable
private fun weeklyAxisLabels(weeks: List<TrainingWeek>, range: WeeklyChartRange): List<String?> {
	if (range == WeeklyChartRange.EIGHT_WEEKS) return weeks.map { it.start.dayMonthLabel() }
	val byYear = weeks.size > YEAR_LABELS_AFTER_WEEKS
	val boundaries = weeks.indices.filter { index ->
		val previous = weeks.getOrNull(index - 1)?.start ?: return@filter false
		val start = weeks[index].start
		if (byYear) start.year != previous.year else start.month != previous.month
	}
	val shown = boundaries.thinnedFromEnd(MAX_AXIS_LABELS).toSet()
	return weeks.mapIndexed { index, week ->
		when {
			index !in shown -> null
			byYear -> week.start.year.toString()
			else -> week.start.month.shortDisplayText()
		}
	}
}

internal fun LocalDate.dayMonthLabel(): String = "$day/${month.number}"

/** Every n-th of these, counting back from the last, so at most [max] remain and the latest stays. */
internal fun List<Int>.thinnedFromEnd(max: Int): List<Int> {
	if (size <= max) return this
	val step = (size + max - 1) / max
	return filterIndexed { position, _ -> (lastIndex - position) % step == 0 }
}

@get:StringRes
private val WeeklyChartRange.label: Int
	get() = when (this) {
		WeeklyChartRange.EIGHT_WEEKS -> R.string.analytics_range_8w
		WeeklyChartRange.SIX_MONTHS -> R.string.analytics_range_6m
		WeeklyChartRange.YEAR -> R.string.analytics_range_1y
		WeeklyChartRange.ALL -> R.string.analytics_range_all
	}

@Composable
private fun TrainingSummaryRow(totalMinutes: Int, avgMinutes: Int) {
	Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
		SummaryItem(label = stringResource(R.string.analytics_weekly_total), value = formatMinutesFull(totalMinutes))
		SummaryItem(label = stringResource(R.string.analytics_weekly_avg), value = formatMinutesFull(avgMinutes))
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
		Text(text = label, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
	}
}

@Composable
private fun formatMinutesFull(minutes: Int): String {
	return if (minutes >= 60) {
		stringResource(R.string.analytics_hours_minutes, minutes / 60, minutes % 60)
	} else {
		stringResource(R.string.suffix_minutes_value, minutes)
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
