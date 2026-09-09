package xyz.tleskiv.tt.ui.widgets.analytics

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.ui.theme.lossColor
import xyz.tleskiv.tt.ui.theme.winColor

@Composable
fun SummaryAnalyticsWidget(stats: SummaryStats) {
	val hours = stats.totalTrainingMinutes / 60
	val minutes = stats.totalTrainingMinutes % 60
	val timeText = stringResource(R.string.analytics_hours_minutes, hours, minutes)
	val totalMatches = stats.matchesWon + stats.matchesLost
	val winRate = if (totalMatches > 0) (stats.matchesWon * 100) / totalMatches else 0
	val winRateColor = when {
		totalMatches == 0 -> MaterialTheme.colorScheme.onSurfaceVariant
		winRate >= 60 -> winColor
		winRate >= 40 -> MaterialTheme.colorScheme.onSurface
		else -> lossColor
	}

	AnalyticsWidget(title = R.string.analytics_summary) {
		Column(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
			Row(
				modifier = Modifier.fillMaxWidth(),
				horizontalArrangement = Arrangement.SpaceBetween
			) {
				StatBox(
					modifier = Modifier.weight(1f),
					emoji = "🏓",
					value = stats.totalSessions.toString(),
					label = stringResource(R.string.analytics_total_sessions)
				)
				Spacer(modifier = Modifier.width(12.dp))
				StatBox(
					modifier = Modifier.weight(1f),
					emoji = "⏱️",
					value = timeText,
					label = stringResource(R.string.analytics_total_time)
				)
			}
			Spacer(modifier = Modifier.height(12.dp))
			Row(
				modifier = Modifier.fillMaxWidth(),
				horizontalArrangement = Arrangement.SpaceBetween
			) {
				StatBox(
					modifier = Modifier.weight(1f),
					emoji = "🏆",
					value = "${stats.matchesWon}W - ${stats.matchesLost}L",
					label = stringResource(R.string.analytics_win_loss)
				)
				Spacer(modifier = Modifier.width(12.dp))
				StatBox(
					modifier = Modifier.weight(1f),
					emoji = "📈",
					value = "$winRate%",
					label = stringResource(R.string.analytics_win_rate),
					valueColor = winRateColor
				)
			}
		}
	}
}

@Composable
private fun StatBox(
	modifier: Modifier = Modifier,
	emoji: String,
	value: String,
	label: String,
	valueColor: Color = MaterialTheme.colorScheme.onSurface
) {
	Column(
		modifier = modifier
			.clip(MaterialTheme.shapes.small)
			.background(MaterialTheme.colorScheme.surfaceContainerHigh)
			.padding(12.dp),
		horizontalAlignment = Alignment.CenterHorizontally
	) {
		Text(
			text = emoji,
			style = MaterialTheme.typography.titleMedium
		)
		Spacer(modifier = Modifier.height(4.dp))
		Text(
			text = value,
			style = MaterialTheme.typography.titleLarge,
			fontWeight = FontWeight.Bold,
			color = valueColor
		)
		Spacer(modifier = Modifier.height(2.dp))
		Text(
			text = label,
			style = MaterialTheme.typography.labelSmall,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}
