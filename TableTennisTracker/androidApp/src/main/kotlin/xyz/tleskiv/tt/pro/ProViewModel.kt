package xyz.tleskiv.tt.pro

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.di.components.AnalyticsService

/// What the Compose UI reads Pro through: the [ProModel] state plus the paywall funnel events.
class ProViewModel(
	private val model: ProModel,
	private val analytics: AnalyticsService
) : ViewModel() {

	val showsUpsell: StateFlow<Boolean> = model.showsUpsell
	val hasProFeatures: StateFlow<Boolean> = model.hasProFeatures
	val isRestoring: StateFlow<Boolean> = model.isRestoring
	val restoreResult: StateFlow<ProModel.RestoreResult?> = model.restoreResult

	init {
		model.start()
	}

	fun restore() = model.restore()

	fun consumeRestoreResult() = model.consumeRestoreResult()

	fun onPaywallShown(source: PaywallSource) = capture("paywall_shown", source)

	fun onPurchased(source: PaywallSource) = capture("pro_purchased", source)

	fun onRestored(source: PaywallSource) = capture("pro_restored", source)

	private fun capture(event: String, source: PaywallSource) {
		analytics.capture(event, mapOf("source" to source.value))
	}
}

/// Which affordance opened the paywall, reported with every paywall event. Same values as iOS.
enum class PaywallSource(val value: String) {
	TOOLBAR("toolbar"),
	SETTINGS_BANNER("settings_banner"),
	ANALYTICS_INSIGHTS("analytics_insights"),
	ANALYTICS_RANGE("analytics_range"),
	SETTINGS_EXPORT("settings_export"),
	ACCENT_COLOR("accent_color"),
	WIDGET("widget")
}
