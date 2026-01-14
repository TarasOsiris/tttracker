@file:OptIn(ExperimentalTime::class)

package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.kizitonwose.calendar.compose.WeekCalendar
import com.kizitonwose.calendar.compose.weekcalendar.rememberWeekCalendarState
import com.kizitonwose.calendar.core.WeekDayPosition
import com.kizitonwose.calendar.core.daysOfWeek
import com.kizitonwose.calendar.core.now
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.number
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.ic_add
import kotlin.time.ExperimentalTime

@Composable
fun SessionsScreen(
	onNavigateToDetails: (String) -> Unit = {},
	onAddSession: () -> Unit = {}
) {
	val currentDate = remember { LocalDate.now() }
	var selectedDate by remember { mutableStateOf(currentDate) }
	val daysOfWeek = remember { daysOfWeek(firstDayOfWeek = DayOfWeek.MONDAY) }

	val startDate = remember { LocalDate(currentDate.year - 1, currentDate.month.number, 1) }
	val endDate = remember { LocalDate(currentDate.year + 1, currentDate.month.number, 28) }

	val weekState = rememberWeekCalendarState(
		startDate = startDate,
		endDate = endDate,
		firstVisibleWeekDate = currentDate,
		firstDayOfWeek = daysOfWeek.first()
	)

	Box(modifier = Modifier.fillMaxSize()) {
		Column(
			modifier = Modifier
				.fillMaxSize()
				.background(MaterialTheme.colorScheme.surface)
		) {
			// Calendar header
			Surface(
				color = MaterialTheme.colorScheme.primaryContainer,
				tonalElevation = 2.dp
			) {
				Column(modifier = Modifier.fillMaxWidth()) {
					// Month and year title
					Text(
						text = formatMonthYear(selectedDate),
						style = MaterialTheme.typography.titleLarge,
						fontWeight = FontWeight.Bold,
						color = MaterialTheme.colorScheme.onPrimaryContainer,
						modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp)
					)

					// Days of week header
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

					Spacer(modifier = Modifier.height(8.dp))

					// Week calendar
					WeekCalendar(
						state = weekState,
						dayContent = { day ->
							val isSelectable = day.position == WeekDayPosition.RangeDate
							Day(
								date = day.date,
								isSelected = day.date == selectedDate,
								isToday = day.date == currentDate,
								isSelectable = isSelectable,
								onClick = { selectedDate = it }
							)
						},
						modifier = Modifier.padding(bottom = 12.dp)
					)
				}
			}

			// Sessions content
			Column(
				modifier = Modifier
					.fillMaxSize()
					.padding(16.dp),
				horizontalAlignment = Alignment.CenterHorizontally,
				verticalArrangement = Arrangement.Center
			) {
				Text(
					text = "Sessions for ${selectedDate.day} ${
						selectedDate.month.name.take(3).lowercase().replaceFirstChar { it.uppercase() }
					}",
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

		FloatingActionButton(
			onClick = onAddSession,
			modifier = Modifier
				.align(Alignment.BottomEnd)
				.padding(16.dp),
			containerColor = MaterialTheme.colorScheme.primary
		) {
			Icon(
				imageVector = vectorResource(Res.drawable.ic_add),
				contentDescription = "Add Session"
			)
		}
	}
}

@Composable
private fun Day(
	date: LocalDate,
	isSelected: Boolean,
	isToday: Boolean,
	isSelectable: Boolean,
	onClick: (LocalDate) -> Unit
) {
	Box(
		modifier = Modifier
			.aspectRatio(1f)
			.padding(4.dp)
			.clip(CircleShape)
			.background(
				color = when {
					isSelected -> MaterialTheme.colorScheme.primary
					else -> MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0f)
				}
			)
			.clickable(enabled = isSelectable) { onClick(date) },
		contentAlignment = Alignment.Center
	) {
		Text(
			text = date.dayOfMonth.toString(),
			fontSize = 14.sp,
			fontWeight = if (isToday || isSelected) FontWeight.Bold else FontWeight.Normal,
			color = when {
				isSelected -> MaterialTheme.colorScheme.onPrimary
				isToday -> MaterialTheme.colorScheme.primary
				isSelectable -> MaterialTheme.colorScheme.onPrimaryContainer
				else -> MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.4f)
			}
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
