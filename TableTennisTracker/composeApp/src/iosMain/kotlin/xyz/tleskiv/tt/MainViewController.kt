package xyz.tleskiv.tt

import androidx.compose.ui.window.ComposeUIViewController
import org.koin.core.context.startKoin
import platform.Foundation.NSBundle
import xyz.tleskiv.tt.di.appModule
import xyz.tleskiv.tt.di.platformModule
import xyz.tleskiv.tt.ui.App
import xyz.tleskiv.tt.util.SentryInit

private var koinStarted = false

fun MainViewController() = ComposeUIViewController {
	if (!koinStarted) {
		SentryInit.init(NSBundle.mainBundle.objectForInfoDictionaryKey("SENTRY_DSN") as? String ?: "")
		startKoin {
			modules(appModule, platformModule)
		}
		koinStarted = true
	}
	App()
}
