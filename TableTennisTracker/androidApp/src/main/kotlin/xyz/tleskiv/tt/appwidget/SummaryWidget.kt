package xyz.tleskiv.tt.appwidget

import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp
import androidx.glance.GlanceModifier
import androidx.glance.GlanceTheme
import androidx.glance.LocalSize
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import androidx.glance.appwidget.SizeMode
import androidx.glance.layout.Alignment
import androidx.glance.layout.Column
import androidx.glance.layout.Row
import androidx.glance.layout.Spacer
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.fillMaxWidth
import androidx.glance.layout.height
import androidx.glance.text.FontWeight
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.deeplink.DeepLink

/// The analytics screen's headline totals.
class SummaryWidget : TTGlanceWidget() {
	override val sizeMode = SizeMode.Responsive(setOf(WidgetSizes.SMALL, WidgetSizes.MEDIUM, WidgetSizes.LARGE))
	override val previewSizeMode = sizeMode

	override fun link(data: WidgetData) = DeepLink.Analytics

	@Composable
	override fun Content(data: WidgetData) {
		val size = LocalSize.current
		when {
			data.isEmpty -> WidgetEmpty()
			size.height >= WidgetSizes.LARGE.height -> Large(data)
			size.width >= WidgetSizes.MEDIUM.width -> Tiles(data)
			else -> Small(data)
		}
	}

	@Composable
	private fun Small(data: WidgetData) {
		val environment = LocalWidgetEnvironment.current
		Column(horizontalAlignment = Alignment.CenterHorizontally) {
			WidgetText(
				text = winRate(data),
				size = WidgetType.hero,
				color = winRateTint(data) ?: GlanceTheme.colors.onSurface,
				weight = FontWeight.Medium,
				maxLines = 1
			)
			SecondaryText(environment.string(R.string.analytics_win_rate), WidgetType.caption)
			SecondaryText(environment.record(data.summary.matchesWon, data.summary.matchesLost))
		}
	}

	/// Two by two rather than a row of four: a medium widget is twice as tall as it is dense.
	@Composable
	private fun Tiles(data: WidgetData) {
		val environment = LocalWidgetEnvironment.current
		val summary = data.summary
		Column(modifier = GlanceModifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
			Row(modifier = GlanceModifier.fillMaxWidth()) {
				WidgetStat(
					value = environment.integer(summary.totalSessions),
					label = environment.string(R.string.analytics_total_sessions),
					modifier = GlanceModifier.defaultWeight()
				)
				WidgetStat(
					value = environment.duration(summary.totalTrainingMinutes),
					label = environment.string(R.string.analytics_total_time),
					modifier = GlanceModifier.defaultWeight()
				)
			}
			Spacer(GlanceModifier.height(10.dp))
			Row(modifier = GlanceModifier.fillMaxWidth()) {
				WidgetStat(
					value = environment.record(summary.matchesWon, summary.matchesLost),
					label = environment.string(R.string.analytics_win_loss),
					modifier = GlanceModifier.defaultWeight()
				)
				WidgetStat(
					value = winRate(data),
					label = environment.string(R.string.analytics_win_rate),
					modifier = GlanceModifier.defaultWeight(),
					tint = winRateTint(data)
				)
			}
		}
	}

	@Composable
	private fun Large(data: WidgetData) {
		Column(modifier = GlanceModifier.fillMaxSize()) {
			Tiles(data)
			Spacer(GlanceModifier.height(12.dp))
			WidgetDivider()
			Spacer(GlanceModifier.height(12.dp))
			data.lastSession?.let { LastSessionDetail(it) }
		}
	}

	@Composable
	private fun winRate(data: WidgetData): String =
		data.summary.winRate?.let { LocalWidgetEnvironment.current.percent(it) } ?: NO_VALUE

	@Composable
	private fun winRateTint(data: WidgetData) = data.summary.winRate?.let {
		val colors = LocalWidgetEnvironment.current.colors
		if (it >= 0.5) colors.winText else colors.lossText
	}

	private companion object {
		const val NO_VALUE = "—"
	}
}

class SummaryWidgetReceiver : GlanceAppWidgetReceiver() {
	override val glanceAppWidget: GlanceAppWidget = SummaryWidget()
}
