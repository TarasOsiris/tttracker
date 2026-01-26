package xyz.tleskiv.tt.previews.dialogs

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.ui.dialogs.DeleteSessionDialog
import xyz.tleskiv.tt.ui.theme.AppTheme

@Preview(showBackground = true)
@Composable
fun DeleteSessionDialogPreview() {
	AppTheme {
		DeleteSessionDialog(onConfirm = {}, onDismiss = {})
	}
}
