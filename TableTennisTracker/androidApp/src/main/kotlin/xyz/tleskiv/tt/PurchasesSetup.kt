package xyz.tleskiv.tt

import android.app.Application
import com.revenuecat.purchases.LogLevel
import com.revenuecat.purchases.Purchases
import com.revenuecat.purchases.PurchasesConfiguration

object PurchasesSetup {

	/** RevenueCat stays off in debug builds and under instrumentation, which then count as Pro. */
	val isEnabled: Boolean by lazy { !BuildConfig.DEBUG && !isRunningTests() }

	fun configure(application: Application) {
		if (!isEnabled || Purchases.isConfigured || BuildConfig.REVENUECAT_API_KEY.isBlank()) return

		Purchases.logLevel = LogLevel.WARN
		Purchases.configure(
			PurchasesConfiguration.Builder(application, BuildConfig.REVENUECAT_API_KEY).build()
		)
	}

	private fun isRunningTests(): Boolean =
		runCatching { Class.forName("androidx.test.platform.app.InstrumentationRegistry") }.isSuccess
}
