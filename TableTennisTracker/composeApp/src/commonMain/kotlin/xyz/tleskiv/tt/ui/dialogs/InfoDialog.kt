package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_ok
import tabletennistracker.composeapp.generated.resources.ic_help

@Composable
fun InfoDialog(
	title: StringResource,
	message: StringResource,
	onDismiss: () -> Unit
) {
	AlertDialog(
		onDismissRequest = onDismiss,
		icon = {
			Icon(
				imageVector = vectorResource(Res.drawable.ic_help),
				contentDescription = null,
				tint = MaterialTheme.colorScheme.primary
			)
		},
		title = { Text(stringResource(title)) },
		text = { Text(stringResource(message)) },
		confirmButton = {
			TextButton(onClick = onDismiss) {
				Text(stringResource(Res.string.action_ok))
			}
		}
	)
}
