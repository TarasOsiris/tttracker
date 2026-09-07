// Previews pass fake ViewModels directly: there is no ViewModelStore to scope them to, and
// the recomposition concern the lint check guards against does not apply to a static preview.
@file:Suppress("ViewModelConstructorInComposable")

package xyz.tleskiv.tt.previews.screens

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.previews.fakes.FakeEditSessionScreenViewModel
import xyz.tleskiv.tt.ui.screens.EditSessionScreen
import xyz.tleskiv.tt.ui.theme.AppTheme

@Preview(showBackground = true)
@Composable
fun EditSessionScreenPreview() {
	AppTheme {
		EditSessionScreen(
			sessionId = "preview",
			viewModel = FakeEditSessionScreenViewModel()
		)
	}
}

@Preview(showBackground = true)
@Composable
fun EditSessionScreenErrorPreview() {
	AppTheme {
		EditSessionScreen(
			sessionId = "preview",
			viewModel = FakeEditSessionScreenViewModel(error = "Failed to load session")
		)
	}
}
