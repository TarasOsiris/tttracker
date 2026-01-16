package xyz.tleskiv.tt.ui.widgets

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.*

@Composable
fun BackButton(onClick: () -> Unit) {
	IconButton(onClick = onClick) {
		Icon(
			imageVector = vectorResource(Res.drawable.ic_arrow_back),
			contentDescription = stringResource(Res.string.action_back)
		)
	}
}


@Composable
fun BottomBarButtons(
	onLeftButtonClick: () -> Unit,
	onRightButtonClick: () -> Unit,
	rightButtonEnabled: Boolean
) {
	Surface(
		tonalElevation = 3.dp,
		shadowElevation = 8.dp
	) {
		Row(
			modifier = Modifier
				.fillMaxWidth()
				.padding(16.dp),
			horizontalArrangement = Arrangement.spacedBy(12.dp)
		) {
			OutlinedButton(
				onClick = onLeftButtonClick,
				modifier = Modifier.weight(1f)
			) {
				Text(stringResource(Res.string.action_cancel))
			}
			Button(
				onClick = onRightButtonClick,
				enabled = rightButtonEnabled,
				modifier = Modifier.weight(1f)
			) {
				Text(stringResource(Res.string.action_save))
			}
		}
	}
}


@Composable
fun SimpleTopAppBar(
	title: StringResource,
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

