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
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.fields.SessionTypeField

@Preview(showBackground = true)
@Composable
fun SessionTypeFieldPreview() {
	var selectedType by remember { mutableStateOf<SessionType?>(SessionType.TECHNIQUE) }
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			SessionTypeField(
				selectedType = selectedType,
				onTypeSelected = { selectedType = it }
			)
		}
	}
}
