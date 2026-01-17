package xyz.tleskiv.tt.ui


import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import org.jetbrains.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.ui.nav.routes.CoreAppRoute
import xyz.tleskiv.tt.ui.nav.routes.TopLevelRoute
import xyz.tleskiv.tt.ui.nav.navdisplay.TopNavDisplay
import xyz.tleskiv.tt.ui.theme.AppTheme

@Composable
@Preview
fun App() {
	AppTheme {
		Surface(
			modifier = Modifier.fillMaxSize(),
			color = MaterialTheme.colorScheme.surface
		) {
			val topLevelBackStack = remember { mutableStateListOf<TopLevelRoute>(CoreAppRoute) }
			TopNavDisplay(topLevelBackStack)
		}
	}
}


