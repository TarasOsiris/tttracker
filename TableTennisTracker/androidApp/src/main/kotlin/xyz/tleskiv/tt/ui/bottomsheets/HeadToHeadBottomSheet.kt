package xyz.tleskiv.tt.ui.bottomsheets

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.analytics.OpponentRecord
import xyz.tleskiv.tt.ui.widgets.analytics.HeadToHeadRow

@Composable
fun HeadToHeadBottomSheet(records: List<OpponentRecord>, onDismiss: () -> Unit) {
	ModalBottomSheet(onDismissRequest = onDismiss, containerColor = MaterialTheme.colorScheme.surface) {
		Column(modifier = Modifier.fillMaxWidth().padding(bottom = 24.dp)) {
			Text(
				text = stringResource(R.string.analytics_head_to_head),
				style = MaterialTheme.typography.titleMedium,
				fontWeight = FontWeight.Bold,
				color = MaterialTheme.colorScheme.onSurface,
				modifier = Modifier.padding(horizontal = 24.dp, vertical = 8.dp)
			)
			LazyColumn {
				items(records, key = { it.opponentId.toString() }) { record ->
					HeadToHeadRow(record = record, modifier = Modifier.padding(horizontal = 24.dp, vertical = 10.dp))
				}
			}
		}
	}
}
