package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.unit.dp
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.label_date
import tabletennistracker.composeapp.generated.resources.label_notes_optional
import tabletennistracker.composeapp.generated.resources.title_create_session
import xyz.tleskiv.tt.ui.dialogs.DatePickerDialog
import xyz.tleskiv.tt.ui.widgets.BottomBarButtons
import xyz.tleskiv.tt.ui.widgets.SimpleTopAppBar
import xyz.tleskiv.tt.ui.widgets.fields.DatePickerField
import xyz.tleskiv.tt.ui.widgets.fields.DurationField
import xyz.tleskiv.tt.ui.widgets.fields.NotesField
import xyz.tleskiv.tt.ui.widgets.fields.RpeField
import xyz.tleskiv.tt.ui.widgets.fields.SessionTypeField
import xyz.tleskiv.tt.util.ui.clearFocusOnTap
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel

@Composable
fun CreateSessionScreen(
	viewModel: CreateSessionScreenViewModel, onNavigateBack: () -> Unit = {}
) {
	val inputData = viewModel.inputData
	val focusManager = LocalFocusManager.current

	Scaffold(topBar = {
		SimpleTopAppBar(Res.string.title_create_session, onNavigateBack = onNavigateBack)
	}, bottomBar = {
		BottomBarButtons(
			onLeftButtonClick = onNavigateBack,
			onRightButtonClick = { viewModel.saveSession(onNavigateBack) },
			rightButtonEnabled = inputData.isFormValid
		)
	}) { paddingValues ->
		Column(
			modifier = Modifier
				.fillMaxSize()
				.clearFocusOnTap(focusManager)
				.padding(paddingValues)
				.verticalScroll(rememberScrollState())
				.padding(16.dp),
			verticalArrangement = Arrangement.spacedBy(24.dp)
		) {
			CreateSessionScreenContent(inputData)
		}
	}

	var showDatePicker by inputData.showDatePicker
	var selectedDate by inputData.selectedDate

	if (showDatePicker) {
		DatePickerDialog(initialDate = selectedDate, onDateSelected = { date ->
			selectedDate = date
			showDatePicker = false
		}, onDismiss = { showDatePicker = false })
	}
}

@Composable
fun CreateSessionScreenContent(inputData: CreateSessionScreenViewModel.InputData) {
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
		selectedType = selectedSessionType, onTypeSelected = { selectedSessionType = it })

	RpeField(rpeValue = rpeValue, onRpeChange = { rpeValue = it })

	NotesField(
		labelRes = Res.string.label_notes_optional,
		notes = notes,
		onNotesChange = { notes = it }
	)
}
