package xyz.tleskiv.tt.ui.widgets.analytics

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import io.github.koalaplot.core.pie.DefaultSlice
import io.github.koalaplot.core.pie.PieChart
import io.github.koalaplot.core.util.ExperimentalKoalaPlotApi
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.analytics.SummaryStats
import xyz.tleskiv.tt.ui.theme.lossColor
import xyz.tleskiv.tt.ui.theme.winColor

@OptIn(ExperimentalKoalaPlotApi::class)
@Composable
fun WinLossAnalyticsWidget(stats: SummaryStats) {
	val totalMatches = stats.matchesWon + stats.matchesLost
	val winsLabel = stringResource(R.string.analytics_wins)
	val lossesLabel = stringResource(R.string.analytics_losses)

	AnalyticsWidget(title = R.string.analytics_win_loss_chart) {
		if (totalMatches == 0) {
			Box(
				modifier = Modifier.fillMaxWidth().height(200.dp),
				contentAlignment = Alignment.Center
			) {
				Text(
					text = stringResource(R.string.analytics_no_matches),
					style = MaterialTheme.typography.bodyMedium,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}
		} else {
			val colors = listOf(winColor, lossColor)

			Column(
				modifier = Modifier.fillMaxWidth().padding(16.dp),
				horizontalAlignment = Alignment.CenterHorizontally
			) {
				PieChart(
					values = listOf(stats.matchesWon.toFloat(), stats.matchesLost.toFloat()),
					modifier = Modifier.size(160.dp),
					slice = { index ->
						DefaultSlice(color = colors[index], hoverExpandFactor = 1.05f, hoverElement = {})
					},
					holeSize = 0.6f,
					label = {},
					labelConnector = {}
				)
				Spacer(modifier = Modifier.height(16.dp))
				Row(
					modifier = Modifier.fillMaxWidth(),
					horizontalArrangement = Arrangement.Center
				) {
					ChartLegendItem(color = winColor, label = "$winsLabel: ${stats.matchesWon}")
					Spacer(modifier = Modifier.width(24.dp))
					ChartLegendItem(color = lossColor, label = "$lossesLabel: ${stats.matchesLost}")
				}
			}
		}
	}
}

@Composable
private fun ChartLegendItem(color: Color, label: String) {
	Row(verticalAlignment = Alignment.CenterVertically) {
		Box(
			modifier = Modifier
				.size(12.dp)
				.clip(MaterialTheme.shapes.extraSmall)
				.background(color)
		)
		Spacer(modifier = Modifier.width(6.dp))
		Text(
			text = label,
			style = MaterialTheme.typography.labelMedium,
			color = MaterialTheme.colorScheme.onSurface
		)
	}
}
