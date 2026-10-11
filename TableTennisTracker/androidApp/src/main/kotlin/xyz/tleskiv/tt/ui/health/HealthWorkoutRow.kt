package xyz.tleskiv.tt.ui.health

import android.text.format.DateUtils
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.SportsTennis
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.health.HealthWorkout
import xyz.tleskiv.tt.ui.theme.heartRateColor
import xyz.tleskiv.tt.util.ext.displayText
import xyz.tleskiv.tt.util.ext.formatDuration
import xyz.tleskiv.tt.util.ext.shortDisplayText
import kotlin.math.roundToInt

/** One workout: when it was, how long, and where it came from. */
@Composable
fun HealthWorkoutRow(workout: HealthWorkout, modifier: Modifier = Modifier, isSuggested: Boolean = false) {
	Row(
		modifier = modifier.padding(16.dp),
		horizontalArrangement = Arrangement.spacedBy(16.dp),
		verticalAlignment = Alignment.CenterVertically
	) {
		Icon(Icons.Filled.SportsTennis, contentDescription = null, tint = heartRateColor, modifier = Modifier.size(28.dp))
		Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
			Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
				Text(workout.dayLabel(), style = MaterialTheme.typography.bodyLarge, fontWeight = FontWeight.SemiBold)
				if (isSuggested) SuggestedChip()
			}
			Text(
				workout.timeRangeLabel(),
				style = MaterialTheme.typography.bodyMedium,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
			workout.sourceName?.let {
				Text(it, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.outline)
			}
		}
		Column(horizontalAlignment = Alignment.End, verticalArrangement = Arrangement.spacedBy(2.dp)) {
			Text(formatDuration(workout.durationMinutes), style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.SemiBold)
			workout.energyLabel()?.let {
				Text(it, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
			}
		}
	}
}

@Composable
private fun SuggestedChip() {
	Surface(shape = MaterialTheme.shapes.small, color = MaterialTheme.colorScheme.primaryContainer) {
		Text(
			stringResource(R.string.health_suggested),
			style = MaterialTheme.typography.labelSmall,
			fontWeight = FontWeight.SemiBold,
			color = MaterialTheme.colorScheme.onPrimaryContainer,
			modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
		)
	}
}

@Composable
fun HealthWorkout.dayLabel(): String {
	val date = date()
	return "${date.dayOfWeek.displayText()}, ${date.month.shortDisplayText()} ${date.day}"
}

@Composable
fun HealthWorkout.timeRangeLabel(): String = DateUtils.formatDateRange(
	LocalContext.current, start.toEpochMilliseconds(), end.toEpochMilliseconds(), DateUtils.FORMAT_SHOW_TIME
)

@Composable
fun HealthWorkout.energyLabel(): String? =
	activeEnergyKilocalories?.let { stringResource(R.string.hc_energy_format, it.roundToInt()) }
