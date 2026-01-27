package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.BasicAlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_close
import tabletennistracker.composeapp.generated.resources.analytics_settings_title
import tabletennistracker.composeapp.generated.resources.analytics_widget_heatmap
import tabletennistracker.composeapp.generated.resources.analytics_widget_summary
import tabletennistracker.composeapp.generated.resources.analytics_widget_weekly
import tabletennistracker.composeapp.generated.resources.analytics_widget_win_loss
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsWidgetVisibility

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AnalyticsSettingsDialog(
	visibility: AnalyticsWidgetVisibility,
	onShowSummaryChange: (Boolean) -> Unit,
	onShowWinLossChange: (Boolean) -> Unit,
	onShowWeeklyChange: (Boolean) -> Unit,
	onShowHeatmapChange: (Boolean) -> Unit,
	onDismiss: () -> Unit
) {
	BasicAlertDialog(onDismissRequest = onDismiss) {
		Surface(
			shape = MaterialTheme.shapes.large,
			color = MaterialTheme.colorScheme.surfaceContainerHigh
		) {
			Column(modifier = Modifier.padding(24.dp)) {
				Text(
					text = stringResource(Res.string.analytics_settings_title),
					style = MaterialTheme.typography.headlineSmall,
					color = MaterialTheme.colorScheme.onSurface
				)
				Spacer(modifier = Modifier.height(16.dp))

				WidgetToggleRow(
					label = stringResource(Res.string.analytics_widget_summary),
					checked = visibility.showSummary,
					onCheckedChange = onShowSummaryChange
				)
				WidgetToggleRow(
					label = stringResource(Res.string.analytics_widget_win_loss),
					checked = visibility.showWinLoss,
					onCheckedChange = onShowWinLossChange
				)
				WidgetToggleRow(
					label = stringResource(Res.string.analytics_widget_weekly),
					checked = visibility.showWeekly,
					onCheckedChange = onShowWeeklyChange
				)
				WidgetToggleRow(
					label = stringResource(Res.string.analytics_widget_heatmap),
					checked = visibility.showHeatmap,
					onCheckedChange = onShowHeatmapChange
				)

				Spacer(modifier = Modifier.height(16.dp))

				Row(modifier = Modifier.fillMaxWidth()) {
					Spacer(modifier = Modifier.weight(1f))
					TextButton(onClick = onDismiss) {
						Text(stringResource(Res.string.action_close))
					}
				}
			}
		}
	}
}

@Composable
private fun WidgetToggleRow(
	label: String,
	checked: Boolean,
	onCheckedChange: (Boolean) -> Unit
) {
	Row(
		modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
		verticalAlignment = Alignment.CenterVertically
	) {
		Text(
			text = label,
			style = MaterialTheme.typography.bodyLarge,
			color = MaterialTheme.colorScheme.onSurface,
			modifier = Modifier.weight(1f)
		)
		Switch(checked = checked, onCheckedChange = onCheckedChange)
	}
}
