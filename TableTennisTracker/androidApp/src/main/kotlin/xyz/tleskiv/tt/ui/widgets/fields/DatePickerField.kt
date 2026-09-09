package xyz.tleskiv.tt.ui.widgets.fields

import androidx.annotation.StringRes
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.util.ext.formatSessionDateFull

@Composable
fun DatePickerField(
	@StringRes label: Int,
	selectedDate: LocalDate,
	onDateClick: () -> Unit
) {
	Column {
		Text(
			text = stringResource(label),
			style = MaterialTheme.typography.labelLarge,
			color = MaterialTheme.colorScheme.onSurface,
			fontWeight = FontWeight.Medium
		)
		Spacer(modifier = Modifier.height(8.dp))
		Surface(
			onClick = onDateClick,
			shape = MaterialTheme.shapes.medium,
			color = MaterialTheme.colorScheme.surfaceContainerHigh,
			tonalElevation = 1.dp
		) {
			Row(
				modifier = Modifier.fillMaxWidth().padding(16.dp),
				horizontalArrangement = Arrangement.SpaceBetween,
				verticalAlignment = Alignment.CenterVertically
			) {
				Row(
					verticalAlignment = Alignment.CenterVertically,
					horizontalArrangement = Arrangement.spacedBy(12.dp)
				) {
					Icon(
						imageVector = ImageVector.vectorResource(R.drawable.ic_calendar),
						contentDescription = stringResource(label),
						tint = MaterialTheme.colorScheme.primary
					)
					Text(
						text = formatSessionDateFull(selectedDate),
						style = MaterialTheme.typography.bodyLarge,
						color = MaterialTheme.colorScheme.onSurface
					)
				}
				Text(
					text = stringResource(R.string.action_change),
					style = MaterialTheme.typography.labelMedium,
					color = MaterialTheme.colorScheme.primary
				)
			}
		}
	}
}
