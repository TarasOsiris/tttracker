package xyz.tleskiv.tt.previews.dialogs

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.kizitonwose.calendar.core.now
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.ui.dialogs.DatePickerDialog
import xyz.tleskiv.tt.ui.theme.AppTheme

@Preview(showBackground = true)
@Composable
fun DatePickerDialogPreview() {
	AppTheme {
		DatePickerDialog(
			initialDate = LocalDate.now(),
			onDateSelected = {},
			onDismiss = {}
		)
	}
}
