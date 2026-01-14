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
import kotlinx.datetime.*
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.ic_add
import kotlin.time.Clock
import kotlin.time.ExperimentalTime

@Composable
fun SessionsScreen(
	onNavigateToDetails: (String) -> Unit = {},
	onAddSession: () -> Unit = {}
) {
	val currentDate = remember { Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()).date }
	var selectedDate by remember { mutableStateOf(currentDate) }

	val startDate = remember { LocalDate(currentDate.year, currentDate.month.number, 1).minus(DatePeriod(months = 6)) }
	val endDate = remember { LocalDate(currentDate.year, currentDate.month.number, 1).plus(DatePeriod(months = 6)) }

	val weekCalendarState = rememberWeekCalendarState(
		startDate = startDate,
		endDate = endDate,
		firstVisibleWeekDate = currentDate,
	)

	Box(modifier = Modifier.fillMaxSize()) {
		Column(
			modifier = Modifier
				.fillMaxSize()
				.background(MaterialTheme.colorScheme.surface)
		) {
			Surface(
				color = MaterialTheme.colorScheme.primaryContainer,
				tonalElevation = 2.dp
			) {
				Column(
					modifier = Modifier.fillMaxWidth()
				) {
					// Month and year title
					Text(
						text = selectedDate.month.name.lowercase()
							.replaceFirstChar { it.uppercase() } + " " + selectedDate.year,
						style = MaterialTheme.typography.titleLarge,
						fontWeight = FontWeight.Bold,
						color = MaterialTheme.colorScheme.onPrimaryContainer,
						modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp)
					)

					// Week calendar
					WeekCalendar(
						state = weekCalendarState,
						dayContent = { day ->
							val isSelected = day.date == selectedDate
							val isToday = day.date == currentDate

							Column(
								modifier = Modifier
									.padding(vertical = 4.dp)
									.clip(CircleShape)
									.clickable { selectedDate = day.date }
									.then(
										if (isSelected) {
											Modifier.background(
												MaterialTheme.colorScheme.primary,
												CircleShape
											)
										} else {
											Modifier
										}
									)
									.padding(8.dp),
								horizontalAlignment = Alignment.CenterHorizontally
							) {
								Text(
									text = day.date.dayOfWeek.name.take(3),
									fontSize = 10.sp,
									color = if (isSelected) {
										MaterialTheme.colorScheme.onPrimary
									} else {
										MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.7f)
									},
									textAlign = TextAlign.Center
								)
								Spacer(modifier = Modifier.height(4.dp))
								Text(
									text = day.date.day.toString(),
									fontSize = 16.sp,
									fontWeight = if (isToday || isSelected) FontWeight.Bold else FontWeight.Normal,
									color = if (isSelected) {
										MaterialTheme.colorScheme.onPrimary
									} else if (isToday) {
										MaterialTheme.colorScheme.primary
									} else {
										MaterialTheme.colorScheme.onPrimaryContainer
									},
									textAlign = TextAlign.Center
								)
							}
						},
						modifier = Modifier.padding(bottom = 8.dp)
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
					text = "Sessions for ${selectedDate.dayOfMonth} ${selectedDate.month.name.take(3)}",
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
