package xyz.tleskiv.tt.previews.widgets

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.FieldLabel

@Preview(showBackground = true)
@Composable
fun FieldLabelPreview() {
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			FieldLabel(text = R.string.label_duration)
			Spacer(modifier = Modifier.height(16.dp))
			FieldLabel(text = R.string.label_intensity_rpe, onHelpClick = {})
		}
	}
}
