package xyz.tleskiv.tt.previews.screens

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.previews.fakes.FakeGeneralSettingsScreenViewModel
import xyz.tleskiv.tt.ui.screens.GeneralSettingsScreen
import xyz.tleskiv.tt.ui.theme.AppTheme

@Preview(showBackground = true)
@Composable
fun GeneralSettingsScreenPreview() {
	AppTheme {
		GeneralSettingsScreen(
			onNavigateBack = {},
			viewModel = FakeGeneralSettingsScreenViewModel()
		)
	}
}
