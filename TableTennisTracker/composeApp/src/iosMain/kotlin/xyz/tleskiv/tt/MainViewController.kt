package xyz.tleskiv.tt

import androidx.compose.ui.window.ComposeUIViewController
import org.koin.core.context.startKoin
import xyz.tleskiv.tt.di.appModule
import xyz.tleskiv.tt.di.platformModule
import xyz.tleskiv.tt.ui.App

private var koinStarted = false

fun MainViewController() = ComposeUIViewController {
	if (!koinStarted) {
		startKoin {
			modules(appModule, platformModule)
		}
		koinStarted = true
	}
	App()
}