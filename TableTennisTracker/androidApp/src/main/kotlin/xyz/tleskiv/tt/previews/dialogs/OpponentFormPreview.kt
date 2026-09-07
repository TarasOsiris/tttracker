package xyz.tleskiv.tt.previews.dialogs

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import kotlinx.coroutines.flow.MutableStateFlow
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
	val name = remember { MutableStateFlow("Zhang Wei") }
	val club = remember { MutableStateFlow("Beijing TT Club") }
	val rating = remember { MutableStateFlow("2150") }
	val handedness = remember { MutableStateFlow<Handedness?>(Handedness.RIGHT) }
	val playingStyle = remember { MutableStateFlow<PlayingStyle?>(PlayingStyle.ATTACKER) }
	val notes = remember { MutableStateFlow("Strong forehand loop, weak backhand") }

	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			OpponentForm(
				name = name,
				club = club,
				rating = rating,
				handedness = handedness,
				playingStyle = playingStyle,
				notes = notes
			)
		}
	}
}

@Preview(showBackground = true)
@Composable
fun OpponentFormEmptyPreview() {
	val name = remember { MutableStateFlow("") }
	val club = remember { MutableStateFlow("") }
	val rating = remember { MutableStateFlow("") }
	val handedness = remember { MutableStateFlow<Handedness?>(null) }
	val playingStyle = remember { MutableStateFlow<PlayingStyle?>(null) }
	val notes = remember { MutableStateFlow("") }

	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			OpponentForm(
				name = name,
				club = club,
				rating = rating,
				handedness = handedness,
				playingStyle = playingStyle,
				notes = notes
			)
		}
	}
}
