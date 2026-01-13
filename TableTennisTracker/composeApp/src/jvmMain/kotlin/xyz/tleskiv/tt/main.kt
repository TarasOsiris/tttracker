package xyz.tleskiv.tt

import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import org.koin.core.context.startKoin
import xyz.tleskiv.tt.di.appModule
import xyz.tleskiv.tt.ui.App

fun main() {
	startKoin {
		modules(appModule)
	}

	application {
		Window(
			onCloseRequest = ::exitApplication,
			title = "TableTennisTracker",
		) {
			App()
		}
    }
}