package xyz.tleskiv.tt.previews.fakes

import xyz.tleskiv.tt.di.components.PurchasesIdProvider

class FakePurchasesIdProvider : PurchasesIdProvider {
	override val appUserId: String? = null
}
