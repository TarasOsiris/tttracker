package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.res.stringResource
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import org.koin.compose.viewmodel.koinViewModel
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.viewmodel.dialogs.AddOpponentDialogViewModel

@Composable
fun AddOpponentDialog(
	onDismiss: () -> Unit,
	viewModel: AddOpponentDialogViewModel = koinViewModel()
) {
	val inputData = viewModel.inputData
	val isValid by inputData.isValid.collectAsStateWithLifecycle()

	AlertDialog(
		onDismissRequest = onDismiss,
		title = { Text(stringResource(R.string.action_add_opponent)) },
		text = {
			OpponentForm(
				name = inputData.name,
				club = inputData.club,
				rating = inputData.rating,
				handedness = inputData.handedness,
				playingStyle = inputData.playingStyle,
				notes = inputData.notes
			)
		},
		confirmButton = {
			TextButton(
				onClick = { viewModel.saveOpponent(onSuccess = onDismiss) },
				enabled = isValid
			) {
				Text(stringResource(R.string.action_save))
			}
		},
		dismissButton = {
			TextButton(onClick = onDismiss) {
				Text(stringResource(R.string.action_cancel))
			}
		}
	)
}
