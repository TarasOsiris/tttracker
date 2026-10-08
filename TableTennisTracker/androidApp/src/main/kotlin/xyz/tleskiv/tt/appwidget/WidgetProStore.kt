package xyz.tleskiv.tt.appwidget

import android.content.Context
import androidx.core.content.edit
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import xyz.tleskiv.tt.model.AppAccent

/// The last Pro state the app knew, kept on disk for the widgets.
///
/// The widget host can start the process to render a widget long before RevenueCat answers, and
/// [xyz.tleskiv.tt.pro.ProModel] starts out at "free" until it does; reading it directly would flash
/// every Pro widget's lock, and the free accent, on each cold start. This plays the part of
/// `isPro`/`accent` in iOS's snapshot file.
class WidgetProStore(context: Context) {
	private val preferences = context.getSharedPreferences(FILE, Context.MODE_PRIVATE)

	private val _state = MutableStateFlow(read())
	val state: StateFlow<WidgetProState> = _state.asStateFlow()

	fun save(isPro: Boolean? = null, accent: AppAccent? = null) {
		val current = _state.value
		val next = WidgetProState(isPro = isPro ?: current.isPro, accent = accent ?: current.accent)
		if (next == current) return
		preferences.edit {
			putBoolean(KEY_IS_PRO, next.isPro)
			putString(KEY_ACCENT, next.accent.name)
		}
		_state.value = next
	}

	private fun read() = WidgetProState(
		isPro = preferences.getBoolean(KEY_IS_PRO, false),
		accent = preferences.getString(KEY_ACCENT, null)
			?.let { name -> AppAccent.entries.firstOrNull { it.name == name } }
			?: AppAccent.DEFAULT
	)

	private companion object {
		const val FILE = "widget_pro_state"
		const val KEY_IS_PRO = "is_pro"
		const val KEY_ACCENT = "accent"
	}
}
