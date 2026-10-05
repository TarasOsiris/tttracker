package xyz.tleskiv.tt.di.components

import com.revenuecat.purchases.Purchases
import xyz.tleskiv.tt.PurchasesSetup

class AndroidPurchasesIdProvider : PurchasesIdProvider {
	override val appUserId: String?
		get() = if (PurchasesSetup.isEnabled && Purchases.isConfigured) Purchases.sharedInstance.appUserID else null
}
