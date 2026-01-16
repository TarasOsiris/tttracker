package xyz.tleskiv.tt.ui.screens

import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
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
import kotlinx.datetime.*
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.*
import xyz.tleskiv.tt.util.ext.displayText
import xyz.tleskiv.tt.util.ext.formatDateHeader
import xyz.tleskiv.tt.util.ext.formatFullDate
import xyz.tleskiv.tt.util.ext.formatMonthYear
import xyz.tleskiv.tt.util.labelRes
import xyz.tleskiv.tt.util.ui.getRpeColor
import xyz.tleskiv.tt.viewmodel.sessions.SessionUiModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel

private val FIRST_DAY_OF_WEEK = DayOfWeek.MONDAY
private const val CALENDAR_RANGE_MONTHS = 12
private const val DATE_LIST_RANGE_DAYS = 365

@Composable
fun SessionsScreen(
	viewModel: SessionsScreenViewModel,
	onNavigateToDetails: (String) -> Unit = {},
	onAddSession: (LocalDate) -> Unit = {}
) {
	val currentDate = remember { LocalDate.now() }
	var selectedDate by remember { mutableStateOf(currentDate) }
	val sessionsByDate by viewModel.sessions.collectAsState()

	val startDate = remember(currentDate) {
		currentDate.minus(DatePeriod(days = DATE_LIST_RANGE_DAYS))
	}

	val initialIndex = remember(currentDate, startDate) {
		(currentDate.toEpochDays() - startDate.toEpochDays()).toInt()
	}

	val listState = rememberLazyListState(initialFirstVisibleItemIndex = initialIndex)
	val coroutineScope = rememberCoroutineScope()

	LaunchedEffect(selectedDate) {
		val targetIndex = (selectedDate.toEpochDays() - startDate.toEpochDays()).toInt()
		if (targetIndex in 0 until (DATE_LIST_RANGE_DAYS * 2 + 1)) {
			coroutineScope.launch {
				listState.animateScrollToItem(targetIndex)
			}
		}
	}

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

			SessionsListContent(
				currentDate = currentDate,
				selectedDate = selectedDate,
				listState = listState,
				sessionsByDate = sessionsByDate,
				onNavigateToDetails = onNavigateToDetails
			)
		}

		AddSessionFab(
			onClick = { onAddSession(selectedDate) },
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
		firstDayOfWeek = daysOfWeek.first(),
		outDateStyle = OutDateStyle.EndOfGrid
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
	val visibleYearMonth = if (isWeekMode) {
		weekState.firstVisibleWeek.days.first().date.yearMonth
	} else {
		monthState.firstVisibleMonth.yearMonth
	}

	Row(
		modifier = Modifier
			.fillMaxWidth()
			.padding(horizontal = 16.dp, vertical = 8.dp),
		horizontalArrangement = Arrangement.SpaceBetween,
		verticalAlignment = Alignment.CenterVertically
	) {
		Text(
			text = visibleYearMonth.formatMonthYear(),
			style = MaterialTheme.typography.titleLarge,
			fontWeight = FontWeight.Bold,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)

		WeekMonthToggle(
			isWeekMode = isWeekMode,
			onToggle = {
				coroutineScope.launch {
					if (isWeekMode) {
						monthState.scrollToMonth(selectedDate.yearMonth)
					} else {
						weekState.scrollToWeek(selectedDate)
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
		modifier = Modifier
			.clip(MaterialTheme.shapes.medium)
			.background(MaterialTheme.colorScheme.surfaceVariant)
	) {
		SegmentButton(
			text = stringResource(Res.string.sessions_week_mode),
			isSelected = isWeekMode,
			onClick = { if (!isWeekMode) onToggle() }
		)
		SegmentButton(
			text = stringResource(Res.string.sessions_month_mode),
			isSelected = !isWeekMode,
			onClick = { if (isWeekMode) onToggle() }
		)
	}
}

@Composable
private fun SegmentButton(
	text: String,
	isSelected: Boolean,
	onClick: () -> Unit
) {
	val backgroundColor = if (isSelected) {
		MaterialTheme.colorScheme.primary
	} else {
		MaterialTheme.colorScheme.surfaceVariant
	}
	val textColor = if (isSelected) {
		MaterialTheme.colorScheme.onPrimary
	} else {
		MaterialTheme.colorScheme.onSurfaceVariant
	}

	Box(
		modifier = Modifier
			.clip(MaterialTheme.shapes.medium)
			.background(backgroundColor)
			.clickable(
				interactionSource = remember { MutableInteractionSource() },
				indication = null,
				onClick = onClick
			)
			.padding(horizontal = 16.dp, vertical = 8.dp),
		contentAlignment = Alignment.Center
	) {
		Text(
			text = text,
			style = MaterialTheme.typography.labelMedium,
			fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Normal,
			color = textColor
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
	val weeksInMonth = 6

	val monthCalendarHeight by animateDpAsState(
		targetValue = if (isWeekMode) {
			weekCalendarSize.height
		} else {
			weekCalendarSize.height * weeksInMonth
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
		calendarScrollPaged = true,
		userScrollEnabled = !isWeekMode,
		dayContent = { day ->
			DayCell(
				date = day.date,
				isSelected = day.date == selectedDate,
				isToday = day.date == currentDate,
				isInCurrentMonth = day.position == DayPosition.MonthDate,
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
		userScrollEnabled = isWeekMode,
		dayContent = { day ->
			DayCell(
				date = day.date,
				isSelected = day.date == selectedDate,
				isToday = day.date == currentDate,
				isInCurrentMonth = day.position == WeekDayPosition.RangeDate,
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
	isInCurrentMonth: Boolean,
	onClick: (LocalDate) -> Unit
) {
	val backgroundColor = when {
		isSelected -> MaterialTheme.colorScheme.primary
		else -> MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0f)
	}
	val textColor = when {
		isSelected -> MaterialTheme.colorScheme.onPrimary
		isToday -> MaterialTheme.colorScheme.primary
		isInCurrentMonth -> MaterialTheme.colorScheme.onPrimaryContainer
		else -> MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.4f)
	}

	Box(
		modifier = Modifier
			.aspectRatio(1f)
			.padding(4.dp)
			.clip(CircleShape)
			.background(backgroundColor)
			.clickable { onClick(date) },
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
private fun SessionsListContent(
	currentDate: LocalDate,
	selectedDate: LocalDate,
	listState: LazyListState,
	sessionsByDate: Map<LocalDate, List<SessionUiModel>>,
	onNavigateToDetails: (String) -> Unit
) {
	val startDate = remember(currentDate) {
		currentDate.minus(DatePeriod(days = DATE_LIST_RANGE_DAYS))
	}
	val totalDays = remember { DATE_LIST_RANGE_DAYS * 2 + 1 }

	LazyColumn(
		state = listState,
		modifier = Modifier.fillMaxSize(),
		contentPadding = PaddingValues(bottom = 88.dp)
	) {
		items(
			count = totalDays,
			key = { index -> startDate.plus(DatePeriod(days = index)).toEpochDays() }
		) { index ->
			val date = remember(index) { startDate.plus(DatePeriod(days = index)) }
			val sessions = sessionsByDate[date] ?: emptyList()
			DateSection(
				date = date,
				currentDate = currentDate,
				sessions = sessions,
				onSessionClick = onNavigateToDetails
			)
		}
	}
}

@Composable
private fun DateSection(
	date: LocalDate,
	currentDate: LocalDate,
	sessions: List<SessionUiModel>,
	onSessionClick: (String) -> Unit
) {
	Column(modifier = Modifier.fillMaxWidth()) {
		DateHeader(date = date, currentDate = currentDate)

		if (sessions.isEmpty()) {
			NoSessionsPlaceholder()
		} else {
			sessions.forEach { session ->
				SessionItem(session = session, onClick = { onSessionClick(session.id.toString()) })
			}
		}
	}
}

@Composable
private fun DateHeader(
	date: LocalDate,
	currentDate: LocalDate
) {
	val dateText = date.formatDateHeader(currentDate)
	val isToday = date == currentDate

	Surface(
		modifier = Modifier.fillMaxWidth(),
		color = MaterialTheme.colorScheme.surface
	) {
		Row(
			modifier = Modifier
				.fillMaxWidth()
				.padding(horizontal = 16.dp, vertical = 12.dp),
			verticalAlignment = Alignment.CenterVertically
		) {
			Box(
				modifier = Modifier
					.size(40.dp)
					.background(
						color = if (isToday) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surfaceVariant,
						shape = RoundedCornerShape(8.dp)
					),
				contentAlignment = Alignment.Center
			) {
				Text(
					text = date.day.toString(),
					style = MaterialTheme.typography.titleMedium,
					fontWeight = FontWeight.Bold,
					color = if (isToday) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurfaceVariant
				)
			}

			Spacer(modifier = Modifier.width(12.dp))

			Column {
				Text(
					text = dateText,
					style = MaterialTheme.typography.titleSmall,
					fontWeight = if (isToday) FontWeight.Bold else FontWeight.Medium,
					color = if (isToday) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurface
				)
				Text(
					text = date.formatFullDate(),
					style = MaterialTheme.typography.bodySmall,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}
		}
	}

	HorizontalDivider(
		color = MaterialTheme.colorScheme.outlineVariant,
		thickness = 0.5.dp
	)
}

@Composable
private fun SessionItem(session: SessionUiModel, onClick: () -> Unit) {
	Surface(
		modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp).clickable(onClick = onClick),
		shape = RoundedCornerShape(12.dp),
		color = MaterialTheme.colorScheme.surfaceContainerLow,
		tonalElevation = 1.dp
	) {
		Row(
			modifier = Modifier.fillMaxWidth().padding(12.dp),
			verticalAlignment = Alignment.CenterVertically
		) {
			Box(
				modifier = Modifier
					.width(4.dp)
					.height(40.dp)
					.background(color = MaterialTheme.colorScheme.primary, shape = RoundedCornerShape(2.dp))
			)

			Spacer(modifier = Modifier.width(12.dp))

			Column(modifier = Modifier.weight(1f)) {
				Text(
					text = session.sessionType?.labelRes()?.let { stringResource(it) }
						?: stringResource(Res.string.session_default_title),
					style = MaterialTheme.typography.bodyLarge,
					fontWeight = FontWeight.Medium,
					color = MaterialTheme.colorScheme.onSurface
				)
				Spacer(modifier = Modifier.height(2.dp))
				Text(
					text = stringResource(Res.string.session_duration_format, session.durationMinutes),
					style = MaterialTheme.typography.bodySmall,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}

			Box(
				modifier = Modifier
					.size(32.dp)
					.background(color = MaterialTheme.colorScheme.surfaceContainerHigh, shape = CircleShape),
				contentAlignment = Alignment.Center
			) {
				Text(
					text = session.rpe.toString(),
					style = MaterialTheme.typography.labelMedium,
					fontWeight = FontWeight.Bold,
					color = getRpeColor(session.rpe)
				)
			}
		}
	}
}

@Composable
private fun NoSessionsPlaceholder() {
	Box(
		modifier = Modifier
			.fillMaxWidth()
			.padding(horizontal = 16.dp, vertical = 16.dp)
	) {
		Text(
			text = stringResource(Res.string.sessions_empty),
			style = MaterialTheme.typography.bodyMedium,
			color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f)
		)
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
			contentDescription = stringResource(Res.string.action_add_session)
		)
	}
}
