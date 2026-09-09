package xyz.tleskiv.tt.ui.widgets.fields

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.ui.widgets.FieldLabel
import xyz.tleskiv.tt.ui.widgets.PendingMatchCard
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch

@Composable
fun MatchesField(
	matches: List<PendingMatch>,
	onAddMatch: () -> Unit,
	onEditMatch: (PendingMatch) -> Unit,
	onDeleteMatch: (PendingMatch) -> Unit
) {
	Column {
		Row(
			modifier = Modifier.fillMaxWidth(),
			horizontalArrangement = Arrangement.SpaceBetween,
			verticalAlignment = Alignment.CenterVertically
		) {
			FieldLabel(R.string.label_matches_optional)
			FilledTonalButton(onClick = onAddMatch, modifier = Modifier.testTag(TestTags.SESSION_FORM_ADD_MATCH)) {
				Icon(
					imageVector = ImageVector.vectorResource(R.drawable.ic_add),
					contentDescription = null,
					modifier = Modifier.size(18.dp)
				)
				Spacer(modifier = Modifier.size(4.dp))
				Text(stringResource(R.string.action_add_match))
			}
		}

		Spacer(modifier = Modifier.height(8.dp))

		if (matches.isEmpty()) {
			Text(
				text = stringResource(R.string.matches_empty_hint),
				style = MaterialTheme.typography.bodyMedium,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
		} else {
			Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
				matches.forEach { match ->
					PendingMatchCard(
						match = match,
						onEdit = { onEditMatch(match) },
						onDelete = { onDeleteMatch(match) }
					)
				}
			}
		}
	}
}
