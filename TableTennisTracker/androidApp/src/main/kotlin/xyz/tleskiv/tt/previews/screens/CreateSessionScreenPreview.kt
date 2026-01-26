package xyz.tleskiv.tt.previews.screens

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.previews.fakes.FakeCreateSessionScreenViewModel
import xyz.tleskiv.tt.ui.screens.CreateSessionScreen
import xyz.tleskiv.tt.ui.theme.AppTheme

@Preview(showBackground = true)
@Composable
fun CreateSessionScreenPreview() {
	AppTheme {
		CreateSessionScreen(
			initialDate = null,
			viewModel = FakeCreateSessionScreenViewModel()
		)
	}
}
