package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.kizitonwose.calendar.compose.CalendarLayoutInfo
import com.kizitonwose.calendar.compose.HeatMapCalendar
import com.kizitonwose.calendar.compose.heatmapcalendar.HeatMapCalendarState
import com.kizitonwose.calendar.compose.heatmapcalendar.HeatMapWeek
import com.kizitonwose.calendar.compose.heatmapcalendar.rememberHeatMapCalendarState
import com.kizitonwose.calendar.core.CalendarDay
import com.kizitonwose.calendar.core.CalendarMonth
import com.kizitonwose.calendar.core.now
import kotlinx.coroutines.launch
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.YearMonth
import kotlinx.datetime.minus
import kotlinx.datetime.yearMonth
import org.jetbrains.compose.resources.stringResource
import org.koin.compose.viewmodel.koinViewModel
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.analytics_hours_minutes
import tabletennistracker.composeapp.generated.resources.analytics_summary
import tabletennistracker.composeapp.generated.resources.analytics_total_sessions
import tabletennistracker.composeapp.generated.resources.analytics_total_time
import tabletennistracker.composeapp.generated.resources.analytics_win_loss
import tabletennistracker.composeapp.generated.resources.analytics_win_rate
import xyz.tleskiv.tt.ui.bottomsheets.DaySessionsBottomSheet
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.util.ext.displayText
import xyz.tleskiv.tt.util.ext.shortDisplayText
import xyz.tleskiv.tt.util.ui.HeatMapLevel
import xyz.tleskiv.tt.util.ui.toColor
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel
import xyz.tleskiv.tt.viewmodel.analytics.SummaryStats

@Composable
fun AnalyticsScreen(
	viewModel: AnalyticsScreenViewModel = koinViewModel(),
	onNavigateToSession: (String) -> Unit = {}
) {
	val sessionsByDate by viewModel.sessionsByDate.collectAsState()
	val sessionsListByDate by viewModel.sessionsListByDate.collectAsState()
	val firstDayOfWeek by viewModel.firstDayOfWeek.collectAsState()
	val summaryStats by viewModel.summaryStats.collectAsState()
	val endDate = remember(sessionsByDate) {
		sessionsByDate.keys.maxOrNull() ?: LocalDate.now()
	}
	val startDate = remember(sessionsByDate, endDate) {
		val minDate = sessionsByDate.keys.minOrNull()
		val rangeStart = endDate.minus(12, DateTimeUnit.MONTH)
		if (minDate != null && minDate < rangeStart) minDate else rangeStart
	}
	val maxCount = remember(sessionsByDate) {
		sessionsByDate.values.maxOrNull() ?: 0
	}
	val data = remember(sessionsByDate, maxCount) {
		sessionsByDate.mapValues { (_, count) -> levelForCount(count, maxCount) }
	}
	var selection by remember { mutableStateOf<LocalDate?>(null) }
	val sheetState = rememberModalBottomSheetState()
	val scope = rememberCoroutineScope()

	selection?.let { selectedDate ->
		DaySessionsBottomSheet(
			date = selectedDate,
			sessions = sessionsListByDate[selectedDate] ?: emptyList(),
			sheetState = sheetState,
			onDismiss = { selection = null },
			onSessionClick = { session ->
				scope.launch { sheetState.hide() }.invokeOnCompletion {
					selection = null
					onNavigateToSession(session.id.toString())
				}
			}
		)
	}

	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surface)
			.padding(16.dp)
	) {
		Text(
			text = stringResource(Res.string.analytics_summary),
			style = MaterialTheme.typography.titleSmall,
			fontWeight = FontWeight.SemiBold,
			color = MaterialTheme.colorScheme.primary,
			modifier = Modifier.padding(start = 4.dp, bottom = 8.dp)
		)
		SummaryCard(summaryStats)
		Spacer(modifier = Modifier.height(24.dp))
		// Key on firstDayOfWeek to recreate calendar state when the setting changes
		val state = key(firstDayOfWeek) {
			rememberHeatMapCalendarState(
				startMonth = startDate.yearMonth,
				endMonth = endDate.yearMonth,
				firstVisibleMonth = endDate.yearMonth,
				firstDayOfWeek = firstDayOfWeek
			)
		}
		Text(
			text = "Training sessions heatmap",
			style = MaterialTheme.typography.titleSmall,
			fontWeight = FontWeight.SemiBold,
			color = MaterialTheme.colorScheme.primary,
			modifier = Modifier.padding(start = 4.dp, bottom = 8.dp)
		)
		ContentCard {
			Column {
				HeatMapCalendar(
					modifier = Modifier.padding(start = 16.dp, top = 16.dp, bottom = 10.dp),
					state = state,
					contentPadding = PaddingValues(end = 0.dp),
					dayContent = { day, week ->
						Day(
							day = day,
							startDate = startDate,
							endDate = endDate,
							week = week,
							level = data[day.date] ?: HeatMapLevel.Zero,
							isSelected = day.date == selection
						) { clicked ->
							selection = clicked
						}
					},
					weekHeader = { WeekHeader(it) },
					monthHeader = { MonthHeader(it, endDate, state) }
				)
				HeatMapLegend(modifier = Modifier.padding(start = 16.dp, end = 16.dp, bottom = 16.dp))
			}
		}
	}
}

