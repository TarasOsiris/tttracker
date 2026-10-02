package xyz.tleskiv.tt.di.components

import com.revenuecat.purchases.Purchases

class AndroidPurchasesIdProvider : PurchasesIdProvider {
	override val appUserId: String?
		get() = if (Purchases.isConfigured) Purchases.sharedInstance.appUserID else null
}
