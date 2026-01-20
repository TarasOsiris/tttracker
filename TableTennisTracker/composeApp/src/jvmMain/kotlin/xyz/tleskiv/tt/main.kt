package xyz.tleskiv.tt

import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import org.koin.core.context.startKoin
import xyz.tleskiv.tt.di.appModule
import xyz.tleskiv.tt.di.platformModule
import xyz.tleskiv.tt.ui.App
import xyz.tleskiv.tt.util.SentryInit

fun main() {
	SentryInit.init(System.getenv("SENTRY_DSN") ?: System.getProperty("sentry.dsn") ?: "")
	startKoin {
		modules(appModule, platformModule)
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