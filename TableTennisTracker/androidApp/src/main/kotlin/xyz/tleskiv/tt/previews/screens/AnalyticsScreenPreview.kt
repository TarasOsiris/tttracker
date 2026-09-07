// Previews pass fake ViewModels directly: there is no ViewModelStore to scope them to, and
// the recomposition concern the lint check guards against does not apply to a static preview.
@file:Suppress("ViewModelConstructorInComposable")

package xyz.tleskiv.tt.previews.screens

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.previews.fakes.FakeAnalyticsScreenViewModel
import xyz.tleskiv.tt.ui.nav.navdisplay.TopAppBarState
import xyz.tleskiv.tt.ui.screens.AnalyticsScreen
import xyz.tleskiv.tt.ui.theme.AppTheme

@Preview(showBackground = true)
@Composable
fun AnalyticsScreenPreview() {
	AppTheme {
		AnalyticsScreen(topAppBarState = TopAppBarState(), viewModel = FakeAnalyticsScreenViewModel())
	}
}
