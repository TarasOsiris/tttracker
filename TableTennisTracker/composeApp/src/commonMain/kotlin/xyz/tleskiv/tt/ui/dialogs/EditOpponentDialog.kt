package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_cancel
import tabletennistracker.composeapp.generated.resources.action_edit_opponent
import tabletennistracker.composeapp.generated.resources.action_save
import xyz.tleskiv.tt.viewmodel.dialogs.EditOpponentDialogViewModel
import kotlin.uuid.Uuid

@Composable
fun EditOpponentDialog(
	opponentId: Uuid,
	onDismiss: () -> Unit,
	viewModel: EditOpponentDialogViewModel = koinViewModel { parametersOf(opponentId) }
) {
	val inputData = viewModel.inputData

	AlertDialog(
		onDismissRequest = onDismiss,
		title = { Text(stringResource(Res.string.action_edit_opponent)) },
		text = {
			if (viewModel.isLoading) {
				Box(
					modifier = Modifier.fillMaxWidth(),
					contentAlignment = Alignment.Center
				) {
					CircularProgressIndicator(modifier = Modifier.size(48.dp))
				}
			} else {
				OpponentForm(
					name = inputData.name,
					club = inputData.club,
					rating = inputData.rating,
					handedness = inputData.handedness,
					playingStyle = inputData.playingStyle
				)
			}
		},
		confirmButton = {
			TextButton(
				onClick = { viewModel.updateOpponent(onSuccess = onDismiss) },
				enabled = inputData.isValid && !viewModel.isLoading
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
