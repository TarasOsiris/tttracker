package xyz.tleskiv.tt.pro

import com.revenuecat.purchases.CacheFetchPolicy
import com.revenuecat.purchases.CustomerInfo
import com.revenuecat.purchases.Purchases
import com.revenuecat.purchases.awaitCustomerInfo
import com.revenuecat.purchases.awaitRestore
import com.revenuecat.purchases.interfaces.UpdatedCustomerInfoListener
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.BuildConfig

/// Whether the user owns Pro, for every Pro feature and upsell. The one place "is Pro" is read from
/// RevenueCat, so no two screens can disagree about it. Mirrors `ProModel.swift`.
class ProModel {

	enum class RestoreResult { RESTORED, NOTHING_TO_RESTORE, FAILED }

	private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)

	private val _isPro = MutableStateFlow(false)
	val isPro: StateFlow<Boolean> = _isPro.asStateFlow()

	private val hidesUpsell = MutableStateFlow(false)

	/// Whether Pro is for sale and not yet owned: the PRO pill, the Settings banner and restore row.
	val showsUpsell: StateFlow<Boolean> = combine(_isPro, hidesUpsell) { isPro, hides -> !isPro && !hides }
		.stateIn(scope, SharingStarted.Eagerly, true)

	/// Whether Pro features show unlocked. The screenshot run counts as Pro, so the listing shows the
	/// features themselves rather than their locks.
	val hasProFeatures: StateFlow<Boolean> = combine(_isPro, hidesUpsell) { isPro, hides -> isPro || hides }
		.stateIn(scope, SharingStarted.Eagerly, false)

	private val hasAnswered = MutableStateFlow(false)

	/// [hasProFeatures] once RevenueCat has answered, null until then — for the home-screen widgets,
	/// which keep their own last-known value rather than show their lock while the answer is pending.
	val knownHasProFeatures: StateFlow<Boolean?> = combine(hasProFeatures, hasAnswered) { has, answered ->
		has.takeIf { answered || it }
	}.stateIn(scope, SharingStarted.Eagerly, null)

	private val _isRestoring = MutableStateFlow(false)
	val isRestoring: StateFlow<Boolean> = _isRestoring.asStateFlow()

	private val _restoreResult = MutableStateFlow<RestoreResult?>(null)
	val restoreResult: StateFlow<RestoreResult?> = _restoreResult.asStateFlow()

	private var started = false

	fun start() {
		if (started || !Purchases.isConfigured) return
		started = true
		val purchases = Purchases.sharedInstance
		purchases.updatedCustomerInfoListener = UpdatedCustomerInfoListener(::apply)
		// Seeded from RevenueCat's on-disk cache, so a returning buyer does not see the free tier for
		// the frames before the first network call lands.
		scope.launch {
			runCatching { purchases.awaitCustomerInfo(CacheFetchPolicy.CACHE_ONLY) }.getOrNull()?.let(::apply)
			runCatching { purchases.awaitCustomerInfo() }.getOrNull()?.let(::apply)
		}
	}

	fun apply(info: CustomerInfo) {
		_isPro.value = info.hasProAccess
		hasAnswered.value = true
	}

	/// The restored entitlement reaches [isPro] through the customer-info listener like any other
	/// update; the result here only picks the message.
	fun restore() {
		if (_isRestoring.value || !Purchases.isConfigured) return
		_isRestoring.value = true
		scope.launch {
			_restoreResult.value = runCatching { Purchases.sharedInstance.awaitRestore() }
				.fold(
					onSuccess = { if (it.hasProAccess) RestoreResult.RESTORED else RestoreResult.NOTHING_TO_RESTORE },
					onFailure = { RestoreResult.FAILED }
				)
			_isRestoring.value = false
		}
	}

	fun consumeRestoreResult() {
		_restoreResult.value = null
	}

	/// The Play Store screenshot run calls this, so the listing shows the app rather than the PRO
	/// pill, Settings banner and locks. Debug only: no shipped build can be asked to hide them.
	fun hideUpsellForScreenshots() {
		if (BuildConfig.DEBUG) hidesUpsell.value = true
	}
}

object ProEntitlement {
	/// Must match the entitlement identifier configured in the RevenueCat dashboard.
	const val ID = "nineva_studios_tt_tracker_pro"
}

val CustomerInfo.hasProAccess: Boolean get() = entitlements[ProEntitlement.ID]?.isActive == true
