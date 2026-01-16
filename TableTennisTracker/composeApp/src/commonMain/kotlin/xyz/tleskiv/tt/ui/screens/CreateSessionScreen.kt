package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.*
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.ui.dialogs.DatePickerDialog
import xyz.tleskiv.tt.ui.widgets.BottomBarButtons
import xyz.tleskiv.tt.ui.widgets.FieldLabel
import xyz.tleskiv.tt.ui.widgets.SimpleTopAppBar
import xyz.tleskiv.tt.ui.widgets.fields.DatePickerField
import xyz.tleskiv.tt.util.labelRes
import xyz.tleskiv.tt.util.ui.getRpeLabel
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import kotlin.math.roundToInt

@Composable
fun CreateSessionScreen(
	viewModel: CreateSessionScreenViewModel, onNavigateBack: () -> Unit = {}, onSave: () -> Unit = {}
) {
	val inputData = viewModel.inputData
	var selectedDate by inputData.selectedDate
	var durationText by inputData.durationText
	var selectedSessionType by inputData.selectedSessionType
	var rpeValue by inputData.rpeValue
	var notes by inputData.notes
	var showDatePicker by inputData.showDatePicker
	val isFormValid = inputData.isFormValid

	Scaffold(topBar = {
		SimpleTopAppBar(Res.string.title_create_session, onNavigateBack = onNavigateBack)
	}, bottomBar = {
		BottomBarButtons(
			onLeftButtonClick = onNavigateBack, onRightButtonClick = onSave, rightButtonEnabled = isFormValid
		)
	}) { paddingValues ->
		Column(
			modifier = Modifier.fillMaxSize().padding(paddingValues).verticalScroll(rememberScrollState())
				.padding(16.dp), verticalArrangement = Arrangement.spacedBy(24.dp)
		) {
			DatePickerField(
				label = Res.string.label_date,
				selectedDate = selectedDate,
				onDateClick = { showDatePicker = true }
			)

			DurationField(
				durationText = durationText,
				onDurationChange = { newValue ->
					if (newValue.isEmpty() || newValue.all { it.isDigit() }) {
						durationText = newValue
					}
				})

			SessionTypeField(
				selectedType = selectedSessionType, onTypeSelected = { selectedSessionType = it })

			RpeField(rpeValue = rpeValue, onRpeChange = { rpeValue = it })

			NotesField(
				notes = notes, onNotesChange = { notes = it })
		}
	}

	if (showDatePicker) {
		DatePickerDialog(initialDate = selectedDate, onDateSelected = { date ->
			selectedDate = date
			showDatePicker = false
		}, onDismiss = { showDatePicker = false })
	}
}


@Composable
private fun DurationField(
	durationText: String, onDurationChange: (String) -> Unit
) {
	Column {
		FieldLabel(Res.string.label_duration)
		Spacer(modifier = Modifier.height(8.dp))
		OutlinedTextField(
			value = durationText,
			onValueChange = onDurationChange,
			modifier = Modifier.fillMaxWidth(),
			placeholder = { Text(stringResource(Res.string.hint_duration)) },
			suffix = { Text(stringResource(Res.string.suffix_minutes)) },
			keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
			singleLine = true,
			supportingText = {
				Text(stringResource(Res.string.rule_duration))
			},
			isError = durationText.isNotEmpty() && (durationText.toIntOrNull()?.let { it !in 5..300 } ?: true))
	}
}

@Composable
private fun SessionTypeField(
	selectedType: SessionType?, onTypeSelected: (SessionType) -> Unit
) {
	Column {
		FieldLabel(Res.string.label_session_type)
		Spacer(modifier = Modifier.height(8.dp))
		FlowRow(
			horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)
		) {
			SessionType.entries.forEach { type ->
				FilterChip(
					selected = selectedType == type,
					onClick = { onTypeSelected(type) },
					label = { Text(stringResource(type.labelRes())) },
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
	rpeValue: Float, onRpeChange: (Float) -> Unit
) {
	Column {
		Row(
			modifier = Modifier.fillMaxWidth(),
			horizontalArrangement = Arrangement.SpaceBetween,
			verticalAlignment = Alignment.CenterVertically
		) {
			FieldLabel(Res.string.label_intensity_rpe)
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
			modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween
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
		shape = MaterialTheme.shapes.small, color = MaterialTheme.colorScheme.surfaceContainerLow
	) {
		Column(
			modifier = Modifier.fillMaxWidth().padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)
		) {
			RpeGuideRow("1-2", stringResource(Res.string.rpe_very_easy))
			RpeGuideRow("3-4", stringResource(Res.string.rpe_easy))
			RpeGuideRow("5-6", stringResource(Res.string.rpe_moderate))
			RpeGuideRow("7-8", stringResource(Res.string.rpe_hard))
			RpeGuideRow("9-10", stringResource(Res.string.rpe_max_effort))
		}
	}
}

@Composable
private fun RpeGuideRow(range: String, label: String) {
	Row(
		modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)
	) {
		Text(
			text = range,
			style = MaterialTheme.typography.bodySmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant,
			fontWeight = FontWeight.Medium
		)
		Text(
			text = label, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}

@Composable
private fun NotesField(
	notes: String, onNotesChange: (String) -> Unit
) {
	Column {
		FieldLabel(Res.string.label_notes_optional)
		Spacer(modifier = Modifier.height(8.dp))
		OutlinedTextField(
			value = notes,
			onValueChange = { if (it.length <= 1000) onNotesChange(it) },
			modifier = Modifier.fillMaxWidth().height(120.dp),
			placeholder = { Text(stringResource(Res.string.hint_notes)) },
			supportingText = {
				Text(stringResource(Res.string.counter_notes, notes.length))
			})
	}
}
