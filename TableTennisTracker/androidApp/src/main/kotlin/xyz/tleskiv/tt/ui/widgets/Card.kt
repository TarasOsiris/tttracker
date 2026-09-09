package xyz.tleskiv.tt.ui.widgets

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ContentCard(modifier: Modifier = Modifier, onClick: (() -> Unit)? = null, content: @Composable () -> Unit) {
	val shape = MaterialTheme.shapes.medium
	val color = MaterialTheme.colorScheme.surfaceContainerLow
	if (onClick == null) {
		Surface(modifier.fillMaxWidth(), shape, color, tonalElevation = 1.dp, content = content)
	} else {
		Surface(onClick, modifier.fillMaxWidth(), shape = shape, color = color, tonalElevation = 1.dp, content = content)
	}
}
