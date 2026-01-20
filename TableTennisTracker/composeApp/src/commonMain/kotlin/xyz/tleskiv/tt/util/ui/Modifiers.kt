package xyz.tleskiv.tt.util.ui

import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusManager
import androidx.compose.ui.input.pointer.pointerInput

fun Modifier.clearFocusOnTap(focusManager: FocusManager): Modifier = this.pointerInput(Unit) {
	detectTapGestures(onTap = { focusManager.clearFocus() })
}
