package xyz.tleskiv.tt

import android.app.Application
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import xyz.tleskiv.tt.di.androidPlatformModule
import xyz.tleskiv.tt.di.initApp

class TTApplication : Application() {

	override fun onCreate() {
		super.onCreate()

		initApp(androidPlatformModule) {
			androidLogger()
			androidContext(this@TTApplication)
		}
	}
}
