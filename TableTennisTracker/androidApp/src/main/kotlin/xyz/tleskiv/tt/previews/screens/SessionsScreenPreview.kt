package xyz.tleskiv.tt.previews.screens

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.previews.fakes.FakeSessionsScreenViewModel
import xyz.tleskiv.tt.ui.screens.SessionsScreen
import xyz.tleskiv.tt.ui.theme.AppTheme

@Preview(showBackground = true)
@Composable
fun SessionsScreenPreview() {
	AppTheme {
		SessionsScreen(viewModel = FakeSessionsScreenViewModel())
	}
}
