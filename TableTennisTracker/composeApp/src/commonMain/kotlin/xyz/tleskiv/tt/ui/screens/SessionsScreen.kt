package xyz.tleskiv.tt.ui.screens

import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
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
import com.kizitonwose.calendar.core.DayPosition
import com.kizitonwose.calendar.core.OutDateStyle
import com.kizitonwose.calendar.core.WeekDayPosition
import com.kizitonwose.calendar.core.daysOfWeek
import kotlinx.coroutines.launch
import kotlinx.datetime.DatePeriod
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.plus
import kotlinx.datetime.yearMonth
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_add_session
import tabletennistracker.composeapp.generated.resources.ic_add
import tabletennistracker.composeapp.generated.resources.nav_sessions
import tabletennistracker.composeapp.generated.resources.sessions_empty
import tabletennistracker.composeapp.generated.resources.sessions_month_mode
import tabletennistracker.composeapp.generated.resources.sessions_week_mode
import xyz.tleskiv.tt.ui.nav.navdisplay.RegisterTopAppBarCleanup
import xyz.tleskiv.tt.ui.nav.navdisplay.TopAppBarState
import xyz.tleskiv.tt.ui.widgets.SessionListItem
import xyz.tleskiv.tt.util.ext.displayText
import xyz.tleskiv.tt.util.ext.formatDateHeader
import xyz.tleskiv.tt.util.ext.formatFullDate
import xyz.tleskiv.tt.util.ext.formatMonthYear
import xyz.tleskiv.tt.viewmodel.sessions.SessionUiModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel

private const val DATE_LIST_RANGE_DAYS = 365

