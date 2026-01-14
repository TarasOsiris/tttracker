package xyz.tleskiv.tt.ui.screens

import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.zIndex
import com.kizitonwose.calendar.compose.CalendarState
import com.kizitonwose.calendar.compose.VerticalCalendar
import com.kizitonwose.calendar.compose.WeekCalendar
import com.kizitonwose.calendar.compose.rememberCalendarState
import com.kizitonwose.calendar.compose.weekcalendar.WeekCalendarState
import com.kizitonwose.calendar.compose.weekcalendar.rememberWeekCalendarState
import com.kizitonwose.calendar.core.*
import kotlinx.coroutines.launch
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.yearMonth
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.ic_add

private val FIRST_DAY_OF_WEEK = DayOfWeek.MONDAY
private const val CALENDAR_RANGE_MONTHS = 12

@OptIn(kotlin.time.ExperimentalTime::class)
@Composable
fun SessionsScreen(
	onNavigateToDetails: (String) -> Unit = {},
	onAddSession: () -> Unit = {}
) {
	val currentDate = remember { LocalDate.now() }
	var selectedDate by remember { mutableStateOf(currentDate) }

	Box(modifier = Modifier.fillMaxSize()) {
		Column(
			modifier = Modifier
				.fillMaxSize()
				.background(MaterialTheme.colorScheme.surface)
		) {
			CalendarSection(
				currentDate = currentDate,
				selectedDate = selectedDate,
				onDateSelected = { selectedDate = it }
			)

			SessionsContent(
				selectedDate = selectedDate,
				onNavigateToDetails = onNavigateToDetails
			)
		}

		AddSessionFab(
			onClick = onAddSession,
			modifier = Modifier.align(Alignment.BottomEnd)
		)
	}
}

@Composable
private fun CalendarSection(
	currentDate: LocalDate,
	selectedDate: LocalDate,
	onDateSelected: (LocalDate) -> Unit
) {
	val daysOfWeek = remember { daysOfWeek() }
	val currentYearMonth = remember { currentDate.yearMonth }
	val startYearMonth = remember { currentYearMonth.minusMonths(CALENDAR_RANGE_MONTHS) }
	val endYearMonth = remember { currentYearMonth.plusMonths(CALENDAR_RANGE_MONTHS) }

	var isWeekMode by remember { mutableStateOf(true) }

	val monthState = rememberCalendarState(
		startMonth = startYearMonth,
		endMonth = endYearMonth,
		firstVisibleMonth = currentYearMonth,
		firstDayOfWeek = daysOfWeek.first()
	)

	val weekState = rememberWeekCalendarState(
		startDate = LocalDate(startYearMonth.year, startYearMonth.month, 1),
		endDate = LocalDate(endYearMonth.year, endYearMonth.month, 28),
		firstVisibleWeekDate = currentDate,
		firstDayOfWeek = daysOfWeek.first()
	)

	Surface(
		color = MaterialTheme.colorScheme.primaryContainer,
		tonalElevation = 2.dp
	) {
		Column(modifier = Modifier.fillMaxWidth()) {
			CalendarHeader(
				selectedDate = selectedDate,
				isWeekMode = isWeekMode,
				monthState = monthState,
				weekState = weekState,
				onWeekModeToggle = { isWeekMode = it }
			)

			DaysOfWeekHeader()

			Spacer(modifier = Modifier.height(8.dp))

			AnimatedCalendarContainer(
				selectedDate = selectedDate,
				currentDate = currentDate,
				isWeekMode = isWeekMode,
				monthState = monthState,
				weekState = weekState,
				onDateSelected = onDateSelected
			)
		}
	}
}

