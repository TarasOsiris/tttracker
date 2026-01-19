package xyz.tleskiv.tt.ui.nav.navdisplay

import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue

@Stable
class TopAppBarState {
	var title: (@Composable () -> Unit)? by mutableStateOf(null)
	var actions: (@Composable () -> Unit)? by mutableStateOf(null)
}

/**
 * Registers cleanup for TopAppBar content when the composable leaves composition.
 * Call this once in screens that set custom TopAppBar content.
 */
@Composable
fun RegisterTopAppBarCleanup(state: TopAppBarState) {
	DisposableEffect(state) {
		onDispose {
			state.title = null
			state.actions = null
		}
	}
}
