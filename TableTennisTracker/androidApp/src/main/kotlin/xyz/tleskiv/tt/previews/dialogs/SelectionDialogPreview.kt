package xyz.tleskiv.tt.previews.dialogs

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.ui.dialogs.SelectionDialog
import xyz.tleskiv.tt.ui.theme.AppTheme

@Preview(showBackground = true)
@Composable
fun SelectionDialogPreview() {
	val options = listOf("Option 1", "Option 2", "Option 3", "Option 4", "Option 5")
	AppTheme {
		SelectionDialog(
			title = "Select an option",
			options = options,
			currentSelection = options[1],
			onDismissRequest = {},
			onOptionSelected = {},
			optionLabel = { it }
		)
	}
}
