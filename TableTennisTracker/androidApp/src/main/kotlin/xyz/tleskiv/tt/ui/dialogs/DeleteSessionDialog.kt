package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.runtime.Composable
import xyz.tleskiv.tt.R

@Composable
fun DeleteSessionDialog(
	onConfirm: () -> Unit,
	onDismiss: () -> Unit
) {
	DeleteConfirmationDialog(
		title = R.string.delete_session_title,
		message = R.string.delete_session_message,
		onConfirm = onConfirm,
		onDismiss = onDismiss
	)
}
