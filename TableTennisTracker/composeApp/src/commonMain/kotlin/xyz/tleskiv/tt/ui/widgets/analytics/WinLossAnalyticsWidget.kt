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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import io.github.koalaplot.core.pie.DefaultSlice
import io.github.koalaplot.core.pie.PieChart
import io.github.koalaplot.core.util.ExperimentalKoalaPlotApi
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.analytics_losses
import tabletennistracker.composeapp.generated.resources.analytics_no_matches
import tabletennistracker.composeapp.generated.resources.analytics_win_loss_chart
import tabletennistracker.composeapp.generated.resources.analytics_wins
import xyz.tleskiv.tt.ui.theme.lossColor
import xyz.tleskiv.tt.ui.theme.winColor
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.viewmodel.analytics.SummaryStats

@OptIn(ExperimentalKoalaPlotApi::class)
@Composable
fun WinLossAnalyticsWidget(stats: SummaryStats) {
	val totalMatches = stats.matchesWon + stats.matchesLost
	val winsLabel = stringResource(Res.string.analytics_wins)
	val lossesLabel = stringResource(Res.string.analytics_losses)

	Text(
		text = stringResource(Res.string.analytics_win_loss_chart),
		style = MaterialTheme.typography.titleSmall,
		fontWeight = FontWeight.SemiBold,
		color = MaterialTheme.colorScheme.primary,
		modifier = Modifier.padding(start = 4.dp, bottom = 8.dp)
	)

	ContentCard {
		if (totalMatches == 0) {
			Box(
				modifier = Modifier.fillMaxWidth().height(200.dp),
				contentAlignment = Alignment.Center
			) {
				Text(
					text = stringResource(Res.string.analytics_no_matches),
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
