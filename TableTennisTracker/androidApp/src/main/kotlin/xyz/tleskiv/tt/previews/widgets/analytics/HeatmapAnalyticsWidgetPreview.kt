package xyz.tleskiv.tt.previews.widgets.analytics

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.kizitonwose.calendar.core.now
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.minus
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.analytics.HeatmapAnalyticsWidget
import kotlin.random.Random

@Preview(showBackground = true, name = "Empty Heatmap")
@Composable
fun HeatmapAnalyticsWidgetEmptyPreview() {
	val endDate = LocalDate.now()
	val startDate = endDate.minus(90, DateTimeUnit.DAY)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			HeatmapAnalyticsWidget(
				sessionsByDate = emptyMap(),
				startDate = startDate,
				endDate = endDate,
				firstDayOfWeek = DayOfWeek.MONDAY,
				selection = null,
				onDaySelected = {}
			)
		}
	}
}

@Preview(showBackground = true, name = "Sparse Sessions")
@Composable
fun HeatmapAnalyticsWidgetSparsePreview() {
	val endDate = LocalDate.now()
	val startDate = endDate.minus(90, DateTimeUnit.DAY)
	val sessionsByDate = mapOf(
		endDate.minus(5, DateTimeUnit.DAY) to 1,
		endDate.minus(12, DateTimeUnit.DAY) to 2,
		endDate.minus(20, DateTimeUnit.DAY) to 1,
		endDate.minus(35, DateTimeUnit.DAY) to 3,
		endDate.minus(50, DateTimeUnit.DAY) to 1,
		endDate.minus(65, DateTimeUnit.DAY) to 2
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			HeatmapAnalyticsWidget(
				sessionsByDate = sessionsByDate,
				startDate = startDate,
				endDate = endDate,
				firstDayOfWeek = DayOfWeek.MONDAY,
				selection = null,
				onDaySelected = {}
			)
		}
	}
}

@Preview(showBackground = true, name = "Regular Training")
@Composable
fun HeatmapAnalyticsWidgetRegularPreview() {
	val endDate = LocalDate.now()
	val startDate = endDate.minus(90, DateTimeUnit.DAY)
	val random = Random(42)
	val sessionsByDate = (0..90).mapNotNull { daysAgo ->
		val date = endDate.minus(daysAgo, DateTimeUnit.DAY)
		val dayOfWeek = date.dayOfWeek
		if (dayOfWeek == DayOfWeek.TUESDAY || dayOfWeek == DayOfWeek.THURSDAY || dayOfWeek == DayOfWeek.SATURDAY) {
			date to random.nextInt(1, 4)
		} else {
			null
		}
	}.toMap()
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			HeatmapAnalyticsWidget(
				sessionsByDate = sessionsByDate,
				startDate = startDate,
				endDate = endDate,
				firstDayOfWeek = DayOfWeek.MONDAY,
				selection = null,
				onDaySelected = {}
			)
		}
	}
}

@Preview(showBackground = true, name = "Dense Training")
@Composable
fun HeatmapAnalyticsWidgetDensePreview() {
	val endDate = LocalDate.now()
	val startDate = endDate.minus(90, DateTimeUnit.DAY)
	val random = Random(123)
	val sessionsByDate = (0..90).mapNotNull { daysAgo ->
		val date = endDate.minus(daysAgo, DateTimeUnit.DAY)
		if (random.nextFloat() > 0.3f) {
			date to random.nextInt(1, 5)
		} else {
			null
		}
	}.toMap()
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			HeatmapAnalyticsWidget(
				sessionsByDate = sessionsByDate,
				startDate = startDate,
				endDate = endDate,
				firstDayOfWeek = DayOfWeek.MONDAY,
				selection = null,
				onDaySelected = {}
			)
		}
	}
}

@Preview(showBackground = true, name = "With Selection")
@Composable
fun HeatmapAnalyticsWidgetWithSelectionPreview() {
	val endDate = LocalDate.now()
	val startDate = endDate.minus(90, DateTimeUnit.DAY)
	val selectedDate = endDate.minus(7, DateTimeUnit.DAY)
	val sessionsByDate = mapOf(
		endDate to 2,
		endDate.minus(1, DateTimeUnit.DAY) to 1,
		endDate.minus(3, DateTimeUnit.DAY) to 3,
		selectedDate to 2,
		endDate.minus(10, DateTimeUnit.DAY) to 1,
		endDate.minus(14, DateTimeUnit.DAY) to 4
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			HeatmapAnalyticsWidget(
				sessionsByDate = sessionsByDate,
				startDate = startDate,
				endDate = endDate,
				firstDayOfWeek = DayOfWeek.MONDAY,
				selection = selectedDate,
				onDaySelected = {}
			)
		}
	}
}

@Preview(showBackground = true, name = "Sunday First Day")
@Composable
fun HeatmapAnalyticsWidgetSundayFirstPreview() {
	val endDate = LocalDate.now()
	val startDate = endDate.minus(90, DateTimeUnit.DAY)
	val random = Random(456)
	val sessionsByDate = (0..90).mapNotNull { daysAgo ->
		val date = endDate.minus(daysAgo, DateTimeUnit.DAY)
		if (random.nextFloat() > 0.5f) {
			date to random.nextInt(1, 4)
		} else {
			null
		}
	}.toMap()
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			HeatmapAnalyticsWidget(
				sessionsByDate = sessionsByDate,
				startDate = startDate,
				endDate = endDate,
				firstDayOfWeek = DayOfWeek.SUNDAY,
				selection = null,
				onDaySelected = {}
			)
		}
	}
}

@Preview(showBackground = true, name = "Recent Activity Only")
@Composable
fun HeatmapAnalyticsWidgetRecentOnlyPreview() {
	val endDate = LocalDate.now()
	val startDate = endDate.minus(90, DateTimeUnit.DAY)
	val sessionsByDate = (0..14).map { daysAgo ->
		endDate.minus(daysAgo, DateTimeUnit.DAY) to (daysAgo % 3) + 1
	}.toMap()
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			HeatmapAnalyticsWidget(
				sessionsByDate = sessionsByDate,
				startDate = startDate,
				endDate = endDate,
				firstDayOfWeek = DayOfWeek.MONDAY,
				selection = null,
				onDaySelected = {}
			)
		}
	}
}
