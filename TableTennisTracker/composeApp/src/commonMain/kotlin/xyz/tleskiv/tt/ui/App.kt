package xyz.tleskiv.tt.ui


import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import org.koin.compose.viewmodel.koinViewModel
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.ui.nav.navdisplay.TopNavDisplay
import xyz.tleskiv.tt.ui.nav.routes.CoreAppRoute
import xyz.tleskiv.tt.ui.nav.routes.TopLevelRoute
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.viewmodel.AppViewModel

@Composable
@Preview
fun App() {
	val viewModel = koinViewModel<AppViewModel>()
	val themeMode by viewModel.themeMode.collectAsState()

	val currentTheme = themeMode ?: return

	val darkTheme = when (currentTheme) {
		AppThemeMode.SYSTEM -> isSystemInDarkTheme()
		AppThemeMode.LIGHT -> false
		AppThemeMode.DARK -> true
	}

	SystemAppearanceEffect(isDarkTheme = darkTheme)

	AppTheme(darkTheme = darkTheme) {
		Surface(
			modifier = Modifier.fillMaxSize(),
			color = MaterialTheme.colorScheme.surface
		) {
			val topLevelBackStack = remember { mutableStateListOf<TopLevelRoute>(CoreAppRoute) }
			TopNavDisplay(topLevelBackStack)
		}
	}
}


