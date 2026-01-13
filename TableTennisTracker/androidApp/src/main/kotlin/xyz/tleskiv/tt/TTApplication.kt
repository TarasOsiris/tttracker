package xyz.tleskiv.tt

import android.app.Application
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.startKoin
import xyz.tleskiv.tt.di.appModule

class TTApplication : Application() {

	override fun onCreate() {
		super.onCreate()

		startKoin {
			androidLogger()
			androidContext(this@TTApplication)
			modules(appModule)
		}
	}
}
