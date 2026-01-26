package xyz.tleskiv.tt.previews.widgets

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.label_duration
import tabletennistracker.composeapp.generated.resources.label_intensity_rpe
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.FieldLabel

@Preview(showBackground = true)
@Composable
fun FieldLabelPreview() {
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			FieldLabel(text = Res.string.label_duration)
			Spacer(modifier = Modifier.height(16.dp))
			FieldLabel(text = Res.string.label_intensity_rpe, onHelpClick = {})
		}
	}
}
