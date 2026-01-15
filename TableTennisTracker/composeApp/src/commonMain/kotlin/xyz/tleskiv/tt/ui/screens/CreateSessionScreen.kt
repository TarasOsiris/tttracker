package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.kizitonwose.calendar.core.now
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.atStartOfDayIn
import kotlinx.datetime.toLocalDateTime
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.ic_arrow_back
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.util.displayName
import kotlin.math.roundToInt

@Composable
fun CreateSessionScreen(
	onNavigateBack: () -> Unit = {},
	onSave: () -> Unit = {}
) {
	val today = remember { LocalDate.now() }

	var selectedDate by remember { mutableStateOf(today) }
	var durationText by remember { mutableStateOf("") }
	var selectedSessionType by remember { mutableStateOf<SessionType?>(null) }
	var rpeValue by remember { mutableFloatStateOf(5f) }
	var notes by remember { mutableStateOf("") }
	var showDatePicker by remember { mutableStateOf(false) }

	val isFormValid by remember {
		derivedStateOf {
			val duration = durationText.toIntOrNull()
			duration != null && duration in 5..300 && selectedSessionType != null
		}
	}

	Scaffold(
		topBar = {
			TopAppBar(
				title = { Text("Create Training Session") },
				navigationIcon = {
					IconButton(onClick = onNavigateBack) {
						Icon(
							imageVector = vectorResource(Res.drawable.ic_arrow_back),
							contentDescription = "Back"
						)
					}
				},
				colors = TopAppBarDefaults.topAppBarColors(
					containerColor = MaterialTheme.colorScheme.surface
				)
			)
		},
		bottomBar = {
			Surface(
				tonalElevation = 3.dp,
				shadowElevation = 8.dp
			) {
				Row(
					modifier = Modifier
						.fillMaxWidth()
						.padding(16.dp),
					horizontalArrangement = Arrangement.spacedBy(12.dp)
				) {
					OutlinedButton(
						onClick = onNavigateBack,
						modifier = Modifier.weight(1f)
					) {
						Text("Cancel")
					}
					Button(
						onClick = onSave,
						enabled = isFormValid,
						modifier = Modifier.weight(1f)
					) {
						Text("Save Session")
					}
				}
			}
		}
	) { paddingValues ->
		Column(
			modifier = Modifier
				.fillMaxSize()
				.padding(paddingValues)
				.verticalScroll(rememberScrollState())
				.padding(16.dp),
			verticalArrangement = Arrangement.spacedBy(24.dp)
		) {
			DateField(
				selectedDate = selectedDate,
				onDateClick = { showDatePicker = true }
			)

			DurationField(
				durationText = durationText,
				onDurationChange = { newValue ->
					if (newValue.isEmpty() || newValue.all { it.isDigit() }) {
						durationText = newValue
					}
				}
			)

			SessionTypeField(
				selectedType = selectedSessionType,
				onTypeSelected = { selectedSessionType = it }
			)

			RpeField(rpeValue = rpeValue, onRpeChange = { rpeValue = it })

			NotesField(
				notes = notes,
				onNotesChange = { notes = it }
			)
		}
	}

	if (showDatePicker) {
		SessionDatePickerDialog(
			initialDate = selectedDate,
			onDateSelected = { date ->
				selectedDate = date
				showDatePicker = false
			},
			onDismiss = { showDatePicker = false }
		)
	}
}

@Composable
private fun DateField(
	selectedDate: LocalDate,
	onDateClick: () -> Unit
) {
	Column {
		Text(
			text = "Date",
			style = MaterialTheme.typography.labelLarge,
			color = MaterialTheme.colorScheme.onSurface,
			fontWeight = FontWeight.Medium
		)
		Spacer(modifier = Modifier.height(8.dp))
		Surface(
			onClick = onDateClick,
			shape = MaterialTheme.shapes.medium,
			color = MaterialTheme.colorScheme.surfaceContainerHigh,
			tonalElevation = 1.dp
		) {
			Row(
				modifier = Modifier
					.fillMaxWidth()
					.padding(16.dp),
				horizontalArrangement = Arrangement.SpaceBetween,
				verticalAlignment = Alignment.CenterVertically
			) {
				Text(
					text = formatDateDisplay(selectedDate),
					style = MaterialTheme.typography.bodyLarge,
					color = MaterialTheme.colorScheme.onSurface
				)
				Text(
					text = "Change",
					style = MaterialTheme.typography.labelMedium,
					color = MaterialTheme.colorScheme.primary
				)
			}
		}
	}
}

@Composable
private fun DurationField(
	durationText: String,
	onDurationChange: (String) -> Unit
) {
	Column {
		Text(
			text = "Duration",
			style = MaterialTheme.typography.labelLarge,
			color = MaterialTheme.colorScheme.onSurface,
			fontWeight = FontWeight.Medium
		)
		Spacer(modifier = Modifier.height(8.dp))
		OutlinedTextField(
			value = durationText,
			onValueChange = onDurationChange,
			modifier = Modifier.fillMaxWidth(),
			placeholder = { Text("Enter duration") },
			suffix = { Text("minutes") },
			keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
			singleLine = true,
			supportingText = {
				Text("5-300 minutes")
			},
			isError = durationText.isNotEmpty() && (durationText.toIntOrNull()?.let { it !in 5..300 } ?: true)
		)
	}
}

