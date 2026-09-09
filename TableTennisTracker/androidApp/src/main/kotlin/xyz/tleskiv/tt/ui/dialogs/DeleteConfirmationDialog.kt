package xyz.tleskiv.tt.ui.dialogs

import androidx.annotation.StringRes
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.res.vectorResource
import xyz.tleskiv.tt.R

@Composable
fun DeleteConfirmationDialog(
	@StringRes title: Int,
	@StringRes message: Int,
	onConfirm: () -> Unit,
	onDismiss: () -> Unit
) {
	AlertDialog(
		onDismissRequest = onDismiss,
		icon = {
			Icon(
				imageVector = ImageVector.vectorResource(R.drawable.ic_delete),
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
				Text(stringResource(R.string.action_delete))
			}
		},
		dismissButton = {
			TextButton(onClick = onDismiss) {
				Text(stringResource(R.string.action_cancel))
			}
		}
	)
}
