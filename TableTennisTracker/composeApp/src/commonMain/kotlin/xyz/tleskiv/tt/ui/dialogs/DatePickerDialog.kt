package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.atStartOfDayIn
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_cancel
import tabletennistracker.composeapp.generated.resources.action_ok
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
				Text(stringResource(Res.string.action_ok))
			}
		},
		dismissButton = {
			TextButton(onClick = onDismiss) {
				Text(stringResource(Res.string.action_cancel))
			}
		}
	) {
		DatePicker(state = datePickerState)
	}
}
