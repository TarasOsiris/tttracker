package xyz.tleskiv.tt.appwidget

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.glance.appwidget.GlanceAppWidgetManager
import androidx.glance.appwidget.updateAll
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.debounce
import kotlinx.coroutines.flow.filterNotNull
import kotlinx.coroutines.launch
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.TimeZone
import kotlinx.datetime.atStartOfDayIn
import kotlinx.datetime.plus
import xyz.tleskiv.tt.pro.ProModel
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.util.today

/// Keeps the home-screen widgets in step with the data, for as long as the process lives.
///
/// The Android counterpart of iOS's `WidgetSnapshotWriter`, minus the file: widgets render in this
/// process and read `:core` themselves, so all this does is decide *when* to re-render. A write
/// arrives as a burst of emissions — sessions, summary, daily load — so they are coalesced, and
/// [WidgetDataSource.data] only emits when what the widgets draw actually changed.
///
/// It also carries the Pro state over to [WidgetProStore] once RevenueCat has answered, and asks
/// for a refresh at the next midnight, when the heatmap window and "this week" move on their own.
class WidgetUpdater(
	private val context: Context,
	private val dataSource: WidgetDataSource,
	private val proModel: ProModel,
	private val preferences: UserPreferencesRepository,
	private val proStore: WidgetProStore
) {
	private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
	private var started = false

	@OptIn(FlowPreview::class)
	fun start() {
		if (started) return
		started = true
		proModel.start()
		scope.launch { proModel.knownHasProFeatures.filterNotNull().collect { proStore.save(isPro = it) } }
		scope.launch { preferences.accent.collect { proStore.save(accent = it) } }
		scope.launch {
			dataSource.data.debounce(COALESCE_MS).collect {
				refreshAll(context)
				scheduleMidnightRefresh(context)
			}
		}
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) scope.launch { publishPreviews() }
	}

	/// The widget picker's previews, rendered from the real data as iOS's gallery does. API 35 and
	/// up; older launchers fall back to each provider's static `previewLayout`.
	@RequiresApi(Build.VERSION_CODES.VANILLA_ICE_CREAM)
	private suspend fun publishPreviews() {
		val manager = GlanceAppWidgetManager(context)
		TTWidgets.receivers.forEach { receiver ->
			runCatching { manager.setWidgetPreviews(receiver) }
		}
	}

	companion object {
		private const val COALESCE_MS = 250L

		suspend fun refreshAll(context: Context) {
			TTWidgets.all.forEach { it.updateAll(context) }
		}

		/// Inexact and non-waking: the refresh can wait until the device is next in use.
		fun scheduleMidnightRefresh(context: Context) {
			val alarms = context.getSystemService(AlarmManager::class.java) ?: return
			val midnight = today().plus(1, DateTimeUnit.DAY).atStartOfDayIn(TimeZone.currentSystemDefault())
			val intent = PendingIntent.getBroadcast(
				context,
				0,
				Intent(context, WidgetRefreshReceiver::class.java),
				PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
			)
			alarms.set(AlarmManager.RTC, midnight.toEpochMilliseconds(), intent)
		}
	}
}

/// The midnight refresh, for when the process — and with it the data source's day ticker — is gone.
class WidgetRefreshReceiver : BroadcastReceiver() {
	override fun onReceive(context: Context, intent: Intent) {
		val pending = goAsync()
		CoroutineScope(Dispatchers.Default).launch {
			try {
				WidgetUpdater.refreshAll(context)
				WidgetUpdater.scheduleMidnightRefresh(context)
			} finally {
				pending.finish()
			}
		}
	}
}
