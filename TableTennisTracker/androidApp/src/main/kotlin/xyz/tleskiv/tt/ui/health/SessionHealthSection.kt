package xyz.tleskiv.tt.ui.health

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Link
import androidx.compose.material.icons.filled.LinkOff
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.health.connect.client.PermissionController
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import kotlinx.datetime.LocalDate
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.di.components.HealthConnectDataSource
import xyz.tleskiv.tt.health.HealthWorkout
import xyz.tleskiv.tt.health.HeartRatePoint
import xyz.tleskiv.tt.pro.PaywallSource
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.ui.dialogs.HealthWorkoutPickerDialog
import xyz.tleskiv.tt.ui.pro.ProLocked
import xyz.tleskiv.tt.ui.theme.heartRateColor
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.util.ext.formatDuration
import xyz.tleskiv.tt.viewmodel.health.HealthWorkoutPickerViewModel
import xyz.tleskiv.tt.viewmodel.health.SessionHealthViewModel
import xyz.tleskiv.tt.viewmodel.health.SessionHealthViewModel.State
import kotlin.math.roundToInt

/** The session's Health Connect workout in its details: linking one, or what it recorded. */
@Composable
fun SessionHealthSection(
	sessionId: String,
	sessionDate: LocalDate,
	sessionDurationMinutes: Int,
	viewModel: SessionHealthViewModel = koinViewModel(key = "session_health_$sessionId") { parametersOf(sessionId) }
) {
	val state by viewModel.state.collectAsStateWithLifecycle()
	var picksWorkout by remember { mutableStateOf(false) }
	val requestAccess = rememberLauncherForActivityResult(PermissionController.createRequestPermissionResultContract()) {
		viewModel.refresh()
	}

	when (val current = state) {
		State.Unavailable, State.Loading -> Unit
		is State.Unlinked -> UnlinkedHealthCard(
			suggestion = current.suggestion,
			onLinkSuggestion = { viewModel.link(it, via = "suggestion") },
			onChoose = { picksWorkout = true }
		)
		State.NeedsAccess -> HealthMessageCard(
			message = stringResource(R.string.hc_access_hint),
			actionLabel = stringResource(R.string.hc_access_action),
			onAction = { requestAccess.launch(HealthConnectDataSource.READ_PERMISSIONS) }
		)
		State.Missing -> HealthMessageCard(
			message = stringResource(R.string.hc_workout_missing),
			actionLabel = stringResource(R.string.health_unlink_action),
			onAction = viewModel::unlink
		)
		is State.Linked -> LinkedHealthCard(current.workout, current.heartRate, onUnlink = viewModel::unlink)
	}

	if (picksWorkout) {
		HealthWorkoutPickerDialog(
			target = HealthWorkoutPickerViewModel.Target(sessionDate, sessionDurationMinutes),
			onPick = { viewModel.link(it, via = "picker") },
			onDismiss = { picksWorkout = false }
		)
	}
}

@Composable
private fun HealthSectionHeader() {
	Row(modifier = Modifier.padding(vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
		Icon(Icons.Filled.Favorite, contentDescription = null, tint = heartRateColor)
		Spacer(modifier = Modifier.width(12.dp))
		Text(
			stringResource(R.string.hc_section_title),
			style = MaterialTheme.typography.titleMedium,
			fontWeight = FontWeight.SemiBold
		)
	}
}

@Composable
private fun UnlinkedHealthCard(suggestion: HealthWorkout?, onLinkSuggestion: (HealthWorkout) -> Unit, onChoose: () -> Unit) {
	Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
		HealthSectionHeader()
		if (suggestion != null) {
			ContentCard(onClick = { onLinkSuggestion(suggestion) }) {
				HealthWorkoutRow(suggestion, isSuggested = true)
			}
			Text(
				stringResource(R.string.health_suggestion_hint),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant,
				modifier = Modifier.padding(horizontal = 4.dp)
			)
		}
		TextButton(onClick = onChoose, modifier = Modifier.testTag(TestTags.SESSION_LINK_HEALTH)) {
			Icon(Icons.Filled.Link, contentDescription = null)
			Spacer(modifier = Modifier.width(8.dp))
			Text(stringResource(R.string.health_link_action))
		}
	}
}

