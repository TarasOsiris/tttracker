package xyz.tleskiv.tt.ui.widgets

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.theme.onWinContainerColor
import xyz.tleskiv.tt.ui.theme.winContainerColor

/** Wins and losses, coloured by which is ahead; level is neither colour. */
@Composable
fun RecordBadge(wins: Int, losses: Int, modifier: Modifier = Modifier) {
	val colors = MaterialTheme.colorScheme
	val container = when {
		wins > losses -> winContainerColor
		wins < losses -> colors.errorContainer
		else -> colors.surfaceContainerHighest
	}
	val content = when {
		wins > losses -> onWinContainerColor
		wins < losses -> colors.onErrorContainer
		else -> colors.onSurface
	}
	Text(
		text = stringResource(R.string.match_score_format, wins, losses),
		style = MaterialTheme.typography.labelMedium,
		fontWeight = FontWeight.Bold,
		color = content,
		modifier = modifier
			.background(container, CircleShape)
			.padding(horizontal = 8.dp, vertical = 4.dp)
	)
}
