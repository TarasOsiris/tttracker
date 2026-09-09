package xyz.tleskiv.tt.ui.widgets

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ContentCard(modifier: Modifier = Modifier, content: @Composable () -> Unit) {
	Surface(
		modifier = modifier.fillMaxWidth(),
		shape = RoundedCornerShape(12.dp),
		color = MaterialTheme.colorScheme.surfaceContainerLow,
		tonalElevation = 1.dp,
		content = content
	)
}
