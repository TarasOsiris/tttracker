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
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import kotlinx.datetime.LocalDate
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.TestTags
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
import xyz.tleskiv.tt.util.ui.clearFocusOnTap
import xyz.tleskiv.tt.util.ui.collectAsMutableState
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch

@Composable
fun CreateSessionScreen(
	initialDate: LocalDate?,
	onNavigateBack: () -> Unit = {},
	viewModel: CreateSessionScreenViewModel = koinViewModel { parametersOf(initialDate) }
) {
	val inputData = viewModel.inputData
	val isFormValid by inputData.isFormValid.collectAsStateWithLifecycle()
	val focusManager = LocalFocusManager.current

	Column(modifier = Modifier.fillMaxSize().clearFocusOnTap(focusManager).testTag(TestTags.SCREEN_SESSION_FORM)) {
		SimpleTopAppBar(R.string.title_create_session, onNavigateBack = onNavigateBack)

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
			rightButtonEnabled = isFormValid,
		)
	}

	var showDatePicker by inputData.showDatePicker.collectAsMutableState()
	var selectedDate by inputData.selectedDate.collectAsMutableState()

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
	var selectedDate by inputData.selectedDate.collectAsMutableState()
	var durationMinutes by inputData.durationMinutes.collectAsMutableState()
	var selectedSessionType by inputData.selectedSessionType.collectAsMutableState()
	var rpeValue by inputData.rpeValue.collectAsMutableState()
	var notes by inputData.notes.collectAsMutableState()
	var showAddMatchDialog by inputData.showAddMatchDialog.collectAsMutableState()
	var editingMatch by inputData.editingMatch.collectAsMutableState()
	val pendingMatches by inputData.pendingMatches.collectAsStateWithLifecycle()

	DatePickerField(
		label = R.string.label_date,
		selectedDate = selectedDate,
		onDateClick = { inputData.showDatePicker.value = true }
	)

	DurationField(
		durationMinutes = durationMinutes,
		onDurationChange = { durationMinutes = it }
	)

	SessionTypeField(
		selectedType = selectedSessionType, onTypeSelected = { selectedSessionType = it })

	RpeField(rpeValue = rpeValue, onRpeChange = { rpeValue = it })

	NotesField(
		labelRes = R.string.label_notes_optional,
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
