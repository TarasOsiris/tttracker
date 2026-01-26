package xyz.tleskiv.tt.previews.widgets

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.kizitonwose.calendar.core.now
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.SessionListItem
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
@Preview(showBackground = true)
@Composable
fun SessionListItemPreview() {
	val sessions = listOf(
		SessionUiModel(
			id = Uuid.random(),
			date = LocalDate.now(),
			durationMinutes = 90,
			sessionType = SessionType.TECHNIQUE,
			rpe = 7,
			notes = "Morning practice with focus on backhand loops"
		),
		SessionUiModel(
			id = Uuid.random(),
			date = LocalDate.now(),
			durationMinutes = 60,
			sessionType = SessionType.MATCH_PLAY,
			rpe = 8,
			notes = null
		),
		SessionUiModel(
			id = Uuid.random(),
			date = LocalDate.now(),
			durationMinutes = 45,
			sessionType = null,
			rpe = 5,
			notes = "Light session"
		)
	)
	AppTheme {
		Column(
			modifier = Modifier.padding(16.dp),
			verticalArrangement = Arrangement.spacedBy(8.dp)
		) {
			sessions.forEach { session ->
				SessionListItem(session = session, onClick = {})
			}
		}
	}
}