@Composable
private fun CalendarHeader(
	selectedDate: LocalDate,
	isWeekMode: Boolean,
	monthState: CalendarState,
	weekState: WeekCalendarState,
	onWeekModeToggle: (Boolean) -> Unit
) {
	val coroutineScope = rememberCoroutineScope()

	Row(
		modifier = Modifier
			.fillMaxWidth()
			.padding(horizontal = 16.dp, vertical = 8.dp),
		horizontalArrangement = Arrangement.SpaceBetween,
		verticalAlignment = Alignment.CenterVertically
	) {
		Text(
			text = formatMonthYear(selectedDate),
			style = MaterialTheme.typography.titleLarge,
			fontWeight = FontWeight.Bold,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)

		WeekMonthToggle(
			isWeekMode = isWeekMode,
			onToggle = {
				coroutineScope.launch {
					if (!isWeekMode) {
						val targetDate = monthState.firstVisibleMonth.weekDays.last().last().date
						weekState.scrollToWeek(targetDate)
					} else {
						val targetMonth = weekState.firstVisibleWeek.days.first().date.yearMonth
						monthState.scrollToMonth(targetMonth)
					}
					onWeekModeToggle(!isWeekMode)
				}
			}
		)
	}
}

@Composable
private fun WeekMonthToggle(
	isWeekMode: Boolean,
	onToggle: () -> Unit
) {
	Row(
		verticalAlignment = Alignment.CenterVertically,
		modifier = Modifier
			.clip(MaterialTheme.shapes.small)
			.clickable(onClick = onToggle)
			.padding(8.dp)
	) {
		Switch(
			checked = !isWeekMode,
			onCheckedChange = null,
			modifier = Modifier.height(20.dp)
		)
		Spacer(modifier = Modifier.width(8.dp))
		Text(
			text = if (isWeekMode) "Week" else "Month",
			style = MaterialTheme.typography.labelMedium,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)
	}
}

@Composable
private fun DaysOfWeekHeader() {
	val daysOfWeek = remember { daysOfWeek(firstDayOfWeek = FIRST_DAY_OF_WEEK) }

	Row(modifier = Modifier.fillMaxWidth()) {
		daysOfWeek.forEach { dayOfWeek ->
			Text(
				text = dayOfWeek.displayText(),
				modifier = Modifier.weight(1f),
				textAlign = TextAlign.Center,
				fontSize = 12.sp,
				fontWeight = FontWeight.Medium,
				color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.7f)
			)
		}
	}
}

@Composable
private fun AnimatedCalendarContainer(
	selectedDate: LocalDate,
	currentDate: LocalDate,
	isWeekMode: Boolean,
	monthState: CalendarState,
	weekState: WeekCalendarState,
	onDateSelected: (LocalDate) -> Unit
) {
	var weekCalendarSize by remember { mutableStateOf(DpSize.Zero) }
	val weeksInVisibleMonth = monthState.firstVisibleMonth.weekDays.count()

	val monthCalendarHeight by animateDpAsState(
		targetValue = if (isWeekMode) {
			weekCalendarSize.height
		} else {
			weekCalendarSize.height * weeksInVisibleMonth
		},
		animationSpec = tween(durationMillis = 250)
	)

	Box(modifier = Modifier.padding(bottom = 12.dp)) {
		MonthCalendarView(
			height = monthCalendarHeight,
			isWeekMode = isWeekMode,
			state = monthState,
			selectedDate = selectedDate,
			currentDate = currentDate,
			onDateSelected = onDateSelected
		)

		WeekCalendarView(
			isWeekMode = isWeekMode,
			state = weekState,
			selectedDate = selectedDate,
			currentDate = currentDate,
			onDateSelected = onDateSelected,
			onSizeChanged = { weekCalendarSize = it }
		)
	}
}

@Composable
private fun MonthCalendarView(
	height: Dp,
	isWeekMode: Boolean,
	state: CalendarState,
	selectedDate: LocalDate,
	currentDate: LocalDate,
	onDateSelected: (LocalDate) -> Unit
) {
	val alpha by animateFloatAsState(if (isWeekMode) 0f else 1f)

	VerticalCalendar(
		modifier = Modifier
			.height(height)
			.alpha(alpha)
			.zIndex(if (isWeekMode) 0f else 1f),
		state = state,
		dayContent = { day ->
			DayCell(
				date = day.date,
				isSelected = day.date == selectedDate,
				isToday = day.date == currentDate,
				isSelectable = day.position == DayPosition.MonthDate,
				onClick = onDateSelected
			)
		}
	)
}

