package xyz.tleskiv.tt.appwidget

import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import kotlin.reflect.KClass

/// The layouts a widget switches between as it is resized, standing in for iOS's small, medium and
/// large families. Glance picks the largest that fits the cells the launcher gives the widget.
object WidgetSizes {
	val SMALL = DpSize(100.dp, 100.dp)
	val MEDIUM = DpSize(220.dp, 100.dp)
	val LARGE = DpSize(220.dp, 220.dp)
}

object TTWidgets {
	val all: List<GlanceAppWidget>
		get() = listOf(SummaryWidget(), HeatmapWidget(), LastSessionWidget(), StreakWidget(), TrainingLoadWidget())

	val receivers: List<KClass<out GlanceAppWidgetReceiver>> = listOf(
		SummaryWidgetReceiver::class,
		HeatmapWidgetReceiver::class,
		LastSessionWidgetReceiver::class,
		StreakWidgetReceiver::class,
		TrainingLoadWidgetReceiver::class
	)
}
