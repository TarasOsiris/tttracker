package xyz.tleskiv.tt.previews.screens

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.previews.fakes.FakeSessionDetailsScreenViewModel
import xyz.tleskiv.tt.ui.screens.SessionDetailsScreen
import xyz.tleskiv.tt.ui.theme.AppTheme

@Preview(showBackground = true)
@Composable
fun SessionDetailsScreenPreview() {
	AppTheme {
		SessionDetailsScreen(
			sessionId = "preview",
			viewModel = FakeSessionDetailsScreenViewModel.withData()
		)
	}
}

@Preview(showBackground = true)
@Composable
fun SessionDetailsScreenLoadingPreview() {
	AppTheme {
		SessionDetailsScreen(
			sessionId = "preview",
			viewModel = FakeSessionDetailsScreenViewModel.loading()
		)
	}
}

@Preview(showBackground = true)
@Composable
fun SessionDetailsScreenErrorPreview() {
	AppTheme {
		SessionDetailsScreen(
			sessionId = "preview",
			viewModel = FakeSessionDetailsScreenViewModel.error()
		)
	}
}
