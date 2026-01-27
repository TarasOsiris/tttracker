package xyz.tleskiv.tt.ui.widgets.analytics

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource
import xyz.tleskiv.tt.ui.widgets.ContentCard

@Composable
fun AnalyticsWidget(title: StringResource, content: @Composable () -> Unit) {
	Column(modifier = Modifier.padding(bottom = 16.dp)) {
		Text(
			text = stringResource(title),
			style = MaterialTheme.typography.titleSmall,
			fontWeight = FontWeight.SemiBold,
			color = MaterialTheme.colorScheme.primary,
			modifier = Modifier.padding(start = 4.dp, bottom = 8.dp)
		)
		ContentCard(content = content)
	}
}
