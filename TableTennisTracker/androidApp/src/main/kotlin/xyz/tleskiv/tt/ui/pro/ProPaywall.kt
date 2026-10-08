package xyz.tleskiv.tt.ui.pro

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.revenuecat.purchases.CustomerInfo
import com.revenuecat.purchases.Purchases
import com.revenuecat.purchases.models.StoreTransaction
import com.revenuecat.purchases.ui.revenuecatui.PaywallDialog
import com.revenuecat.purchases.ui.revenuecatui.PaywallDialogOptions
import com.revenuecat.purchases.ui.revenuecatui.PaywallListener
import org.koin.compose.viewmodel.koinViewModel
import xyz.tleskiv.tt.pro.PaywallSource
import xyz.tleskiv.tt.pro.ProModel
import xyz.tleskiv.tt.pro.ProViewModel
import xyz.tleskiv.tt.pro.hasProAccess

/// What every Pro surface reads: whether to sell Pro, whether its features are unlocked, and how to
/// open the paywall from wherever the user is.
@Immutable
data class ProState(
	val showsUpsell: Boolean = false,
	val hasProFeatures: Boolean = false,
	val isRestoring: Boolean = false,
	val restoreResult: ProModel.RestoreResult? = null,
	val consumeRestoreResult: () -> Unit = {},
	val openPaywall: (PaywallSource) -> Unit = {},
	val restore: () -> Unit = {}
)

val LocalPro = staticCompositionLocalOf { ProState() }

/// Provides [LocalPro] to the app and hosts the one paywall. The paywall itself is RevenueCat's:
/// designed in their dashboard and fetched at runtime — the same one iOS shows — so copy, layout and
/// pricing change without an app release. This host only reports the funnel and gets out of the way
/// once the entitlement lands.
@Composable
fun ProHost(viewModel: ProViewModel = koinViewModel(), content: @Composable () -> Unit) {
	val showsUpsell by viewModel.showsUpsell.collectAsStateWithLifecycle()
	val hasProFeatures by viewModel.hasProFeatures.collectAsStateWithLifecycle()
	val isRestoring by viewModel.isRestoring.collectAsStateWithLifecycle()
	val restoreResult by viewModel.restoreResult.collectAsStateWithLifecycle()
	var paywallSource by rememberSaveable { mutableStateOf<PaywallSource?>(null) }

	val state = remember(showsUpsell, hasProFeatures, isRestoring, restoreResult) {
		ProState(
			showsUpsell = showsUpsell,
			hasProFeatures = hasProFeatures,
			isRestoring = isRestoring,
			restoreResult = restoreResult,
			consumeRestoreResult = viewModel::consumeRestoreResult,
			openPaywall = { if (Purchases.isConfigured) paywallSource = it },
			restore = viewModel::restore
		)
	}

	CompositionLocalProvider(LocalPro provides state) {
		content()
	}

	paywallSource?.let { source ->
		ProPaywallDialog(
			source = source,
			viewModel = viewModel,
			onDismiss = { paywallSource = null }
		)
	}
}

/// Dismissible by its close button and by back — Play, like App Review, wants an obvious way out.
@Composable
private fun ProPaywallDialog(source: PaywallSource, viewModel: ProViewModel, onDismiss: () -> Unit) {
	LaunchedEffect(source) { viewModel.onPaywallShown(source) }

	val options = remember(source) {
		PaywallDialogOptions.Builder()
			.setDismissRequest(onDismiss)
			.setShouldDisplayDismissButton(true)
			.setListener(object : PaywallListener {
				override fun onPurchaseCompleted(customerInfo: CustomerInfo, storeTransaction: StoreTransaction) {
					if (!customerInfo.hasProAccess) return
					viewModel.onPurchased(source)
					onDismiss()
				}

				// Fires for every restore attempt, including one that found nothing to restore.
				override fun onRestoreCompleted(customerInfo: CustomerInfo) {
					if (!customerInfo.hasProAccess) return
					viewModel.onRestored(source)
					onDismiss()
				}
			})
			.build()
	}

	PaywallDialog(options)
}