@Composable
fun SessionsScreen(
	viewModel: SessionsScreenViewModel,
	onNavigateToDetails: (String) -> Unit = {},
	onAddSession: (LocalDate) -> Unit = {},
	topAppBarState: TopAppBarState? = null
) {
	val inputData = viewModel.inputData
	val sessionsByDate by viewModel.sessions.collectAsState()
	val firstDayOfWeek by viewModel.firstDayOfWeek.collectAsState()
	val highlightCurrentDay by viewModel.highlightCurrentDay.collectAsState()

	val listState = rememberLazyListState(initialFirstVisibleItemIndex = inputData.initialListIndex)
	val coroutineScope = rememberCoroutineScope()

	// Key on firstDayOfWeek to recreate calendar states when the setting changes
	val monthState = key(firstDayOfWeek) {
		rememberCalendarState(
			startMonth = inputData.startYearMonth,
			endMonth = inputData.endYearMonth,
			firstVisibleMonth = inputData.currentYearMonth,
			firstDayOfWeek = firstDayOfWeek,
			outDateStyle = OutDateStyle.EndOfGrid
		)
	}

	val weekState = key(firstDayOfWeek) {
		rememberWeekCalendarState(
			startDate = LocalDate(inputData.startYearMonth.year, inputData.startYearMonth.month, 1),
			endDate = LocalDate(inputData.endYearMonth.year, inputData.endYearMonth.month, 28),
			firstVisibleWeekDate = inputData.currentDate,
			firstDayOfWeek = firstDayOfWeek
		)
	}

	val visibleYearMonth = if (inputData.isWeekMode) {
		weekState.firstVisibleWeek.days.first().date.yearMonth
	} else {
		monthState.firstVisibleMonth.yearMonth
	}

	val subtitleText = visibleYearMonth.formatMonthYear()
	topAppBarState?.let { state ->
		RegisterTopAppBarCleanup(state)
		state.title = {
			Column {
				Text(
					text = stringResource(Res.string.nav_sessions),
					style = MaterialTheme.typography.titleMedium,
					fontWeight = FontWeight.Bold
				)
				Text(
					text = subtitleText,
					style = MaterialTheme.typography.bodySmall,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}
		}
		state.actions = {
			WeekMonthToggle(
				isWeekMode = inputData.isWeekMode,
				onToggle = {
					coroutineScope.launch {
						if (inputData.isWeekMode) {
							monthState.scrollToMonth(inputData.selectedDate.yearMonth)
						} else {
							weekState.scrollToWeek(inputData.selectedDate)
						}
						inputData.isWeekMode = !inputData.isWeekMode
					}
				}
			)
		}
	}

	// Calendar → List: scroll when user taps a date on the calendar
	fun scrollListToDate(date: LocalDate) {
		val targetIndex = (date.toEpochDays() - inputData.startDate.toEpochDays()).toInt()
		if (targetIndex in 0 until (DATE_LIST_RANGE_DAYS * 2 + 1)) {
			coroutineScope.launch {
				listState.scrollToItem(targetIndex)
			}
		}
	}

	// List → Calendar: When user scrolls the list, update the selected date
	LaunchedEffect(listState, weekState, monthState) {
		snapshotFlow { listState.firstVisibleItemIndex }
			.collect { index ->
				val visibleDate = inputData.startDate.plus(DatePeriod(days = index))
				if (visibleDate != inputData.selectedDate) {
					inputData.selectedDate = visibleDate
				}
				if (inputData.isWeekMode) {
					weekState.animateScrollToWeek(visibleDate)
				} else {
					monthState.animateScrollToMonth(visibleDate.yearMonth)
				}
			}
	}

	BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
		val isLandscape = maxWidth > maxHeight
		Column(
			modifier = Modifier
				.fillMaxSize()
				.background(MaterialTheme.colorScheme.surface)
		) {
			CalendarSection(
				currentDate = inputData.currentDate,
				selectedDate = inputData.selectedDate,
				sessionsByDate = sessionsByDate,
				isWeekMode = inputData.isWeekMode,
				monthState = monthState,
				weekState = weekState,
				firstDayOfWeek = firstDayOfWeek,
				highlightCurrentDay = highlightCurrentDay,
				onDateSelected = {
					inputData.selectedDate = it
					scrollListToDate(it)
				},
				isLandscape = isLandscape
			)

			SessionsListContent(
				currentDate = inputData.currentDate,
				startDate = inputData.startDate,
				listState = listState,
				sessionsByDate = sessionsByDate,
				onNavigateToDetails = onNavigateToDetails
			)
		}

		AddSessionFab(
			onClick = { onAddSession(inputData.selectedDate) },
			modifier = Modifier.align(Alignment.BottomEnd)
		)
	}
}

@Composable
private fun CalendarSection(
	currentDate: LocalDate,
	selectedDate: LocalDate,
	sessionsByDate: Map<LocalDate, List<SessionUiModel>>,
	isWeekMode: Boolean,
	monthState: CalendarState,
	weekState: WeekCalendarState,
	firstDayOfWeek: DayOfWeek,
	highlightCurrentDay: Boolean,
	onDateSelected: (LocalDate) -> Unit,
	isLandscape: Boolean
) {
	Surface(
		color = MaterialTheme.colorScheme.primaryContainer,
		tonalElevation = 2.dp
	) {
		Column(modifier = Modifier.fillMaxWidth()) {
			DaysOfWeekHeader(firstDayOfWeek = firstDayOfWeek)

			Spacer(modifier = Modifier.height(8.dp))

			AnimatedCalendarContainer(
				selectedDate = selectedDate,
				currentDate = currentDate,
				isWeekMode = isWeekMode,
				monthState = monthState,
				weekState = weekState,
				sessionsByDate = sessionsByDate,
				highlightCurrentDay = highlightCurrentDay,
				onDateSelected = onDateSelected,
				isLandscape = isLandscape
			)
		}
	}
}

