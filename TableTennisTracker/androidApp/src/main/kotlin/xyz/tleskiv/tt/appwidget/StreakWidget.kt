package xyz.tleskiv.tt.appwidget

import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp
import androidx.glance.GlanceModifier
import androidx.glance.GlanceTheme
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import androidx.glance.appwidget.SizeMode
import androidx.glance.layout.Alignment
import androidx.glance.layout.Column
import androidx.glance.layout.Row
import androidx.glance.layout.Spacer
import androidx.glance.layout.height
import androidx.glance.layout.padding
import androidx.glance.layout.size
import androidx.glance.text.FontWeight
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.analytics.TrainingWeek
import xyz.tleskiv.tt.deeplink.DeepLink

/// Weeks in a row with at least one session. Pro.
class StreakWidget : TTGlanceWidget() {
	override val sizeMode = SizeMode.Single
	override val lock = ProLock(R.string.widget_streak_name, SYMBOL)

	override fun link(data: WidgetData) = DeepLink.Analytics

	@Composable
	override fun Content(data: WidgetData) {
		if (data.isEmpty) {
			WidgetEmpty()
			return
		}
		val environment = LocalWidgetEnvironment.current
		Column(horizontalAlignment = Alignment.CenterHorizontally) {
			WidgetText(SYMBOL, WidgetType.title3)
			WidgetText(environment.integer(data.streak.currentWeeks), WidgetType.hero, weight = FontWeight.Medium, maxLines = 1)
			SecondaryText(environment.string(R.string.analytics_streak_current), WidgetType.caption)
			Spacer(GlanceModifier.height(6.dp))
			WeekDots(data.weeks)
		}
	}

	/// One dot per recent week, filled when anything was logged in it; the current week is last.
	@Composable
	private fun WeekDots(weeks: List<TrainingWeek>) {
		val colors = LocalWidgetEnvironment.current.colors
		Row {
			weeks.takeLast(WidgetData.LOAD_WEEKS).forEach { week ->
				WidgetShape(
					shape = R.drawable.widget_dot,
					color = if (week.sessionCount > 0) GlanceTheme.colors.primary else colors.idle,
					modifier = GlanceModifier.size(12.dp).padding(2.dp)
				)
			}
		}
	}

	private companion object {
		const val SYMBOL = "🔥"
	}
}

class StreakWidgetReceiver : GlanceAppWidgetReceiver() {
	override val glanceAppWidget: GlanceAppWidget = StreakWidget()
}
