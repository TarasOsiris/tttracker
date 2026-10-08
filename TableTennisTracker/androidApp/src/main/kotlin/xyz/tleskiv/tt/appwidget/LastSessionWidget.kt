package xyz.tleskiv.tt.appwidget

import androidx.compose.runtime.Composable
import androidx.glance.LocalSize
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import androidx.glance.appwidget.SizeMode
import xyz.tleskiv.tt.deeplink.DeepLink

/// When the user last trained, and how it went. A tap opens that session.
class LastSessionWidget : TTGlanceWidget() {
	override val sizeMode = SizeMode.Responsive(setOf(WidgetSizes.SMALL, WidgetSizes.MEDIUM))
	override val previewSizeMode = sizeMode

	override fun link(data: WidgetData): DeepLink = data.lastSession?.let { DeepLink.Session(it.id) } ?: DeepLink.NewSession

	@Composable
	override fun Content(data: WidgetData) {
		val session = data.lastSession
		if (session == null) {
			WidgetEmpty()
		} else {
			LastSessionDetail(session, isCompact = LocalSize.current.width < WidgetSizes.MEDIUM.width)
		}
	}
}

class LastSessionWidgetReceiver : GlanceAppWidgetReceiver() {
	override val glanceAppWidget: GlanceAppWidget = LastSessionWidget()
}
