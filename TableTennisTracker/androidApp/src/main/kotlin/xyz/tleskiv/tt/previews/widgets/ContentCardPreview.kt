package xyz.tleskiv.tt.previews.widgets

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.ContentCard

@Preview(showBackground = true)
@Composable
fun ContentCardPreview() {
	AppTheme {
		ContentCard(modifier = Modifier.padding(16.dp)) {
			Text(text = "Content Card Example", modifier = Modifier.padding(16.dp))
		}
	}
}
