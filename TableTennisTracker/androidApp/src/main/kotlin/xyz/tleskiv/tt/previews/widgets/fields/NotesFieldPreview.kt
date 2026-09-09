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
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.fields.NotesField

@Preview(showBackground = true)
@Composable
fun NotesFieldPreview() {
	var notes by remember { mutableStateOf("Example notes for the session") }
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			NotesField(
				labelRes = R.string.label_notes_optional,
				notes = notes,
				onNotesChange = { notes = it }
			)
		}
	}
}
