package xyz.tleskiv.tt.previews.screens

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.ui.theme.AppTheme

// Note: DebugScreen uses a concrete ViewModel class with dependencies,
// so it requires a different approach for previews.
// Consider refactoring DebugScreenViewModel to be abstract like other ViewModels.

@Preview(showBackground = true)
@Composable
fun DebugScreenPreview() {
	AppTheme {
		// DebugScreen requires concrete ViewModel with dependencies
		// Preview not available without refactoring
	}
}
