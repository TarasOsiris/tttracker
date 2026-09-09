package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.atStartOfDayIn
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.util.ext.toLocalDateUtc

@Composable
fun DatePickerDialog(
	initialDate: LocalDate,
	onDateSelected: (LocalDate) -> Unit,
	onDismiss: () -> Unit
) {
	val datePickerState = rememberDatePickerState(
		initialSelectedDateMillis = initialDate.atStartOfDayIn(TimeZone.UTC).toEpochMilliseconds()
	)

	DatePickerDialog(
		onDismissRequest = onDismiss,
		confirmButton = {
			TextButton(
				onClick = {
					datePickerState.selectedDateMillis?.let { millis ->
						onDateSelected(millis.toLocalDateUtc())
					}
				}
			) {
				Text(stringResource(R.string.action_ok))
			}
		},
		dismissButton = {
			TextButton(onClick = onDismiss) {
				Text(stringResource(R.string.action_cancel))
			}
		}
	) {
		DatePicker(state = datePickerState)
	}
}
