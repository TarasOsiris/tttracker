package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_edit
import tabletennistracker.composeapp.generated.resources.action_save
import tabletennistracker.composeapp.generated.resources.label_date
import tabletennistracker.composeapp.generated.resources.label_notes_optional
import xyz.tleskiv.tt.ui.dialogs.DatePickerDialog
import xyz.tleskiv.tt.ui.widgets.BackButton
import xyz.tleskiv.tt.ui.widgets.fields.DatePickerField
import xyz.tleskiv.tt.ui.widgets.fields.DurationField
import xyz.tleskiv.tt.ui.widgets.fields.NotesField
import xyz.tleskiv.tt.ui.widgets.fields.RpeField
import xyz.tleskiv.tt.ui.widgets.fields.SessionTypeField
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import xyz.tleskiv.tt.util.ui.clearFocusOnTap
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.EditSessionScreenViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditSessionScreen(
	sessionId: String,
	onClose: () -> Unit = {},
	viewModel: EditSessionScreenViewModel = koinViewModel { parametersOf(sessionId) }
) {
	val inputData = viewModel.inputData
	val uiState by viewModel.uiState.collectAsState()
	val focusManager = LocalFocusManager.current

	Scaffold(
		topBar = {
			TopAppBar(
				title = { Text(stringResource(Res.string.action_edit)) },
				navigationIcon = { BackButton(onClose) },
				actions = {
					Button(
						onClick = { viewModel.saveSession(onClose) },
						enabled = inputData.isFormValid && !uiState.isLoading && uiState.error == null
					) {
						Text(stringResource(Res.string.action_save))
					}
				}
			)
		}
	) { paddingValues ->
		Column(
			modifier = Modifier
				.fillMaxSize()
				.clearFocusOnTap(focusManager)
				.padding(paddingValues)
				.verticalScroll(rememberScrollState())
				.padding(16.dp),
			verticalArrangement = Arrangement.spacedBy(24.dp)
		) {
			if (uiState.error != null) {
				Text(
					text = uiState.error.orEmpty(),
					style = MaterialTheme.typography.bodyMedium,
					color = MaterialTheme.colorScheme.error
				)
			}
			EditSessionScreenContent(inputData)
		}
	}

	var showDatePicker by inputData.showDatePicker
	var selectedDate by inputData.selectedDate

	if (showDatePicker) {
		DatePickerDialog(
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
private fun EditSessionScreenContent(inputData: CreateSessionScreenViewModel.InputData) {
	var selectedDate by inputData.selectedDate
	var durationMinutes by inputData.durationMinutes
	var selectedSessionType by inputData.selectedSessionType
	var rpeValue by inputData.rpeValue
	var notes by inputData.notes
	var showDatePicker by inputData.showDatePicker

	DatePickerField(
		label = Res.string.label_date,
		selectedDate = selectedDate,
		onDateClick = { showDatePicker = true }
	)

	DurationField(
		durationMinutes = durationMinutes,
		onDurationChange = { durationMinutes = it }
	)

	SessionTypeField(
		selectedType = selectedSessionType,
		onTypeSelected = { selectedSessionType = it }
	)

	RpeField(rpeValue = rpeValue, onRpeChange = { rpeValue = it })

	NotesField(
		labelRes = Res.string.label_notes_optional,
		notes = notes,
		onNotesChange = { notes = it }
	)
}
