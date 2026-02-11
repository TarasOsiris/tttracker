package xyz.tleskiv.tt.previews.screens

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.previews.fakes.FakeAnalyticsService
import xyz.tleskiv.tt.previews.fakes.FakeClipboardManager
import xyz.tleskiv.tt.previews.fakes.FakeExternalAppLauncher
import xyz.tleskiv.tt.previews.fakes.FakeNativeInfoProvider
import xyz.tleskiv.tt.previews.fakes.FakeUserIdService
import xyz.tleskiv.tt.previews.fakes.FakeUserPreferencesRepository
import xyz.tleskiv.tt.ui.nav.navdisplay.TopAppBarState
import xyz.tleskiv.tt.ui.screens.SettingsScreen
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.viewmodel.SettingsViewModel

@Preview(showBackground = true)
@Composable
fun SettingsScreenPreview() {
	AppTheme {
		SettingsScreen(
			topAppBarState = TopAppBarState(),
			viewModel = SettingsViewModel(
				userPreferencesRepository = FakeUserPreferencesRepository(),
				nativeInfoProvider = FakeNativeInfoProvider(),
				externalAppLauncher = FakeExternalAppLauncher(),
				userIdService = FakeUserIdService(),
				clipboardManager = FakeClipboardManager(),
				analyticsService = FakeAnalyticsService()
			)
		)
	}
}

@Preview(showBackground = true)
@Composable
fun SettingsScreenPreviewDebug() {
	AppTheme {
		SettingsScreen(
			topAppBarState = TopAppBarState(),
			viewModel = SettingsViewModel(
				userPreferencesRepository = FakeUserPreferencesRepository(),
				nativeInfoProvider = FakeNativeInfoProvider(isDebug = true),
				externalAppLauncher = FakeExternalAppLauncher(),
				userIdService = FakeUserIdService(),
				clipboardManager = FakeClipboardManager(),
				analyticsService = FakeAnalyticsService()
			)
		)
	}
}
