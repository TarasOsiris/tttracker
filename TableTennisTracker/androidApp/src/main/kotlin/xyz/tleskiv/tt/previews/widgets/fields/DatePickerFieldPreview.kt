package xyz.tleskiv.tt.previews.widgets.fields

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.fields.DatePickerField
import xyz.tleskiv.tt.util.today

@Preview(showBackground = true)
@Composable
fun DatePickerFieldPreview() {
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			DatePickerField(
				label = R.string.label_date,
				selectedDate = today(),
				onDateClick = {}
			)
		}
	}
}