private val daySize = 18.dp

@Composable
private fun Day(
	day: CalendarDay,
	startDate: LocalDate,
	endDate: LocalDate,
	week: HeatMapWeek,
	level: HeatMapLevel,
	isSelected: Boolean,
	onClick: (LocalDate) -> Unit
) {
	val weekDates = week.days.map { it.date }
	if (day.date in startDate..endDate) {
		LevelBox(color = level.toColor(), isSelected = isSelected) { onClick(day.date) }
	} else if (weekDates.contains(startDate)) {
		LevelBox(color = Color.Transparent)
	}
}

@Composable
private fun LevelBox(color: Color, isSelected: Boolean = false, onClick: (() -> Unit)? = null) {
	Box(
		modifier = Modifier
			.size(daySize)
			.padding(2.dp)
			.clip(MaterialTheme.shapes.extraSmall)
			.then(
				if (isSelected) Modifier.border(
					2.dp,
					MaterialTheme.colorScheme.primary,
					MaterialTheme.shapes.extraSmall
				) else Modifier
			)
			.background(color = color)
			.clickable(enabled = onClick != null) { onClick?.invoke() }
	)
}

private fun levelForCount(count: Int, maxCount: Int): HeatMapLevel {
	if (count <= 0 || maxCount <= 0) return HeatMapLevel.Zero
	val ratio = count.toFloat() / maxCount.toFloat()
	return when {
		ratio <= 0.25f -> HeatMapLevel.One
		ratio <= 0.5f -> HeatMapLevel.Two
		ratio <= 0.75f -> HeatMapLevel.Three
		else -> HeatMapLevel.Four
	}
}

