package xyz.tleskiv.tt.ui.widgets.fields

import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Slider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.label_duration
import tabletennistracker.composeapp.generated.resources.suffix_minutes_value
import xyz.tleskiv.tt.ui.widgets.FieldLabel
import kotlin.math.roundToInt

@Composable
fun DurationField(durationMinutes: Int, onDurationChange: (Int) -> Unit) {
	Column {
		Row(
			modifier = Modifier.fillMaxWidth(),
			horizontalArrangement = Arrangement.SpaceBetween,
			verticalAlignment = Alignment.CenterVertically
		) {
			FieldLabel(Res.string.label_duration)
			Text(
				text = stringResource(Res.string.suffix_minutes_value, durationMinutes),
				style = MaterialTheme.typography.titleLarge,
				color = MaterialTheme.colorScheme.primary,
				fontWeight = FontWeight.Bold
			)
		}
		Spacer(modifier = Modifier.height(8.dp))
		Slider(
			value = durationMinutes.toFloat(),
			onValueChange = { onDurationChange((it / 10).roundToInt() * 10) },
			valueRange = 10f..180f,
			steps = 16,
			modifier = Modifier.fillMaxWidth()
		)
		Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
			Text(
				text = stringResource(Res.string.suffix_minutes_value, 10),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
			Text(
				text = stringResource(Res.string.suffix_minutes_value, 180),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
	}
}