@Composable
private fun HealthMessageCard(message: String, actionLabel: String, onAction: () -> Unit) {
	Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
		HealthSectionHeader()
		ContentCard {
			Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
				Text(message, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
				TextButton(onClick = onAction) { Text(actionLabel) }
			}
		}
	}
}

@Composable
private fun LinkedHealthCard(workout: HealthWorkout, heartRate: List<HeartRatePoint>, onUnlink: () -> Unit) {
	Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
		HealthSectionHeader()
		ContentCard {
			Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
				HealthValueRow(stringResource(R.string.health_time), workout.timeRangeLabel())
				HealthValueRow(stringResource(R.string.health_workout), formatDuration(workout.durationMinutes))
				workout.energyLabel()?.let { HealthValueRow(stringResource(R.string.health_active_energy), it) }
				workout.sourceName?.let {
					Text(it, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.outline)
				}
				HorizontalDivider()
				ProLocked(PaywallSource.HEALTH_HEART_RATE, caption = stringResource(R.string.health_heart_rate_locked)) {
					HeartRateSummary(workout, heartRate)
				}
				TextButton(onClick = onUnlink) {
					Icon(Icons.Filled.LinkOff, contentDescription = null, tint = MaterialTheme.colorScheme.error)
					Spacer(modifier = Modifier.width(8.dp))
					Text(stringResource(R.string.health_unlink_action), color = MaterialTheme.colorScheme.error)
				}
			}
		}
	}
}

@Composable
private fun HealthValueRow(label: String, value: String) {
	Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
		Text(label, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
		Text(value, style = MaterialTheme.typography.bodyLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
	}
}

@Composable
private fun HeartRateSummary(workout: HealthWorkout, points: List<HeartRatePoint>) {
	Column(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
		Text(
			stringResource(R.string.health_heart_rate),
			style = MaterialTheme.typography.titleSmall,
			fontWeight = FontWeight.SemiBold,
			color = heartRateColor
		)
		val average = workout.averageHeartRate
		val max = workout.maxHeartRate
		if (average == null || max == null) {
			Text(
				stringResource(R.string.health_heart_rate_empty),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
			return
		}
		Row(horizontalArrangement = Arrangement.spacedBy(32.dp)) {
			HeartRateStat(stringResource(R.string.health_heart_rate_average), average)
			HeartRateStat(stringResource(R.string.health_heart_rate_max), max)
		}
		if (points.size > 1) HeartRateChart(points)
	}
}

@Composable
private fun HeartRateStat(label: String, beatsPerMinute: Double) {
	Column {
		Text(label, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
		Text(
			stringResource(R.string.health_bpm_format, beatsPerMinute.roundToInt()),
			style = MaterialTheme.typography.titleLarge,
			fontWeight = FontWeight.SemiBold
		)
	}
}

/** Minute-by-minute average heart rate, scaled between its own lowest and highest minute. */
@Composable
private fun HeartRateChart(points: List<HeartRatePoint>) {
	val gridColor = MaterialTheme.colorScheme.outlineVariant
	Canvas(modifier = Modifier.fillMaxWidth().height(120.dp)) {
		val low = points.minOf { it.beatsPerMinute }
		val high = points.maxOf { it.beatsPerMinute }
		val span = (high - low).coerceAtLeast(1.0)
		val first = points.first().time.toEpochMilliseconds()
		val duration = (points.last().time.toEpochMilliseconds() - first).coerceAtLeast(1L).toFloat()
		fun x(point: HeartRatePoint) = (point.time.toEpochMilliseconds() - first) / duration * size.width
		fun y(point: HeartRatePoint) = size.height - ((point.beatsPerMinute - low) / span).toFloat() * size.height

		listOf(0f, size.height / 2, size.height).forEach {
			drawLine(gridColor, Offset(0f, it), Offset(size.width, it), strokeWidth = 1.dp.toPx())
		}
		val path = Path().apply {
			moveTo(x(points.first()), y(points.first()))
			points.drop(1).forEach { lineTo(x(it), y(it)) }
		}
		drawPath(path, heartRateColor, style = Stroke(width = 2.5.dp.toPx(), cap = StrokeCap.Round, join = StrokeJoin.Round))
	}
}
