package xyz.tleskiv.tt

import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import xyz.tleskiv.tt.di.initApp
import xyz.tleskiv.tt.di.platformModule
import xyz.tleskiv.tt.ui.App

fun main() {
	initApp(platformModule)

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