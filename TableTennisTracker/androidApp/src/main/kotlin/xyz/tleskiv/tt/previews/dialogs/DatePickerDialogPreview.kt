package xyz.tleskiv.tt.previews.dialogs

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.ui.dialogs.DatePickerDialog
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.util.today

@Preview(showBackground = true)
@Composable
fun DatePickerDialogPreview() {
	AppTheme {
		DatePickerDialog(
			initialDate = today(),
			onDateSelected = {},
			onDismiss = {}
		)
	}
}
