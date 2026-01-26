package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import org.jetbrains.compose.resources.stringResource
import org.koin.compose.viewmodel.koinViewModel
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_add_opponent
import tabletennistracker.composeapp.generated.resources.action_cancel
import tabletennistracker.composeapp.generated.resources.action_save
import xyz.tleskiv.tt.viewmodel.dialogs.AddOpponentDialogViewModel

@Composable
fun AddOpponentDialog(
	onDismiss: () -> Unit,
	viewModel: AddOpponentDialogViewModel = koinViewModel()
) {
	val inputData = viewModel.inputData

	AlertDialog(
		onDismissRequest = onDismiss,
		title = { Text(stringResource(Res.string.action_add_opponent)) },
		text = {
			OpponentForm(
				name = inputData.name,
				club = inputData.club,
				rating = inputData.rating,
				handedness = inputData.handedness,
				playingStyle = inputData.playingStyle
			)
		},
		confirmButton = {
			TextButton(
				onClick = { viewModel.saveOpponent(onSuccess = onDismiss) },
				enabled = inputData.isValid
			) {
				Text(stringResource(Res.string.action_save))
			}
		},
		dismissButton = {
			TextButton(onClick = onDismiss) {
				Text(stringResource(Res.string.action_cancel))
			}
		}
	)
}
