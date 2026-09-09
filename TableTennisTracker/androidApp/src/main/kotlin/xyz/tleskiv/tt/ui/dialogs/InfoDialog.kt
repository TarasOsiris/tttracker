package xyz.tleskiv.tt.ui.dialogs

import androidx.annotation.StringRes
import androidx.compose.material3.AlertDialog
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
fun InfoDialog(
	@StringRes title: Int,
	@StringRes message: Int,
	onDismiss: () -> Unit
) {
	AlertDialog(
		onDismissRequest = onDismiss,
		icon = {
			Icon(
				imageVector = ImageVector.vectorResource(R.drawable.ic_help),
				contentDescription = null,
				tint = MaterialTheme.colorScheme.primary
			)
		},
		title = { Text(stringResource(title)) },
		text = { Text(stringResource(message)) },
		confirmButton = {
			TextButton(onClick = onDismiss) {
				Text(stringResource(R.string.action_ok))
			}
		}
	)
}
