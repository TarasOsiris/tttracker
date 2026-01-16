package xyz.tleskiv.tt.ui.widgets.fields

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.lerp
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.*
import xyz.tleskiv.tt.ui.widgets.FieldLabel
import xyz.tleskiv.tt.util.ui.getRpeLabel
import kotlin.math.roundToInt

private val RpeColorGreen = Color(0xFF4CAF50)
private val RpeColorYellow = Color(0xFFFFC107)
private val RpeColorRed = Color(0xFFF44336)

private fun getRpeColor(value: Float): Color {
	val fraction = (value - 1f) / 9f
	return when {
		fraction <= 0.5f -> lerp(RpeColorGreen, RpeColorYellow, fraction * 2f)
		else -> lerp(RpeColorYellow, RpeColorRed, (fraction - 0.5f) * 2f)
	}
}

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
		Row(
			modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween
		) {
			Text(
				text = getRpeLabel(rpeValue.roundToInt()),
				style = MaterialTheme.typography.bodyMedium,
				color = rpeColor
			)
		}
		Spacer(modifier = Modifier.height(8.dp))
		RpeGuide()
	}
}

@Composable
private fun RpeGuide() {
	Surface(
		shape = MaterialTheme.shapes.small, color = MaterialTheme.colorScheme.surfaceContainerLow
	) {
		Column(
			modifier = Modifier.fillMaxWidth().padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)
		) {
			RpeGuideRow("1-2", stringResource(Res.string.rpe_very_easy))
			RpeGuideRow("3-4", stringResource(Res.string.rpe_easy))
			RpeGuideRow("5-6", stringResource(Res.string.rpe_moderate))
			RpeGuideRow("7-8", stringResource(Res.string.rpe_hard))
			RpeGuideRow("9-10", stringResource(Res.string.rpe_max_effort))
		}
	}
}

@Composable
private fun RpeGuideRow(range: String, label: String) {
	Row(
		modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)
	) {
		Text(
			text = range,
			style = MaterialTheme.typography.bodySmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant,
			fontWeight = FontWeight.Medium
		)
		Text(
			text = label, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}
