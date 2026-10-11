package xyz.tleskiv.tt.ui.widgets.fields

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.health.HealthWorkout
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.ui.health.HealthWorkoutRow
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.ui.widgets.FieldLabel

/** Fills a new session from a Health Connect workout, or shows the one it was filled from. */
@Composable
fun HealthImportField(workout: HealthWorkout?, onImport: () -> Unit, onRemove: () -> Unit) {
	Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
		FieldLabel(R.string.hc_section_title)
		if (workout == null) {
			FilledTonalButton(onClick = onImport, modifier = Modifier.testTag(TestTags.SESSION_FORM_IMPORT_HEALTH)) {
				Icon(Icons.Filled.Favorite, contentDescription = null)
				Spacer(modifier = Modifier.width(8.dp))
				Text(stringResource(R.string.hc_import_action))
			}
			Text(
				stringResource(R.string.hc_import_hint),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
		} else {
			ContentCard {
				Row(verticalAlignment = Alignment.CenterVertically) {
					HealthWorkoutRow(workout, modifier = Modifier.weight(1f))
					IconButton(onClick = onRemove) {
						Icon(Icons.Filled.Close, contentDescription = stringResource(R.string.health_remove_workout))
					}
				}
			}
		}
	}
}
