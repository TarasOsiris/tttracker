package xyz.tleskiv.tt.ui.widgets

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.util.ui.getRpeColor

@Composable
fun RpeBadge(rpe: Int) {
	Box(
		modifier = Modifier.size(32.dp).background(MaterialTheme.colorScheme.surfaceContainerHigh, CircleShape),
		contentAlignment = Alignment.Center
	) {
		Text(
			text = rpe.toString(),
			style = MaterialTheme.typography.labelMedium,
			fontWeight = FontWeight.Bold,
			color = getRpeColor(rpe)
		)
	}
}
