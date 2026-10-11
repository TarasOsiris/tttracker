package xyz.tleskiv.tt.ui.dialogs

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.LoadingIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.health.connect.client.PermissionController
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.di.components.HealthConnectDataSource
import xyz.tleskiv.tt.health.HealthWorkout
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.ui.health.HealthWorkoutRow
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.viewmodel.health.HealthWorkoutPickerViewModel
import kotlin.uuid.Uuid

/**
 * The table tennis workouts Health Connect has, to import into a new session or link to one.
 * Opening it asks for Health Connect access the first time; the user tapped to get here.
 */
@Composable
fun HealthWorkoutPickerDialog(
	target: HealthWorkoutPickerViewModel.Target?,
	onPick: (HealthWorkout) -> Unit,
	onDismiss: () -> Unit,
	viewModel: HealthWorkoutPickerViewModel = koinViewModel(key = remember { Uuid.random().toString() }) {
		parametersOf(target)
	}
) {
	val uiState by viewModel.uiState.collectAsStateWithLifecycle()
	var askedForAccess by rememberSaveable { mutableStateOf(false) }
	val requestAccess = rememberLauncherForActivityResult(PermissionController.createRequestPermissionResultContract()) {
		viewModel.load()
	}

	LaunchedEffect(uiState.needsAccess) {
		if (uiState.needsAccess && !askedForAccess) {
			askedForAccess = true
			requestAccess.launch(HealthConnectDataSource.READ_PERMISSIONS)
		}
	}

	AlertDialog(
		onDismissRequest = onDismiss,
		title = { Text(stringResource(R.string.health_picker_title)) },
		text = {
			Box(modifier = Modifier.fillMaxWidth().heightIn(min = 120.dp), contentAlignment = Alignment.Center) {
				when {
					uiState.isLoading -> LoadingIndicator()
					uiState.needsAccess -> NeedsAccess(onAllow = { requestAccess.launch(HealthConnectDataSource.READ_PERMISSIONS) })
					uiState.workouts.isEmpty() -> EmptyWorkouts()
					else -> WorkoutList(
						workouts = uiState.workouts,
						suggestedId = uiState.suggestedId,
						onPick = { workout ->
							onPick(workout)
							onDismiss()
						}
					)
				}
			}
		},
		confirmButton = {},
		dismissButton = { TextButton(onClick = onDismiss) { Text(stringResource(R.string.action_cancel)) } }
	)
}

@Composable
private fun WorkoutList(workouts: List<HealthWorkout>, suggestedId: String?, onPick: (HealthWorkout) -> Unit) {
	LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
		items(workouts, key = { it.id }) { workout ->
			ContentCard(modifier = Modifier.testTag(TestTags.HEALTH_WORKOUT_ROW), onClick = { onPick(workout) }) {
				HealthWorkoutRow(workout, isSuggested = workout.id == suggestedId)
			}
		}
	}
}

@Composable
private fun EmptyWorkouts() {
	Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(8.dp)) {
		Text(stringResource(R.string.health_picker_empty_title), style = MaterialTheme.typography.titleMedium)
		Text(
			stringResource(R.string.hc_picker_empty_message),
			style = MaterialTheme.typography.bodyMedium,
			color = MaterialTheme.colorScheme.onSurfaceVariant,
			textAlign = TextAlign.Center
		)
	}
}

@Composable
private fun NeedsAccess(onAllow: () -> Unit) {
	Column(
		modifier = Modifier.padding(vertical = 8.dp),
		horizontalAlignment = Alignment.CenterHorizontally,
		verticalArrangement = Arrangement.spacedBy(12.dp)
	) {
		Text(
			stringResource(R.string.hc_access_hint),
			style = MaterialTheme.typography.bodyMedium,
			color = MaterialTheme.colorScheme.onSurfaceVariant,
			textAlign = TextAlign.Center
		)
		Button(onClick = onAllow) { Text(stringResource(R.string.hc_access_action)) }
	}
}
