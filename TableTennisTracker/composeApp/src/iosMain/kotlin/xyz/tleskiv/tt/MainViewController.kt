package xyz.tleskiv.tt

import androidx.compose.ui.window.ComposeUIViewController
import xyz.tleskiv.tt.di.initApp
import xyz.tleskiv.tt.di.iosPlatformModule
import xyz.tleskiv.tt.ui.App

private var koinStarted = false

fun MainViewController() = ComposeUIViewController {
	if (!koinStarted) {
		initApp(iosPlatformModule)
		koinStarted = true
	}
	App()
}
