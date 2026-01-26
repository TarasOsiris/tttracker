package xyz.tleskiv.tt.previews.widgets

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.title_settings
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.BackButton
import xyz.tleskiv.tt.ui.widgets.BottomBarButtons
import xyz.tleskiv.tt.ui.widgets.SimpleTopAppBar

@Preview(showBackground = true)
@Composable
fun BackButtonPreview() {
	AppTheme {
		BackButton(onClick = {})
	}
}

@Preview(showBackground = true)
@Composable
fun BottomBarButtonsPreview() {
	AppTheme {
		Column {
			BottomBarButtons(
				onLeftButtonClick = {},
				onRightButtonClick = {},
				rightButtonEnabled = true
			)
			Spacer(modifier = Modifier.height(16.dp))
			BottomBarButtons(
				onLeftButtonClick = {},
				onRightButtonClick = {},
				rightButtonEnabled = false
			)
		}
	}
}

@Preview(showBackground = true)
@Composable
fun SimpleTopAppBarPreview() {
	AppTheme {
		SimpleTopAppBar(
			title = Res.string.title_settings,
			onNavigateBack = {}
		)
	}
}
