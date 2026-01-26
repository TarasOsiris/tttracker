package xyz.tleskiv.tt.previews.widgets

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.PendingMatchCard
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch
import kotlin.uuid.ExperimentalUuidApi

@OptIn(ExperimentalUuidApi::class)
@Preview(showBackground = true)
@Composable
fun PendingMatchCardPreview() {
	val winMatch = PendingMatch(
		id = "1",
		opponentName = "Zhang Wei",
		opponentId = null,
		myGamesWon = 3,
		opponentGamesWon = 1,
		isDoubles = false,
		isRanked = true,
		competitionLevel = CompetitionLevel.LEAGUE
	)
	val lossMatch = PendingMatch(
		id = "2",
		opponentName = "Maria Schmidt",
		opponentId = null,
		myGamesWon = 1,
		opponentGamesWon = 3,
		isDoubles = false,
		isRanked = true,
		competitionLevel = CompetitionLevel.TOURNAMENT
	)
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			PendingMatchCard(match = winMatch, onEdit = {}, onDelete = {})
			PendingMatchCard(match = lossMatch, onEdit = {}, onDelete = {})
		}
	}
}