@Composable
private fun WeekHeader(dayOfWeek: DayOfWeek) {
	Box(
		modifier = Modifier
			.height(daySize)
			.padding(horizontal = 4.dp)
	) {
		Text(
			text = dayOfWeek.displayText(),
			modifier = Modifier.align(Alignment.Center),
			style = MaterialTheme.typography.labelSmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}

@Composable
private fun MonthHeader(
	calendarMonth: CalendarMonth,
	endDate: LocalDate,
	state: HeatMapCalendarState
) {
	val density = LocalDensity.current
	val firstFullyVisibleMonth by remember {
		derivedStateOf { getMonthWithYear(state.layoutInfo, daySize, density) }
	}
	if (calendarMonth.weekDays.first().first().date <= endDate) {
		val month = calendarMonth.yearMonth
		val title = if (month == firstFullyVisibleMonth) {
			month.displayText(short = true)
		} else {
			month.month.displayText()
		}
		Box(
			modifier = Modifier
				.fillMaxWidth()
				.padding(bottom = 1.dp, start = 2.dp)
		) {
			Text(
				text = title,
				style = MaterialTheme.typography.labelSmall,
				color = MaterialTheme.colorScheme.onSurface
			)
		}
	}
}

private fun getMonthWithYear(
	layoutInfo: CalendarLayoutInfo,
	daySize: Dp,
	density: Density
): YearMonth? {
	val visibleItemsInfo = layoutInfo.visibleMonthsInfo
	return when {
		visibleItemsInfo.isEmpty() -> null
		visibleItemsInfo.count() == 1 -> visibleItemsInfo.first().month.yearMonth
		else -> {
			val firstItem = visibleItemsInfo.first()
			val daySizePx = with(density) { daySize.toPx() }
			if (
				firstItem.size < daySizePx * 3 ||
				firstItem.offset < layoutInfo.viewportStartOffset &&
				(layoutInfo.viewportStartOffset - firstItem.offset > daySizePx)
			) {
				visibleItemsInfo[1].month.yearMonth
			} else {
				firstItem.month.yearMonth
			}
		}
	}
}

@Composable
private fun YearMonth.displayText(short: Boolean): String {
	val monthText = if (short) month.shortDisplayText() else month.displayText()
	return "$monthText $year"
}

@Composable
private fun HeatMapLegend(modifier: Modifier = Modifier) {
	Row(
		modifier = modifier.fillMaxWidth(),
		horizontalArrangement = Arrangement.End,
		verticalAlignment = Alignment.CenterVertically
	) {
		Text(
			text = "Less",
			style = MaterialTheme.typography.labelSmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
		Spacer(modifier = Modifier.width(4.dp))
		HeatMapLevel.entries.forEach { level ->
			Box(
				modifier = Modifier
					.size(12.dp)
					.clip(MaterialTheme.shapes.extraSmall)
					.background(level.toColor())
			)
			Spacer(modifier = Modifier.width(2.dp))
		}
		Spacer(modifier = Modifier.width(2.dp))
		Text(
			text = "More",
			style = MaterialTheme.typography.labelSmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}

@Composable
private fun SummaryCard(stats: SummaryStats) {
	val hours = stats.totalTrainingMinutes / 60
	val minutes = stats.totalTrainingMinutes % 60
	val timeText = stringResource(Res.string.analytics_hours_minutes, hours, minutes)
	val totalMatches = stats.matchesWon + stats.matchesLost
	val winRate = if (totalMatches > 0) (stats.matchesWon * 100) / totalMatches else 0
	val winRateColor = when {
		totalMatches == 0 -> MaterialTheme.colorScheme.onSurfaceVariant
		winRate >= 60 -> Color(0xFF4CAF50)
		winRate >= 40 -> MaterialTheme.colorScheme.onSurface
		else -> Color(0xFFE53935)
	}

	ContentCard {
		Column(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
			Row(
				modifier = Modifier.fillMaxWidth(),
				horizontalArrangement = Arrangement.SpaceBetween
			) {
				StatBox(
					modifier = Modifier.weight(1f),
					emoji = "🏓",
					value = stats.totalSessions.toString(),
					label = stringResource(Res.string.analytics_total_sessions)
				)
				Spacer(modifier = Modifier.width(12.dp))
				StatBox(
					modifier = Modifier.weight(1f),
					emoji = "⏱️",
					value = timeText,
					label = stringResource(Res.string.analytics_total_time)
				)
			}
			Spacer(modifier = Modifier.height(12.dp))
			Row(
				modifier = Modifier.fillMaxWidth(),
				horizontalArrangement = Arrangement.SpaceBetween
			) {
				StatBox(
					modifier = Modifier.weight(1f),
					emoji = "🏆",
					value = "${stats.matchesWon}W - ${stats.matchesLost}L",
					label = stringResource(Res.string.analytics_win_loss)
				)
				Spacer(modifier = Modifier.width(12.dp))
				StatBox(
					modifier = Modifier.weight(1f),
					emoji = "📈",
					value = "$winRate%",
					label = stringResource(Res.string.analytics_win_rate),
					valueColor = winRateColor
				)
			}
		}
	}
}

@Composable
private fun StatBox(
	modifier: Modifier = Modifier,
	emoji: String,
	value: String,
	label: String,
	valueColor: Color = MaterialTheme.colorScheme.onSurface
) {
	Column(
		modifier = modifier
			.clip(MaterialTheme.shapes.small)
			.background(MaterialTheme.colorScheme.surfaceContainerHigh)
			.padding(12.dp),
		horizontalAlignment = Alignment.CenterHorizontally
	) {
		Text(
			text = emoji,
			style = MaterialTheme.typography.titleMedium
		)
		Spacer(modifier = Modifier.height(4.dp))
		Text(
			text = value,
			style = MaterialTheme.typography.titleLarge,
			fontWeight = FontWeight.Bold,
			color = valueColor
		)
		Spacer(modifier = Modifier.height(2.dp))
		Text(
			text = label,
			style = MaterialTheme.typography.labelSmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}
