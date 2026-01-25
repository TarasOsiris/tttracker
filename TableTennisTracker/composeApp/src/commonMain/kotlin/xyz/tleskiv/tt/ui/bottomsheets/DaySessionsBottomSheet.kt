package xyz.tleskiv.tt.ui.bottomsheets

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.SheetState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlinx.datetime.LocalDate
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.sessions_empty
import xyz.tleskiv.tt.ui.widgets.SessionListItem
import xyz.tleskiv.tt.util.ext.formatFullDate
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel

@Composable
fun DaySessionsBottomSheet(
	date: LocalDate,
	sessions: List<SessionUiModel>,
	sheetState: SheetState,
	onDismiss: () -> Unit,
	onSessionClick: (SessionUiModel) -> Unit
) {
	ModalBottomSheet(
		onDismissRequest = onDismiss,
		sheetState = sheetState,
		containerColor = MaterialTheme.colorScheme.surface
	) {
		Column(modifier = Modifier.fillMaxWidth().padding(bottom = 24.dp)) {
			Text(
				text = date.formatFullDate(),
				style = MaterialTheme.typography.titleMedium,
				fontWeight = FontWeight.Bold,
				color = MaterialTheme.colorScheme.onSurface,
				modifier = Modifier.padding(horizontal = 24.dp, vertical = 8.dp)
			)

			Spacer(modifier = Modifier.height(8.dp))

			if (sessions.isEmpty()) {
				Text(
					text = stringResource(Res.string.sessions_empty),
					style = MaterialTheme.typography.bodyMedium,
					color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f),
					modifier = Modifier.padding(horizontal = 24.dp, vertical = 16.dp)
				)
			} else {
				LazyColumn {
					items(sessions, key = { it.id }) { session ->
						SessionListItem(
							session = session,
							onClick = { onSessionClick(session) },
							modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)
						)
					}
				}
			}
		}
	}
}
