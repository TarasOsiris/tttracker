package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.kizitonwose.calendar.core.now
import kotlinx.datetime.*
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_edit
import tabletennistracker.composeapp.generated.resources.action_save
import tabletennistracker.composeapp.generated.resources.label_date
import xyz.tleskiv.tt.ui.dialogs.DatePickerDialog
import xyz.tleskiv.tt.ui.widgets.BackButton
import xyz.tleskiv.tt.ui.widgets.fields.DatePickerField
import xyz.tleskiv.tt.ui.widgets.fields.DurationField
import xyz.tleskiv.tt.ui.widgets.fields.NotesField
import xyz.tleskiv.tt.ui.widgets.fields.RpeField
import xyz.tleskiv.tt.ui.widgets.fields.SessionTypeField
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditSessionScreen(
	sessionId: String,
	onClose: () -> Unit = {}
) {
	val inputData = remember(sessionId) { CreateSessionScreenViewModel.InputData(LocalDate.now()) }

	Scaffold(
		topBar = {
			TopAppBar(
				title = { Text(stringResource(Res.string.action_edit)) },
				navigationIcon = { BackButton(onClose) },
				actions = {
					TextButton(onClick = onClose) {
						Text(stringResource(Res.string.action_save))
					}
				}
			)
		}
	) { paddingValues ->
		Column(
			modifier = Modifier.fillMaxSize().padding(paddingValues).verticalScroll(rememberScrollState())
				.padding(16.dp),
			verticalArrangement = Arrangement.spacedBy(24.dp)
		) {
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

	NotesField(notes = notes, onNotesChange = { notes = it })
}
