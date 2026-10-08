package xyz.tleskiv.tt.ui.widgets.analytics

import androidx.annotation.StringRes
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.ui.widgets.ContentCard

@Composable
fun AnalyticsWidget(@StringRes title: Int, @StringRes footer: Int? = null, content: @Composable () -> Unit) {
	Column(modifier = Modifier.padding(bottom = 16.dp)) {
		Text(
			text = stringResource(title),
			style = MaterialTheme.typography.titleSmall,
			fontWeight = FontWeight.SemiBold,
			color = MaterialTheme.colorScheme.primary,
			modifier = Modifier.padding(start = 4.dp, bottom = 8.dp)
		)
		ContentCard(content = content)
		if (footer != null) {
			Text(
				text = stringResource(footer),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant,
				modifier = Modifier.padding(start = 4.dp, top = 6.dp, end = 4.dp)
			)
		}
	}
}

@Composable
internal fun AnalyticsEmptyState(@StringRes message: Int, height: Dp = 200.dp) {
	Box(modifier = Modifier.fillMaxWidth().height(height), contentAlignment = Alignment.Center) {
		Text(
			text = stringResource(message),
			style = MaterialTheme.typography.bodyMedium,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}
