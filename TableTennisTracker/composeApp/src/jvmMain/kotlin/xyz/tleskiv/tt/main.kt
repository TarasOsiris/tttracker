package xyz.tleskiv.tt

import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import xyz.tleskiv.tt.ui.App

fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "TableTennisTracker",
    ) {
	    App()
    }
}