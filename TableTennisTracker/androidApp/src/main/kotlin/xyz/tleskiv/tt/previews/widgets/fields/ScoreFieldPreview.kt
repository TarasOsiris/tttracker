package xyz.tleskiv.tt.previews.widgets.fields

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.fields.ScoreField

@Preview(showBackground = true)
@Composable
fun ScoreFieldPreview() {
	var myScore by remember { mutableIntStateOf(3) }
	var opponentScore by remember { mutableIntStateOf(1) }
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			ScoreField(
				myScore = myScore,
				opponentScore = opponentScore,
				onMyScoreChange = { myScore = it },
				onOpponentScoreChange = { opponentScore = it }
			)
		}
	}
}
