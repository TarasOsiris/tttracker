package xyz.tleskiv.tt.previews.screens

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.previews.fakes.FakeOpponentsScreenViewModel
import xyz.tleskiv.tt.ui.pro.LocalPro
import xyz.tleskiv.tt.ui.pro.ProState
import xyz.tleskiv.tt.ui.screens.OpponentsScreen
import xyz.tleskiv.tt.ui.theme.AppTheme

@Preview(showBackground = true)
@Composable
fun OpponentsScreenPreview() {
	AppTheme {
		OpponentsScreen(
			onNavigateBack = {},
			viewModel = FakeOpponentsScreenViewModel.withOpponents()
		)
	}
}

@Preview(showBackground = true)
@Composable
fun OpponentsScreenEmptyPreview() {
	AppTheme {
		OpponentsScreen(
			onNavigateBack = {},
			viewModel = FakeOpponentsScreenViewModel.empty()
		)
	}
}

@Preview(showBackground = true, name = "Pro")
@Composable
fun OpponentsScreenProPreview() {
	CompositionLocalProvider(LocalPro provides ProState(hasProFeatures = true)) {
		AppTheme {
			OpponentsScreen(
				onNavigateBack = {},
				viewModel = FakeOpponentsScreenViewModel.withOpponents()
			)
		}
	}
}
