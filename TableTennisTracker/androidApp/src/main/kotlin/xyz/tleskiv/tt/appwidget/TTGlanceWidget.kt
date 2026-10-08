package xyz.tleskiv.tt.appwidget

import android.content.Context
import android.os.Build
import androidx.annotation.StringRes
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.unit.dp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.GlanceTheme
import androidx.glance.action.clickable
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.action.actionStartActivity
import androidx.glance.appwidget.appWidgetBackground
import androidx.glance.appwidget.cornerRadius
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.layout.Alignment
import androidx.glance.layout.Box
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.padding
import org.koin.core.context.GlobalContext
import xyz.tleskiv.tt.deeplink.DeepLink
import xyz.tleskiv.tt.deeplink.intent

/// What the five home-screen widgets share: where their data comes from, the theme and language
/// they draw in, the background, and where a tap goes.
///
/// The content collects [WidgetDataSource.data] rather than reading it once: Glance keeps a widget's
/// session alive for a while after it renders, and an update during that time recomposes the
/// running content instead of calling [provideGlance] again.
abstract class TTGlanceWidget : GlanceAppWidget() {
	/// A Pro widget shows [ProWidgetLock] without Pro, everywhere but the widget picker.
	protected open val lock: ProLock? = null

	protected abstract fun link(data: WidgetData): DeepLink

	@Composable
	protected abstract fun Content(data: WidgetData)

	override suspend fun provideGlance(context: Context, id: GlanceId) {
		val source = dataSource()
		val initial = source.current()
		provideContent {
			val data by remember { source.data }.collectAsState(initial)
			Widget(context, data, isPreview = false)
		}
	}

	/// The picker shows the widget itself, unlocked, as iOS's gallery does — with the user's own data,
	/// or a sample until there is some.
	override suspend fun providePreview(context: Context, widgetCategory: Int) {
		val current = dataSource().current()
		val data = if (current.isEmpty) WidgetSample.data(current) else current
		provideContent { Widget(context, data, isPreview = true) }
	}

	@Composable
	private fun Widget(context: Context, data: WidgetData, isPreview: Boolean) {
		val environment = remember(data.locale, data.accent) { WidgetEnvironment(context, data.locale, data.accent) }
		val lock = lock.takeUnless { data.pro.isPro || isPreview }
		val target = when {
			lock != null -> DeepLink.Pro
			data.isEmpty -> DeepLink.NewSession
			else -> link(data)
		}
		CompositionLocalProvider(LocalWidgetEnvironment provides environment) {
			GlanceTheme(colors = environment.colors.providers) {
				Box(
					modifier = GlanceModifier
						.fillMaxSize()
						.appWidgetBackground()
						.background(GlanceTheme.colors.widgetBackground)
						.systemCornerRadius()
						.padding(WIDGET_PADDING)
						.clickable(actionStartActivity(target.intent(context))),
					contentAlignment = Alignment.Center
				) {
					if (lock != null) ProWidgetLock(environment.string(lock.name), lock.symbol) else Content(data)
				}
			}
		}
	}

	private fun dataSource(): WidgetDataSource = GlobalContext.get().get()

	private fun GlanceModifier.systemCornerRadius(): GlanceModifier =
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) cornerRadius(android.R.dimen.system_app_widget_background_radius) else this

	data class ProLock(@StringRes val name: Int, val symbol: String)

	companion object {
		val WIDGET_PADDING = 12.dp
	}
}
