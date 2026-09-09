package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.LoadingIndicator
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import kotlin.uuid.Uuid
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.viewmodel.dialogs.EditOpponentDialogViewModel

@Composable
fun EditOpponentDialog(
	opponentId: Uuid,
	onDismiss: () -> Unit,
	viewModel: EditOpponentDialogViewModel = koinViewModel { parametersOf(opponentId) }
) {
	val inputData = viewModel.inputData
	val isValid by inputData.isValid.collectAsStateWithLifecycle()
	val isLoading by viewModel.isLoading.collectAsStateWithLifecycle()

	AlertDialog(
		onDismissRequest = onDismiss,
		title = { Text(stringResource(R.string.action_edit_opponent)) },
		text = {
			if (isLoading) {
				Box(
					modifier = Modifier.fillMaxWidth(),
					contentAlignment = Alignment.Center
				) {
					LoadingIndicator()
				}
			} else {
				OpponentForm(
					name = inputData.name,
					club = inputData.club,
					rating = inputData.rating,
					handedness = inputData.handedness,
					playingStyle = inputData.playingStyle,
					notes = inputData.notes
				)
			}
		},
		confirmButton = {
			TextButton(
				onClick = { viewModel.updateOpponent(onSuccess = onDismiss) },
				enabled = isValid && !isLoading
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
