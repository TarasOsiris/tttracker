package xyz.tleskiv.tt.ui.nav.navdisplay

import androidx.compose.runtime.Composable
import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue

@Stable
class TopAppBarState {
	var title: (@Composable () -> Unit)? by mutableStateOf(null)
	var actions: (@Composable () -> Unit)? by mutableStateOf(null)
}
