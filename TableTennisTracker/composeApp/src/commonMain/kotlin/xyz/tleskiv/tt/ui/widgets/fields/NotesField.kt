package xyz.tleskiv.tt.ui.widgets.fields

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.ui.TestTags
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.counter_notes
import tabletennistracker.composeapp.generated.resources.hint_notes
import xyz.tleskiv.tt.ui.widgets.FieldLabel

@Composable
fun NotesField(
	labelRes: StringResource,
	notes: String,
	onNotesChange: (String) -> Unit,
	hintRes: StringResource = Res.string.hint_notes
) {
	Column {
		FieldLabel(labelRes)
		Spacer(modifier = Modifier.height(8.dp))
		OutlinedTextField(
			value = notes,
			onValueChange = { if (it.length <= 1000) onNotesChange(it) },
			modifier = Modifier.fillMaxWidth().height(120.dp).testTag(TestTags.NOTES_FIELD),
			placeholder = { Text(stringResource(hintRes)) },
			supportingText = {
				Text(stringResource(Res.string.counter_notes, notes.length))
			})
	}
}
