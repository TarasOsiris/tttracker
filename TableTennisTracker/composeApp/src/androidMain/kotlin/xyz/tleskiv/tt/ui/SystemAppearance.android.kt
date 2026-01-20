package xyz.tleskiv.tt.ui

import androidx.activity.ComponentActivity
import androidx.activity.SystemBarStyle
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.platform.LocalContext

@Composable
actual fun SystemAppearanceEffect(isDarkTheme: Boolean) {
	val context = LocalContext.current
	SideEffect {
		val activity = context as? ComponentActivity ?: return@SideEffect
		activity.enableEdgeToEdge(
			statusBarStyle = if (isDarkTheme) {
				SystemBarStyle.dark(android.graphics.Color.TRANSPARENT)
			} else {
				SystemBarStyle.light(android.graphics.Color.TRANSPARENT, android.graphics.Color.TRANSPARENT)
			},
			navigationBarStyle = if (isDarkTheme) {
				SystemBarStyle.dark(android.graphics.Color.TRANSPARENT)
			} else {
				SystemBarStyle.light(android.graphics.Color.TRANSPARENT, android.graphics.Color.TRANSPARENT)
			}
		)
	}
}
