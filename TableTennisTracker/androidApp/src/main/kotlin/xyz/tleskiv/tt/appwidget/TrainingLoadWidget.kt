package xyz.tleskiv.tt.appwidget

import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.glance.GlanceModifier
import androidx.glance.GlanceTheme
import androidx.glance.LocalSize
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import androidx.glance.appwidget.SizeMode
import androidx.glance.appwidget.cornerRadius
import androidx.glance.background
import androidx.glance.layout.Alignment
import androidx.glance.layout.Box
import androidx.glance.layout.Column
import androidx.glance.layout.Row
import androidx.glance.layout.Spacer
import androidx.glance.layout.fillMaxHeight
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.fillMaxWidth
import androidx.glance.layout.height
import androidx.glance.layout.padding
import androidx.glance.layout.width
import androidx.glance.text.FontWeight
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.analytics.TrainingWeek
import xyz.tleskiv.tt.deeplink.DeepLink

/// This week's training load against the weeks before it. Pro.
class TrainingLoadWidget : TTGlanceWidget() {
	override val sizeMode = SizeMode.Responsive(setOf(WidgetSizes.SMALL, WidgetSizes.MEDIUM))
	override val previewSizeMode = sizeMode
	override val lock = ProLock(R.string.widget_load_name, SYMBOL)

	override fun link(data: WidgetData) = DeepLink.Analytics

	@Composable
	override fun Content(data: WidgetData) {
		if (data.isEmpty) {
			WidgetEmpty()
			return
		}
		val size = LocalSize.current
		if (size.width < WidgetSizes.MEDIUM.width) {
			Stats(data.weeks, GlanceModifier.fillMaxSize())
		} else {
			Row(modifier = GlanceModifier.fillMaxSize()) {
				Stats(data.weeks, GlanceModifier.defaultWeight().fillMaxHeight())
				Spacer(GlanceModifier.width(CHART_GAP))
				val chartWidth = (size.width - TTGlanceWidget.WIDGET_PADDING * 2 - CHART_GAP) / 2
				Chart(data.weeks, chartWidth, size.height - TTGlanceWidget.WIDGET_PADDING * 2)
			}
		}
	}

	@Composable
	private fun Stats(weeks: List<TrainingWeek>, modifier: GlanceModifier) {
		val environment = LocalWidgetEnvironment.current
		Column(modifier = modifier) {
			WidgetText(
				text = environment.string(R.string.widget_load_name),
				size = WidgetType.caption,
				color = GlanceTheme.colors.onSurfaceVariant,
				weight = FontWeight.Bold,
				maxLines = 1
			)
			Spacer(GlanceModifier.height(8.dp))
			LoadStat(weeks.lastOrNull()?.load ?: 0, environment.string(R.string.widget_this_week), isCurrent = true)
			Spacer(GlanceModifier.height(8.dp))
			LoadStat(weeks.dropLast(1).lastOrNull()?.load ?: 0, environment.string(R.string.widget_last_week), isCurrent = false)
		}
	}

	@Composable
	private fun LoadStat(load: Int, label: String, isCurrent: Boolean) {
		val environment = LocalWidgetEnvironment.current
		Column {
			WidgetText(
				text = environment.integer(load),
				size = if (isCurrent) WidgetType.title2 else WidgetType.headline,
				color = if (isCurrent) GlanceTheme.colors.primary else GlanceTheme.colors.onSurface,
				weight = FontWeight.Bold,
				maxLines = 1
			)
			SecondaryText(label)
		}
	}

	@Composable
	private fun Chart(weeks: List<TrainingWeek>, width: Dp, height: Dp) {
		val colors = LocalWidgetEnvironment.current.colors
		val shown = weeks.takeLast(WidgetData.LOAD_WEEKS)
		val most = shown.maxOfOrNull { it.load }?.takeIf { it > 0 } ?: 1
		val slot = width / shown.size.coerceAtLeast(1)
		Row(modifier = GlanceModifier.width(width).fillMaxHeight(), verticalAlignment = Alignment.Bottom) {
			shown.forEachIndexed { index, week ->
				Column(
					modifier = GlanceModifier.width(slot).fillMaxHeight().padding(horizontal = BAR_SPACING / 2),
					verticalAlignment = Alignment.Bottom
				) {
					if (week.load > 0) {
						Box(
							modifier = GlanceModifier
								.fillMaxWidth()
								.height(height * week.load / most)
								.cornerRadius(3.dp)
								.background(if (index == shown.lastIndex) GlanceTheme.colors.primary else colors.pastBar)
						) {}
					}
				}
			}
		}
	}

	private companion object {
		const val SYMBOL = "📊"
		val CHART_GAP = 16.dp
		val BAR_SPACING = 4.dp
	}
}

class TrainingLoadWidgetReceiver : GlanceAppWidgetReceiver() {
	override val glanceAppWidget: GlanceAppWidget = TrainingLoadWidget()
}
