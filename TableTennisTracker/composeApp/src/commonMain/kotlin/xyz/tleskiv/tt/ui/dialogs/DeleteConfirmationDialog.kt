package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_cancel
import tabletennistracker.composeapp.generated.resources.action_delete
import tabletennistracker.composeapp.generated.resources.ic_delete

@Composable
fun DeleteConfirmationDialog(
	title: StringResource,
	message: StringResource,
	onConfirm: () -> Unit,
	onDismiss: () -> Unit
) {
	AlertDialog(
		onDismissRequest = onDismiss,
		icon = {
			Icon(
				imageVector = vectorResource(Res.drawable.ic_delete),
				contentDescription = null,
				tint = MaterialTheme.colorScheme.error
			)
		},
		title = { Text(stringResource(title)) },
		text = { Text(stringResource(message)) },
		confirmButton = {
			TextButton(
				onClick = onConfirm,
				colors = ButtonDefaults.textButtonColors(contentColor = MaterialTheme.colorScheme.error)
			) {
				Text(stringResource(Res.string.action_delete))
			}
		},
		dismissButton = {
			TextButton(onClick = onDismiss) {
				Text(stringResource(Res.string.action_cancel))
			}
		}
	)
}
