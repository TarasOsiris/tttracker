package xyz.tleskiv.tt.ui.widgets.fields

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.label_intensity_rpe
import xyz.tleskiv.tt.ui.widgets.FieldLabel
import xyz.tleskiv.tt.util.ui.getRpeColor
import xyz.tleskiv.tt.util.ui.getRpeLabel
import kotlin.math.roundToInt

@Composable
fun RpeField(rpeValue: Float, onRpeChange: (Float) -> Unit) {
	val rpeColor = getRpeColor(rpeValue)

	Column {
		Row(
			modifier = Modifier.fillMaxWidth(),
			horizontalArrangement = Arrangement.SpaceBetween,
			verticalAlignment = Alignment.CenterVertically
		) {
			FieldLabel(Res.string.label_intensity_rpe)
			Text(
				text = rpeValue.roundToInt().toString(),
				style = MaterialTheme.typography.titleLarge,
				color = rpeColor,
				fontWeight = FontWeight.Bold
			)
		}
		Spacer(modifier = Modifier.height(8.dp))
		Slider(
			value = rpeValue,
			onValueChange = onRpeChange,
			valueRange = 1f..10f,
			steps = 8,
			modifier = Modifier.fillMaxWidth(),
			colors = SliderDefaults.colors(
				thumbColor = rpeColor,
				activeTrackColor = rpeColor
			)
		)
		Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
			Text(
				text = "1",
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
			Text(
				text = getRpeLabel(rpeValue.roundToInt()),
				style = MaterialTheme.typography.bodySmall,
				color = rpeColor,
				fontWeight = FontWeight.Medium
			)
			Text(
				text = "10",
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
	}
}
