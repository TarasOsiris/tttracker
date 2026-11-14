package xyz.tleskiv.tt

import android.app.Application
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.android.get
import org.koin.android.ext.koin.androidLogger
import xyz.tleskiv.tt.appwidget.WidgetUpdater
import xyz.tleskiv.tt.di.androidPlatformModule
import xyz.tleskiv.tt.di.components.PurchasesIdProvider
import xyz.tleskiv.tt.di.initApp
import xyz.tleskiv.tt.di.linkStoreUser

class TTApplication : Application() {

	override fun onCreate() {
		super.onCreate()

		initApp(androidPlatformModule) {
			androidLogger()
			androidContext(this@TTApplication)
		}

		PurchasesSetup.configure(this)
		linkStoreUser(get<PurchasesIdProvider>().appUserId)
		get<WidgetUpdater>().start()
	}
}
