package xyz.tleskiv.tt.ui.dialogs

import androidx.annotation.StringRes
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.KeyboardArrowDown
import androidx.compose.material.icons.rounded.KeyboardArrowUp
import androidx.compose.material3.BasicAlertDialog
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.model.AnalyticsWidget
import xyz.tleskiv.tt.model.AnalyticsWidgetSetting
import xyz.tleskiv.tt.ui.pro.LocalPro
import xyz.tleskiv.tt.ui.pro.ProBadge

@Composable
fun AnalyticsSettingsDialog(
	widgets: List<AnalyticsWidgetSetting>,
	onVisibleChange: (AnalyticsWidget, Boolean) -> Unit,
	onMove: (AnalyticsWidget, Int) -> Unit,
	onDismiss: () -> Unit
) {
	val hasPro = LocalPro.current.hasProFeatures
	BasicAlertDialog(onDismissRequest = onDismiss) {
		Surface(
			shape = MaterialTheme.shapes.extraLarge,
			color = MaterialTheme.colorScheme.surfaceContainerHigh
		) {
			Column(modifier = Modifier.padding(24.dp)) {
				Text(
					text = stringResource(R.string.analytics_settings_title),
					style = MaterialTheme.typography.headlineSmall,
					color = MaterialTheme.colorScheme.onSurface
				)
				Spacer(modifier = Modifier.height(16.dp))

				Column(modifier = Modifier.weight(1f, fill = false).verticalScroll(rememberScrollState())) {
					widgets.forEachIndexed { index, setting ->
						WidgetRow(
							setting = setting,
							isLocked = setting.widget.isInsight && !hasPro,
							onCheckedChange = { onVisibleChange(setting.widget, it) },
							onMoveUp = { onMove(setting.widget, -1) }.takeIf { index > 0 },
							onMoveDown = { onMove(setting.widget, 1) }.takeIf { index < widgets.lastIndex }
						)
					}
				}

				Spacer(modifier = Modifier.height(16.dp))

				Row(modifier = Modifier.fillMaxWidth()) {
					Spacer(modifier = Modifier.weight(1f))
					TextButton(onClick = onDismiss) {
						Text(stringResource(R.string.action_close))
					}
				}
			}
		}
	}
}

/**
 * Without Pro an insight is part of the locked preview, which has no off switch; it can still be
 * moved, and the preview moves with it.
 */
@Composable
private fun WidgetRow(
	setting: AnalyticsWidgetSetting,
	isLocked: Boolean,
	onCheckedChange: (Boolean) -> Unit,
	onMoveUp: (() -> Unit)?,
	onMoveDown: (() -> Unit)?
) {
	Row(
		modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
		verticalAlignment = Alignment.CenterVertically
	) {
		Text(
			text = stringResource(setting.widget.label),
			style = MaterialTheme.typography.bodyLarge,
			color = MaterialTheme.colorScheme.onSurface,
			modifier = Modifier.weight(1f)
		)
		MoveButton(Icons.Rounded.KeyboardArrowUp, R.string.action_move_up, onMoveUp)
		MoveButton(Icons.Rounded.KeyboardArrowDown, R.string.action_move_down, onMoveDown)
		if (isLocked) {
			ProBadge(modifier = Modifier.padding(horizontal = 17.dp))
		} else {
			Switch(checked = setting.visible, onCheckedChange = onCheckedChange)
		}
	}
}

@Composable
private fun MoveButton(icon: ImageVector, @StringRes description: Int, onClick: (() -> Unit)?) {
	IconButton(onClick = { onClick?.invoke() }, enabled = onClick != null) {
		Icon(imageVector = icon, contentDescription = stringResource(description))
	}
}

@get:StringRes
val AnalyticsWidget.label: Int
	get() = when (this) {
		AnalyticsWidget.SUMMARY -> R.string.analytics_widget_summary
		AnalyticsWidget.WIN_LOSS -> R.string.analytics_widget_win_loss
		AnalyticsWidget.WEEKLY -> R.string.analytics_widget_weekly
		AnalyticsWidget.HEATMAP -> R.string.analytics_widget_heatmap
		AnalyticsWidget.STREAK -> R.string.analytics_widget_streak
		AnalyticsWidget.TRAINING_LOAD -> R.string.analytics_training_load
		AnalyticsWidget.SESSION_TYPES -> R.string.analytics_session_types
		AnalyticsWidget.HEAD_TO_HEAD -> R.string.analytics_head_to_head
	}