@Composable
fun WeekMonthToggle(
	isWeekMode: Boolean,
	onToggle: () -> Unit,
	modifier: Modifier = Modifier
) {
	Row(
		modifier = modifier
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
private fun DaysOfWeekHeader(firstDayOfWeek: DayOfWeek) {
	val daysOfWeekList = remember(firstDayOfWeek) { daysOfWeek(firstDayOfWeek = firstDayOfWeek) }

	Row(modifier = Modifier.fillMaxWidth().padding(top = 8.dp)) {
		daysOfWeekList.forEach { dayOfWeek ->
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
	sessionsByDate: Map<LocalDate, List<SessionUiModel>>,
	highlightCurrentDay: Boolean,
	onDateSelected: (LocalDate) -> Unit,
	isLandscape: Boolean
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
			sessionsByDate = sessionsByDate,
			highlightCurrentDay = highlightCurrentDay,
			onDateSelected = onDateSelected,
			isLandscape = isLandscape
		)

		WeekCalendarView(
			isWeekMode = isWeekMode,
			state = weekState,
			selectedDate = selectedDate,
			currentDate = currentDate,
			sessionsByDate = sessionsByDate,
			highlightCurrentDay = highlightCurrentDay,
			onDateSelected = onDateSelected,
			onSizeChanged = { weekCalendarSize = it },
			isLandscape = isLandscape
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
	sessionsByDate: Map<LocalDate, List<SessionUiModel>>,
	highlightCurrentDay: Boolean,
	onDateSelected: (LocalDate) -> Unit,
	isLandscape: Boolean
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
				isToday = highlightCurrentDay && day.date == currentDate,
				isInCurrentMonth = day.position == DayPosition.MonthDate,
				sessionCount = sessionsByDate[day.date]?.size ?: 0,
				onClick = onDateSelected,
				isLandscape = isLandscape
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
	sessionsByDate: Map<LocalDate, List<SessionUiModel>>,
	highlightCurrentDay: Boolean,
	onDateSelected: (LocalDate) -> Unit,
	onSizeChanged: (DpSize) -> Unit,
	isLandscape: Boolean
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
				isToday = highlightCurrentDay && day.date == currentDate,
				isInCurrentMonth = day.position == WeekDayPosition.RangeDate,
				sessionCount = sessionsByDate[day.date]?.size ?: 0,
				onClick = onDateSelected,
				isLandscape = isLandscape
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
	sessionCount: Int,
	onClick: (LocalDate) -> Unit,
	isLandscape: Boolean
) {
	val backgroundColor = when {
		isSelected -> MaterialTheme.colorScheme.primary
		isToday -> MaterialTheme.colorScheme.primary.copy(alpha = 0.25f)
		else -> Color.Transparent
	}
	val textColor = when {
		isSelected -> MaterialTheme.colorScheme.onPrimary
		isInCurrentMonth -> MaterialTheme.colorScheme.onPrimaryContainer
		else -> MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.4f)
	}
	val dotColor = if (isSelected) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.tertiary

	Box(
		modifier = Modifier
			.aspectRatio(if (isLandscape) 2f else 1f)
			.padding(4.dp)
			.clip(CircleShape)
			.background(backgroundColor)
			.clickable { onClick(date) },
		contentAlignment = Alignment.Center
	) {
		Column(horizontalAlignment = Alignment.CenterHorizontally) {
			Text(
				text = date.day.toString(),
				fontSize = 14.sp,
				fontWeight = if (isToday || isSelected) FontWeight.Bold else FontWeight.Normal,
				color = textColor
			)
			if (sessionCount > 0) {
				Row(horizontalArrangement = Arrangement.spacedBy(2.dp)) {
					repeat(minOf(sessionCount, 4)) {
						Box(modifier = Modifier.size(4.dp).background(dotColor, CircleShape))
					}
				}
			}
		}
	}
}

@Composable
private fun SessionsListContent(
	currentDate: LocalDate,
	startDate: LocalDate,
	listState: LazyListState,
	sessionsByDate: Map<LocalDate, List<SessionUiModel>>,
	onNavigateToDetails: (String) -> Unit
) {
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
				SessionListItem(
					session = session,
					onClick = { onSessionClick(session.id.toString()) },
					modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
				)
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
private fun AddSessionFab(onClick: () -> Unit, modifier: Modifier = Modifier) {
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
