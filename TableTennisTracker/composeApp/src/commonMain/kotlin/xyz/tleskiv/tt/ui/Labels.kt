package xyz.tleskiv.tt.ui

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.font.FontWeight
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource

@Composable
fun FieldLabel(text: StringResource) {
	Text(
		text = stringResource(text),
		style = MaterialTheme.typography.labelLarge,
		color = MaterialTheme.colorScheme.onSurface,
		fontWeight = FontWeight.Medium
	)
}
