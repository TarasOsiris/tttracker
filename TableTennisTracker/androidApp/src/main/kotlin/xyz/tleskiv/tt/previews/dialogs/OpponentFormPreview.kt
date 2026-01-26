package xyz.tleskiv.tt.previews.dialogs

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.ui.dialogs.OpponentForm
import xyz.tleskiv.tt.ui.theme.AppTheme

@Preview(showBackground = true)
@Composable
fun OpponentFormPreview() {
	val name = remember { mutableStateOf("Zhang Wei") }
	val club = remember { mutableStateOf("Beijing TT Club") }
	val rating = remember { mutableStateOf("2150") }
	val handedness = remember { mutableStateOf<Handedness?>(Handedness.RIGHT) }
	val playingStyle = remember { mutableStateOf<PlayingStyle?>(PlayingStyle.ATTACKER) }

	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			OpponentForm(
				name = name,
				club = club,
				rating = rating,
				handedness = handedness,
				playingStyle = playingStyle
			)
		}
	}
}

@Preview(showBackground = true)
@Composable
fun OpponentFormEmptyPreview() {
	val name = remember { mutableStateOf("") }
	val club = remember { mutableStateOf("") }
	val rating = remember { mutableStateOf("") }
	val handedness = remember { mutableStateOf<Handedness?>(null) }
	val playingStyle = remember { mutableStateOf<PlayingStyle?>(null) }

	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			OpponentForm(
				name = name,
				club = club,
				rating = rating,
				handedness = handedness,
				playingStyle = playingStyle
			)
		}
	}
}
