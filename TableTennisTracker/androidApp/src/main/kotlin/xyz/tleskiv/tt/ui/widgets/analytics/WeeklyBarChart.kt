package xyz.tleskiv.tt.ui.widgets.analytics

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.dp
import kotlin.math.roundToInt

private val ChartHeight = 140.dp
private val YAxisWidth = 36.dp
private val MaxBarWidth = 20.dp
private const val GRID_LINES = 3
private const val ROUNDED_BARS_MAX = 26
private const val MIN_BAR_FRACTION = 0.02f

/**
 * One bar per week, oldest first, with the current week — the last bar — highlighted. [axisLabels]
 * holds a label or null per bar; labels may run wider than their bar and are kept inside the chart.
 */
@Composable
internal fun WeeklyBarChart(
	values: List<Int>,
	axisLabels: List<String?>,
	axisMax: Int,
	formatValue: (Int) -> String,
	showValueLabels: Boolean
) {
	Column(modifier = Modifier.fillMaxWidth()) {
		Row(modifier = Modifier.fillMaxWidth()) {
			YAxisLabels(axisMax = axisMax, formatValue = formatValue)
			ChartArea(values = values, axisMax = axisMax, formatValue = formatValue, showValueLabels = showValueLabels)
		}
		Spacer(modifier = Modifier.height(6.dp))
		AxisLabels(labels = axisLabels, modifier = Modifier.fillMaxWidth().padding(start = YAxisWidth))
	}
}

@Composable
private fun YAxisLabels(axisMax: Int, formatValue: (Int) -> String) {
	Column(
		modifier = Modifier.width(YAxisWidth).height(ChartHeight),
		verticalArrangement = Arrangement.SpaceBetween
	) {
		listOf(formatValue(axisMax), formatValue(axisMax / 2), "0").forEach {
			Text(text = it, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
		}
	}
}

@Composable
private fun RowScope.ChartArea(values: List<Int>, axisMax: Int, formatValue: (Int) -> String, showValueLabels: Boolean) {
	Box(modifier = Modifier.weight(1f).height(ChartHeight)) {
		ChartGridLines()
		ChartBars(values = values, axisMax = axisMax, formatValue = formatValue, showValueLabels = showValueLabels)
	}
}

@Composable
private fun ChartGridLines() {
	Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.SpaceBetween) {
		repeat(GRID_LINES) {
			HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant.copy(alpha = 0.5f), thickness = 1.dp)
		}
	}
}

@Composable
private fun ChartBars(values: List<Int>, axisMax: Int, formatValue: (Int) -> String, showValueLabels: Boolean) {
	val barColor = MaterialTheme.colorScheme.primary
	val currentWeekColor = MaterialTheme.colorScheme.tertiary
	val isDense = values.size > ROUNDED_BARS_MAX
	val barShape: Shape = if (isDense) RectangleShape else MaterialTheme.shapes.extraSmall
	val barWidthFraction = if (isDense) 0.75f else 0.6f

	Row(modifier = Modifier.fillMaxSize(), verticalAlignment = Alignment.Bottom) {
		values.forEachIndexed { index, value ->
			val isCurrentWeek = index == values.lastIndex
			val heightFraction = if (axisMax > 0) value.toFloat() / axisMax else 0f
			Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.weight(1f)) {
				if (showValueLabels && value > 0) {
					Text(
						text = formatValue(value),
						style = MaterialTheme.typography.labelSmall,
						color = MaterialTheme.colorScheme.onSurfaceVariant,
						fontWeight = if (isCurrentWeek) FontWeight.Bold else FontWeight.Normal,
						maxLines = 1
					)
					Spacer(modifier = Modifier.height(2.dp))
				}
				Bar(
					heightFraction = heightFraction.coerceAtLeast(if (value > 0) MIN_BAR_FRACTION else 0f),
					widthFraction = barWidthFraction,
					color = if (isCurrentWeek) currentWeekColor else barColor,
					shape = barShape
				)
			}
		}
	}
}

@Composable
private fun Bar(heightFraction: Float, widthFraction: Float, color: Color, shape: Shape) {
	Box(
		modifier = Modifier
			.fillMaxWidth(widthFraction)
			.widthIn(max = MaxBarWidth)
			.fillMaxHeight(heightFraction)
			.clip(shape)
			.background(color)
	)
}

@Composable
private fun AxisLabels(labels: List<String?>, modifier: Modifier = Modifier) {
	val labelled = labels.withIndex().mapNotNull { (index, label) -> label?.let { index to it } }
	val color = MaterialTheme.colorScheme.onSurfaceVariant
	val currentWeekColor = MaterialTheme.colorScheme.tertiary
	Layout(
		modifier = modifier,
		content = {
			labelled.forEach { (index, label) ->
				val isCurrentWeek = index == labels.lastIndex
				Text(
					text = label,
					style = MaterialTheme.typography.labelSmall,
					color = if (isCurrentWeek) currentWeekColor else color,
					fontWeight = if (isCurrentWeek) FontWeight.SemiBold else FontWeight.Normal,
					maxLines = 1
				)
			}
		}
	) { measurables, constraints ->
		val width = constraints.maxWidth
		val slot = width.toFloat() / labels.size.coerceAtLeast(1)
		val placeables = measurables.map { it.measure(Constraints(maxWidth = width)) }
		layout(width, placeables.maxOfOrNull { it.height } ?: 0) {
			placeables.forEachIndexed { i, placeable ->
				val center = slot * (labelled[i].first + 0.5f)
				val x = (center - placeable.width / 2f).roundToInt()
				placeable.place(x.coerceIn(0, (width - placeable.width).coerceAtLeast(0)), 0)
			}
		}
	}
}
