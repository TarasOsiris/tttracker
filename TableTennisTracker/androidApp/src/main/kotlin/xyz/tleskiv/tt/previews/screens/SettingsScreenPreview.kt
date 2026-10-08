// Previews pass fake ViewModels directly: there is no ViewModelStore to scope them to, and
// the recomposition concern the lint check guards against does not apply to a static preview.
@file:Suppress("ViewModelConstructorInComposable")

package xyz.tleskiv.tt.previews.screens

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.previews.fakes.FakeAnalyticsService
import xyz.tleskiv.tt.previews.fakes.FakeClipboardManager
import xyz.tleskiv.tt.previews.fakes.FakeDataExportViewModel
import xyz.tleskiv.tt.previews.fakes.FakeExternalAppLauncher
import xyz.tleskiv.tt.previews.fakes.FakeNativeInfoProvider
import xyz.tleskiv.tt.previews.fakes.FakePurchasesIdProvider
import xyz.tleskiv.tt.previews.fakes.FakeUserIdService
import xyz.tleskiv.tt.previews.fakes.FakeUserPreferencesRepository
import xyz.tleskiv.tt.ui.pro.LocalPro
import xyz.tleskiv.tt.ui.pro.ProState
import xyz.tleskiv.tt.ui.screens.SettingsScreen
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.viewmodel.SettingsViewModel

@Preview(showBackground = true)
@Composable
fun SettingsScreenPreview() {
	AppTheme {
		SettingsScreen(
			onNavigateBack = {},
			viewModel = SettingsViewModel(
				userPreferencesRepository = FakeUserPreferencesRepository(),
				nativeInfoProvider = FakeNativeInfoProvider(),
				externalAppLauncher = FakeExternalAppLauncher(),
				userIdService = FakeUserIdService(),
				clipboardManager = FakeClipboardManager(),
				purchasesIdProvider = FakePurchasesIdProvider(),
				analyticsService = FakeAnalyticsService()
			),
			exportViewModel = FakeDataExportViewModel()
		)
	}
}

@Preview(showBackground = true)
@Composable
fun SettingsScreenPreviewUpsell() {
	AppTheme {
		CompositionLocalProvider(LocalPro provides ProState(showsUpsell = true)) {
			SettingsScreen(
				onNavigateBack = {},
				viewModel = SettingsViewModel(
					userPreferencesRepository = FakeUserPreferencesRepository(),
					nativeInfoProvider = FakeNativeInfoProvider(),
					externalAppLauncher = FakeExternalAppLauncher(),
					userIdService = FakeUserIdService(),
					clipboardManager = FakeClipboardManager(),
					purchasesIdProvider = FakePurchasesIdProvider(),
					analyticsService = FakeAnalyticsService()
				),
				exportViewModel = FakeDataExportViewModel()
			)
		}
	}
}

@Preview(showBackground = true)
@Composable
fun SettingsScreenPreviewDebug() {
	AppTheme {
		SettingsScreen(
			onNavigateBack = {},
			viewModel = SettingsViewModel(
				userPreferencesRepository = FakeUserPreferencesRepository(),
				nativeInfoProvider = FakeNativeInfoProvider(isDebug = true),
				externalAppLauncher = FakeExternalAppLauncher(),
				userIdService = FakeUserIdService(),
				clipboardManager = FakeClipboardManager(),
				purchasesIdProvider = FakePurchasesIdProvider(),
				analyticsService = FakeAnalyticsService()
			),
			exportViewModel = FakeDataExportViewModel()
		)
	}
}
