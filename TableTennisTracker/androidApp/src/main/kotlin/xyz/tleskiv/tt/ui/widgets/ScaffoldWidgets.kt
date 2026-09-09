package xyz.tleskiv.tt.ui.widgets

import androidx.annotation.StringRes
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R

@Composable
fun BackButton(onClick: () -> Unit) {
	IconButton(onClick = onClick) {
		Icon(
			imageVector = ImageVector.vectorResource(R.drawable.ic_arrow_back),
			contentDescription = stringResource(R.string.action_back)
		)
	}
}


@Composable
fun BottomBarButtons(
	onLeftButtonClick: () -> Unit,
	onRightButtonClick: () -> Unit,
	rightButtonEnabled: Boolean,
	modifier: Modifier = Modifier
) {
	Surface(
		modifier = modifier,
		tonalElevation = 3.dp
	) {
		Row(
			modifier = Modifier
				.fillMaxWidth()
				.navigationBarsPadding()
				.padding(16.dp),
			horizontalArrangement = Arrangement.spacedBy(12.dp)
		) {
			OutlinedButton(
				onClick = onLeftButtonClick,
				modifier = Modifier.weight(1f)
			) {
				Text(stringResource(R.string.action_cancel))
			}
			Button(
				onClick = onRightButtonClick,
				enabled = rightButtonEnabled,
				modifier = Modifier.weight(1f)
			) {
				Text(stringResource(R.string.action_save))
			}
		}
	}
}


@Composable
fun SimpleTopAppBar(
	@StringRes title: Int,
	actions: @Composable RowScope.() -> Unit = {},
	onNavigateBack: () -> Unit
) {
	TopAppBar(
		title = { Text(stringResource(title)) },
		navigationIcon = { BackButton { onNavigateBack() } },
		actions = actions,
		colors = TopAppBarDefaults.topAppBarColors(
			containerColor = MaterialTheme.colorScheme.surface
		)
	)
}

