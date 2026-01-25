package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
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
import xyz.tleskiv.tt.ui.dialogs.AddMatchDialog
import xyz.tleskiv.tt.ui.dialogs.DatePickerDialog
import xyz.tleskiv.tt.ui.widgets.BottomBarButtons
import xyz.tleskiv.tt.ui.widgets.SimpleTopAppBar
import xyz.tleskiv.tt.ui.widgets.fields.DatePickerField
import xyz.tleskiv.tt.ui.widgets.fields.DurationField
import xyz.tleskiv.tt.ui.widgets.fields.MatchesField
import xyz.tleskiv.tt.ui.widgets.fields.NotesField
import xyz.tleskiv.tt.ui.widgets.fields.RpeField
import xyz.tleskiv.tt.ui.widgets.fields.SessionTypeField
import kotlinx.datetime.LocalDate
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import xyz.tleskiv.tt.util.ui.clearFocusOnTap
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch

@Composable
fun CreateSessionScreen(
	initialDate: LocalDate?,
	onNavigateBack: () -> Unit = {},
	viewModel: CreateSessionScreenViewModel = koinViewModel { parametersOf(initialDate) }
) {
	val inputData = viewModel.inputData
	val focusManager = LocalFocusManager.current

	Column(modifier = Modifier.fillMaxSize().clearFocusOnTap(focusManager)) {
		SimpleTopAppBar(Res.string.title_create_session, onNavigateBack = onNavigateBack)

		Column(
			modifier = Modifier
				.weight(1f)
				.verticalScroll(rememberScrollState())
				.padding(16.dp),
			verticalArrangement = Arrangement.spacedBy(24.dp)
		) {
			CreateSessionScreenContent(
				inputData = inputData,
				onAddPendingMatch = viewModel::addPendingMatch,
				onUpdatePendingMatch = viewModel::updatePendingMatch,
				onRemovePendingMatch = viewModel::removePendingMatch
			)
		}

		BottomBarButtons(
			onLeftButtonClick = onNavigateBack,
			onRightButtonClick = { viewModel.saveSession(onNavigateBack) },
			rightButtonEnabled = inputData.isFormValid,
		)
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
fun CreateSessionScreenContent(
	inputData: CreateSessionScreenViewModel.InputData,
	onAddPendingMatch: (PendingMatch) -> Unit,
	onUpdatePendingMatch: (PendingMatch) -> Unit,
	onRemovePendingMatch: (String) -> Unit
) {
	var selectedDate by inputData.selectedDate
	var durationMinutes by inputData.durationMinutes
	var selectedSessionType by inputData.selectedSessionType
	var rpeValue by inputData.rpeValue
	var notes by inputData.notes
	var showDatePicker by inputData.showDatePicker
	var showAddMatchDialog by inputData.showAddMatchDialog
	var editingMatch by inputData.editingMatch
	val pendingMatches = inputData.pendingMatches

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

	MatchesField(
		matches = pendingMatches,
		onAddMatch = { showAddMatchDialog = true },
		onEditMatch = { match ->
			editingMatch = match
			showAddMatchDialog = true
		},
		onDeleteMatch = { match -> onRemovePendingMatch(match.id) }
	)

	if (showAddMatchDialog) {
		AddMatchDialog(
			editingMatch = editingMatch,
			onConfirm = { match ->
				if (editingMatch != null) {
					onUpdatePendingMatch(match)
				} else {
					onAddPendingMatch(match)
				}
				showAddMatchDialog = false
				editingMatch = null
			},
			onDismiss = {
				showAddMatchDialog = false
				editingMatch = null
			}
		)
	}
}
