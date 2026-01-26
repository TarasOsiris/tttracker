package xyz.tleskiv.tt.previews.widgets.fields

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.kizitonwose.calendar.core.now
import kotlinx.datetime.LocalDate
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.label_date
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.fields.DatePickerField

@Preview(showBackground = true)
@Composable
fun DatePickerFieldPreview() {
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			DatePickerField(
				label = Res.string.label_date,
				selectedDate = LocalDate.now(),
				onDateClick = {}
			)
		}
	}
}
