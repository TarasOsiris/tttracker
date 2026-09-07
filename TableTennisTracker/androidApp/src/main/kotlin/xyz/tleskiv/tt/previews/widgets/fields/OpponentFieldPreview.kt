package xyz.tleskiv.tt.previews.widgets.fields

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.data.model.Opponent
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.fields.OpponentField
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
@Preview(showBackground = true)
@Composable
fun OpponentFieldPreview() {
	val createdAt = 1706300000000L
	val opponents = listOf("Zhang Wei", "Maria Schmidt", "Kenji Tanaka").map { name ->
		Opponent(
			id = Uuid.random(),
			name = name,
			club = "Club",
			rating = 1800.0,
			handedness = Handedness.RIGHT,
			style = PlayingStyle.ATTACKER,
			notes = null,
			createdAt = createdAt,
			updatedAt = createdAt
		)
	}
	var opponentName by remember { mutableStateOf("") }
	var opponentId by remember { mutableStateOf<Uuid?>(null) }

	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			OpponentField(
				opponentName = opponentName,
				selectedOpponentId = opponentId,
				opponents = opponents,
				onOpponentSelected = { name, id ->
					opponentName = name
					opponentId = id
				}
			)
		}
	}
}