@Composable
private fun WeekCalendarView(
	isWeekMode: Boolean,
	state: WeekCalendarState,
	selectedDate: LocalDate,
	currentDate: LocalDate,
	onDateSelected: (LocalDate) -> Unit,
	onSizeChanged: (DpSize) -> Unit
) {
	val density = LocalDensity.current
	val alpha by animateFloatAsState(if (isWeekMode) 1f else 0f)

	WeekCalendar(
		modifier = Modifier
			.wrapContentHeight()
			.onSizeChanged { size ->
				val dpSize = density.run { DpSize(size.width.toDp(), size.height.toDp()) }
				onSizeChanged(dpSize)
			}
			.alpha(alpha)
			.zIndex(if (isWeekMode) 1f else 0f),
		state = state,
		dayContent = { day ->
			DayCell(
				date = day.date,
				isSelected = day.date == selectedDate,
				isToday = day.date == currentDate,
				isSelectable = day.position == WeekDayPosition.RangeDate,
				onClick = onDateSelected
			)
		}
	)
}

@Composable
private fun DayCell(
	date: LocalDate,
	isSelected: Boolean,
	isToday: Boolean,
	isSelectable: Boolean,
	onClick: (LocalDate) -> Unit
) {
	val backgroundColor = when {
		isSelected -> MaterialTheme.colorScheme.primary
		else -> MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0f)
	}
	val textColor = when {
		isSelected -> MaterialTheme.colorScheme.onPrimary
		isToday -> MaterialTheme.colorScheme.primary
		isSelectable -> MaterialTheme.colorScheme.onPrimaryContainer
		else -> MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.4f)
	}

	Box(
		modifier = Modifier
			.aspectRatio(1f)
			.padding(4.dp)
			.clip(CircleShape)
			.background(backgroundColor)
			.clickable(enabled = isSelectable) { onClick(date) },
		contentAlignment = Alignment.Center
	) {
		Text(
			text = date.day.toString(),
			fontSize = 14.sp,
			fontWeight = if (isToday || isSelected) FontWeight.Bold else FontWeight.Normal,
			color = textColor
		)
	}
}

@Composable
private fun SessionsContent(
	selectedDate: LocalDate,
	onNavigateToDetails: (String) -> Unit
) {
	Column(
		modifier = Modifier
			.fillMaxSize()
			.padding(16.dp),
		horizontalAlignment = Alignment.CenterHorizontally,
		verticalArrangement = Arrangement.Center
	) {
		Text(
			text = "Sessions for ${formatDayMonth(selectedDate)}",
			style = MaterialTheme.typography.titleMedium,
			color = MaterialTheme.colorScheme.onSurface
		)
		Spacer(modifier = Modifier.height(16.dp))
		Text(
			text = "No training sessions on this day",
			style = MaterialTheme.typography.bodyLarge,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
		Spacer(modifier = Modifier.height(24.dp))
		Button(onClick = { onNavigateToDetails("session-123") }) {
			Text("View Session Details")
		}
	}
}

@Composable
private fun AddSessionFab(
	onClick: () -> Unit,
	modifier: Modifier = Modifier
) {
	FloatingActionButton(
		onClick = onClick,
		modifier = modifier.padding(16.dp),
		containerColor = MaterialTheme.colorScheme.primary
	) {
		Icon(
			imageVector = vectorResource(Res.drawable.ic_add),
			contentDescription = "Add Session"
		)
	}
}

private fun DayOfWeek.displayText(): String {
	return name.take(3).lowercase().replaceFirstChar { it.uppercase() }
}

private fun formatMonthYear(date: LocalDate): String {
	val monthName = date.month.name.lowercase().replaceFirstChar { it.uppercase() }
	return "$monthName ${date.year}"
}

private fun formatDayMonth(date: LocalDate): String {
	val monthName = date.month.name.take(3).lowercase().replaceFirstChar { it.uppercase() }
	return "${date.day} $monthName"
}
