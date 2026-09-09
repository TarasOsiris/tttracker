package xyz.tleskiv.tt

import android.app.Application
import com.revenuecat.purchases.LogLevel
import com.revenuecat.purchases.Purchases
import com.revenuecat.purchases.PurchasesConfiguration

object PurchasesSetup {

	fun configure(application: Application) {
		if (Purchases.isConfigured || BuildConfig.REVENUECAT_API_KEY.isBlank()) return

		Purchases.logLevel = if (BuildConfig.DEBUG) LogLevel.DEBUG else LogLevel.WARN
		Purchases.configure(
			PurchasesConfiguration.Builder(application, BuildConfig.REVENUECAT_API_KEY).build()
		)
	}
}
