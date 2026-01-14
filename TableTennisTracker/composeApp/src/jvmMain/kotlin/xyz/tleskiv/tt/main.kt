package xyz.tleskiv.tt

import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
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
			state = rememberWindowState(width = 400.dp, height = 800.dp),
		) {
			App()
		}
    }
}