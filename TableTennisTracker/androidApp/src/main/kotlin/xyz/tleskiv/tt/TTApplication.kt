package xyz.tleskiv.tt

import android.app.Application
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.startKoin
import xyz.tleskiv.tt.di.appModule
import xyz.tleskiv.tt.di.platformModule
import xyz.tleskiv.tt.util.SentryInit

class TTApplication : Application() {

	override fun onCreate() {
		super.onCreate()

		SentryInit.init(BuildConfig.SENTRY_DSN)

		startKoin {
			androidLogger()
			androidContext(this@TTApplication)
			modules(appModule, platformModule)
		}
	}
}
