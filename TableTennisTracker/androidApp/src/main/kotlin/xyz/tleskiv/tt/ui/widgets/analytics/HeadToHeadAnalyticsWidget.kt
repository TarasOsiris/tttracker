package xyz.tleskiv.tt.ui.widgets.analytics

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.analytics.OpponentRecord
import xyz.tleskiv.tt.ui.theme.lossColor
import xyz.tleskiv.tt.ui.theme.winColor
import xyz.tleskiv.tt.ui.widgets.RecordBadge

private const val HEAD_TO_HEAD_SHOWN = 5

/** The opponents played most recently, with a way through to all of them. */
@Composable
fun HeadToHeadAnalyticsWidget(records: List<OpponentRecord>, onShowAll: () -> Unit) {
	AnalyticsWidget(title = R.string.analytics_head_to_head) {
		if (records.isEmpty()) {
			AnalyticsEmptyState(message = R.string.analytics_no_matches)
		} else {
			Column(modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp)) {
				records.take(HEAD_TO_HEAD_SHOWN).forEach { record ->
					HeadToHeadRow(record = record, modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp))
				}
				if (records.size > HEAD_TO_HEAD_SHOWN) {
					TextButton(onClick = onShowAll, modifier = Modifier.padding(horizontal = 4.dp)) {
						Text(text = stringResource(R.string.analytics_head_to_head_all))
					}
				}
			}
		}
	}
}

@Composable
fun HeadToHeadRow(record: OpponentRecord, modifier: Modifier = Modifier) {
	Row(
		modifier = modifier.fillMaxWidth().semantics(mergeDescendants = true) {},
		verticalAlignment = Alignment.CenterVertically
	) {
		Column(modifier = Modifier.weight(1f)) {
			Text(
				text = record.name,
				style = MaterialTheme.typography.bodyLarge,
				color = MaterialTheme.colorScheme.onSurface
			)
			Text(
				text = stringResource(R.string.analytics_games_format, record.gamesWon, record.gamesLost),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
		Spacer(modifier = Modifier.width(8.dp))
		Column(horizontalAlignment = Alignment.End, verticalArrangement = Arrangement.spacedBy(6.dp)) {
			RecordBadge(wins = record.wins, losses = record.losses)
			RecentForm(results = record.recentResults)
		}
	}
}

/** The last few results as dots, oldest on the left. */
@Composable
private fun RecentForm(results: List<Boolean>) {
	Row(
		modifier = Modifier.clearAndSetSemantics {},
		horizontalArrangement = Arrangement.spacedBy(3.dp)
	) {
		results.forEach { isWin ->
			Box(modifier = Modifier.size(7.dp).background(if (isWin) winColor else lossColor, CircleShape))
		}
	}
}