@Composable
private fun SessionTypeField(
	selectedType: SessionType?,
	onTypeSelected: (SessionType) -> Unit
) {
	Column {
		Text(
			text = "Session Type",
			style = MaterialTheme.typography.labelLarge,
			color = MaterialTheme.colorScheme.onSurface,
			fontWeight = FontWeight.Medium
		)
		Spacer(modifier = Modifier.height(8.dp))
		FlowRow(
			horizontalArrangement = Arrangement.spacedBy(8.dp),
			verticalArrangement = Arrangement.spacedBy(8.dp)
		) {
			SessionType.entries.forEach { type ->
				FilterChip(
					selected = selectedType == type,
					onClick = { onTypeSelected(type) },
					label = { Text(type.displayName()) },
					colors = FilterChipDefaults.filterChipColors(
						selectedContainerColor = MaterialTheme.colorScheme.primaryContainer,
						selectedLabelColor = MaterialTheme.colorScheme.onPrimaryContainer
					)
				)
			}
		}
	}
}

@Composable
private fun RpeField(
	rpeValue: Float,
	onRpeChange: (Float) -> Unit
) {
	Column {
		Row(
			modifier = Modifier.fillMaxWidth(),
			horizontalArrangement = Arrangement.SpaceBetween,
			verticalAlignment = Alignment.CenterVertically
		) {
			Text(
				text = "Intensity (RPE)",
				style = MaterialTheme.typography.labelLarge,
				color = MaterialTheme.colorScheme.onSurface,
				fontWeight = FontWeight.Medium
			)
			Text(
				text = rpeValue.roundToInt().toString(),
				style = MaterialTheme.typography.titleLarge,
				color = MaterialTheme.colorScheme.primary,
				fontWeight = FontWeight.Bold
			)
		}
		Spacer(modifier = Modifier.height(8.dp))
		Slider(
			value = rpeValue,
			onValueChange = onRpeChange,
			valueRange = 1f..10f,
			steps = 8,
			modifier = Modifier.fillMaxWidth()
		)
		Row(
			modifier = Modifier.fillMaxWidth(),
			horizontalArrangement = Arrangement.SpaceBetween
		) {
			Text(
				text = getRpeLabel(rpeValue.roundToInt()),
				style = MaterialTheme.typography.bodyMedium,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
		Spacer(modifier = Modifier.height(8.dp))
		RpeGuide()
	}
}

@Composable
private fun RpeGuide() {
	Surface(
		shape = MaterialTheme.shapes.small,
		color = MaterialTheme.colorScheme.surfaceContainerLow
	) {
		Column(
			modifier = Modifier
				.fillMaxWidth()
				.padding(12.dp),
			verticalArrangement = Arrangement.spacedBy(4.dp)
		) {
			RpeGuideRow("1-2", "Very easy")
			RpeGuideRow("3-4", "Easy")
			RpeGuideRow("5-6", "Moderate")
			RpeGuideRow("7-8", "Hard")
			RpeGuideRow("9-10", "Max effort")
		}
	}
}

@Composable
private fun RpeGuideRow(range: String, label: String) {
	Row(
		modifier = Modifier.fillMaxWidth(),
		horizontalArrangement = Arrangement.spacedBy(12.dp)
	) {
		Text(
			text = range,
			style = MaterialTheme.typography.bodySmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant,
			fontWeight = FontWeight.Medium
		)
		Text(
			text = label,
			style = MaterialTheme.typography.bodySmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}

@Composable
private fun NotesField(
	notes: String,
	onNotesChange: (String) -> Unit
) {
	Column {
		Text(
			text = "Notes (optional)",
			style = MaterialTheme.typography.labelLarge,
			color = MaterialTheme.colorScheme.onSurface,
			fontWeight = FontWeight.Medium
		)
		Spacer(modifier = Modifier.height(8.dp))
		OutlinedTextField(
			value = notes,
			onValueChange = { if (it.length <= 1000) onNotesChange(it) },
			modifier = Modifier
				.fillMaxWidth()
				.height(120.dp),
			placeholder = { Text("Add notes about your session...") },
			supportingText = {
				Text("${notes.length}/1000")
			}
		)
	}
}

@Composable
private fun SessionDatePickerDialog(
	initialDate: LocalDate,
	onDateSelected: (LocalDate) -> Unit,
	onDismiss: () -> Unit
) {
	val datePickerState = rememberDatePickerState(
		initialSelectedDateMillis = initialDate.atStartOfDayIn(TimeZone.UTC).toEpochMilliseconds()
	)

	DatePickerDialog(
		onDismissRequest = onDismiss,
		confirmButton = {
			TextButton(
				onClick = {
					datePickerState.selectedDateMillis?.let { millis ->
						val instant = kotlin.time.Instant.fromEpochMilliseconds(millis)
						val date = instant.toLocalDateTime(TimeZone.UTC).date
						onDateSelected(date)
					}
				}
			) {
				Text("OK")
			}
		},
		dismissButton = {
			TextButton(onClick = onDismiss) {
				Text("Cancel")
			}
		}
	) {
		DatePicker(state = datePickerState)
	}
}

private fun formatDateDisplay(date: LocalDate): String {
	val monthName = date.month.name.lowercase().replaceFirstChar { it.uppercase() }
	val dayOfWeek = date.dayOfWeek.name.lowercase().replaceFirstChar { it.uppercase() }
	return "$dayOfWeek, $monthName ${date.day}, ${date.year}"
}

private fun getRpeLabel(rpe: Int): String = when (rpe) {
	1, 2 -> "Very easy"
	3, 4 -> "Easy"
	5, 6 -> "Moderate"
	7, 8 -> "Hard"
	9, 10 -> "Max effort"
	else -> ""
}
