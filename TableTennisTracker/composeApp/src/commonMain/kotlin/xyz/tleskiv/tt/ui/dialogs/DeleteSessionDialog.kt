package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.runtime.Composable
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.delete_session_message
import tabletennistracker.composeapp.generated.resources.delete_session_title

@Composable
fun DeleteSessionDialog(
	onConfirm: () -> Unit,
	onDismiss: () -> Unit
) {
	DeleteConfirmationDialog(
		title = Res.string.delete_session_title,
		message = Res.string.delete_session_message,
		onConfirm = onConfirm,
		onDismiss = onDismiss
	)
}
