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
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.help_rpe_title
import tabletennistracker.composeapp.generated.resources.label_intensity_rpe
import xyz.tleskiv.tt.ui.bottomsheets.HelpBottomSheet
import xyz.tleskiv.tt.ui.help.RpeHelpContent
import xyz.tleskiv.tt.ui.widgets.FieldLabel
import xyz.tleskiv.tt.util.ui.getRpeColor
import xyz.tleskiv.tt.util.ui.getRpeLabel
import kotlin.math.roundToInt

private const val MinRpeValue = 1
private const val MaxRpeValue = 10
private const val RpeStepValue = 1
private val RpeSliderSteps = ((MaxRpeValue - MinRpeValue) / RpeStepValue) - 1
private const val ValueTextSpacingDp = 8

@Composable
fun RpeField(rpeValue: Int, onRpeChange: (Int) -> Unit) {
	var showHelp by remember { mutableStateOf(false) }
	val rpeColor = getRpeColor(rpeValue)

	Column {
		Row(
			modifier = Modifier.fillMaxWidth(),
			horizontalArrangement = Arrangement.SpaceBetween,
			verticalAlignment = Alignment.CenterVertically
		) {
			FieldLabel(Res.string.label_intensity_rpe, onHelpClick = { showHelp = true })
			Text(
				text = rpeValue.toString(),
				style = MaterialTheme.typography.titleLarge,
				color = rpeColor,
				fontWeight = FontWeight.Bold
			)
		}
		Spacer(modifier = Modifier.height(ValueTextSpacingDp.dp))
		Slider(
			value = rpeValue.toFloat(),
			onValueChange = { onRpeChange(it.roundToInt()) },
			valueRange = MinRpeValue.toFloat()..MaxRpeValue.toFloat(),
			steps = RpeSliderSteps,
			modifier = Modifier.fillMaxWidth(),
			colors = SliderDefaults.colors(
				thumbColor = rpeColor,
				activeTrackColor = rpeColor
			)
		)
		Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
			Text(
				text = MinRpeValue.toString(),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
			Text(
				text = getRpeLabel(rpeValue),
				style = MaterialTheme.typography.bodySmall,
				color = rpeColor,
				fontWeight = FontWeight.Medium
			)
			Text(
				text = MaxRpeValue.toString(),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
	}

	if (showHelp) {
		HelpBottomSheet(title = Res.string.help_rpe_title, onDismiss = { showHelp = false }) {
			RpeHelpContent()
		}
	}
}
