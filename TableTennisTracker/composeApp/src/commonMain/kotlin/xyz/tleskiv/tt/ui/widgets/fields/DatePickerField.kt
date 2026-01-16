package xyz.tleskiv.tt.ui.widgets.fields

import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlinx.datetime.LocalDate
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_change
import xyz.tleskiv.tt.util.ext.formatSessionDateFull

@Composable
fun DatePickerField(
	label: StringResource,
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
				Text(
					text = formatSessionDateFull(selectedDate),
					style = MaterialTheme.typography.bodyLarge,
					color = MaterialTheme.colorScheme.onSurface
				)
				Text(
					text = stringResource(Res.string.action_change),
					style = MaterialTheme.typography.labelMedium,
					color = MaterialTheme.colorScheme.primary
				)
			}
		}
	}
}
