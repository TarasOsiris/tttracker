package xyz.tleskiv.tt.appwidget

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.max
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
import androidx.glance.layout.height
import androidx.glance.layout.padding
import androidx.glance.layout.size
import androidx.glance.layout.width
import androidx.glance.text.FontWeight
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.deeplink.DeepLink

/// The analytics screen's contribution grid, sized to whatever the launcher gives it.
///
/// A widget cannot scroll, so the window is whatever fits: seven rows is fixed, which leaves only
/// the cell size to trade against the number of weeks. A tall widget is no wider than a short one,
/// so rather than one band of enormous cells it stacks two chronological bands and shows twice the
/// history, as on iOS.
class HeatmapWidget : TTGlanceWidget() {
	override val sizeMode = SizeMode.Exact
	override val previewSizeMode = SizeMode.Responsive(setOf(WidgetSizes.MEDIUM, WidgetSizes.LARGE))

	override fun link(data: WidgetData) = DeepLink.Analytics

	@Composable
	override fun Content(data: WidgetData) {
		if (data.isEmpty) {
			WidgetEmpty()
			return
		}
		val environment = LocalWidgetEnvironment.current
		val size = LocalSize.current
		val isLarge = size.height >= WidgetSizes.LARGE.height
		val bandCount = if (isLarge) 2 else 1
		val width = size.width - TTGlanceWidget.WIDGET_PADDING * 2
		val gridHeight = size.height - TTGlanceWidget.WIDGET_PADDING * 2 - LABEL_HEIGHT - GAP -
			(if (isLarge) LABEL_HEIGHT + GAP else 0.dp)
		val slot = max(MIN_SLOT, (gridHeight - BAND_GAP * (bandCount - 1)) / bandCount / DAYS_PER_WEEK)
		val columns = maxOf(MIN_COLUMNS, (width / slot).toInt())
		val levels = remember(data.days) { data.days.associate { it.date to it.level } }
		val bands = remember(data.firstDayOfWeek, data.today, columns, bandCount) {
			heatmapBands(data.firstDayOfWeek, data.today, columns, bandCount)
		}

		Column(modifier = GlanceModifier.fillMaxSize()) {
			WidgetText(
				text = environment.string(R.string.analytics_heatmap_title),
				size = WidgetType.caption,
				color = GlanceTheme.colors.onSurfaceVariant,
				weight = FontWeight.Bold,
				maxLines = 1
			)
			Spacer(GlanceModifier.height(GAP))
			bands.forEachIndexed { index, band ->
				if (index > 0) Spacer(GlanceModifier.height(BAND_GAP))
				Band(band, levels, slot)
			}
			if (isLarge) {
				Spacer(GlanceModifier.height(GAP))
				Legend()
			}
		}
	}

	/// Week columns in groups, since a Glance row holds at most ten children.
	@Composable
	private fun Band(weeks: List<List<LocalDate>>, levels: Map<LocalDate, Int>, slot: Dp) {
		val colors = LocalWidgetEnvironment.current.colors
		Row {
			weeks.chunked(MAX_CHILDREN).forEach { group ->
				Row {
					group.forEach { week ->
						Column {
							week.forEach { day ->
								WidgetShape(
									shape = R.drawable.widget_cell,
									color = colors.heatmap(levels[day] ?: 0),
									modifier = GlanceModifier.size(slot).padding(CELL_SPACING / 2)
								)
							}
						}
					}
				}
			}
		}
	}

	@Composable
	private fun Legend() {
		val environment = LocalWidgetEnvironment.current
		Row(verticalAlignment = Alignment.CenterVertically) {
			SecondaryText(environment.string(R.string.analytics_heatmap_less))
			Spacer(GlanceModifier.width(4.dp))
			(0..4).forEach { level ->
				WidgetShape(R.drawable.widget_cell, environment.colors.heatmap(level), GlanceModifier.size(10.dp).padding(1.dp))
			}
			Spacer(GlanceModifier.width(4.dp))
			SecondaryText(environment.string(R.string.analytics_heatmap_more))
		}
	}

	private companion object {
		const val DAYS_PER_WEEK = 7
		const val MIN_COLUMNS = 4
		const val MAX_CHILDREN = 10
		val MIN_SLOT = 6.dp
		val CELL_SPACING = 2.dp
		val BAND_GAP = 8.dp
		val GAP = 6.dp
		val LABEL_HEIGHT = 16.dp
	}
}

class HeatmapWidgetReceiver : GlanceAppWidgetReceiver() {
	override val glanceAppWidget: GlanceAppWidget = HeatmapWidget()
}
