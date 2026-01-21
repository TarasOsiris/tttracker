package xyz.tleskiv.tt.ui.widgets

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
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_back
import tabletennistracker.composeapp.generated.resources.action_cancel
import tabletennistracker.composeapp.generated.resources.action_save
import tabletennistracker.composeapp.generated.resources.ic_arrow_back

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
	rightButtonEnabled: Boolean,
	modifier: Modifier = Modifier
) {
	Surface(
		modifier = modifier.navigationBarsPadding(),
		tonalElevation = 3.dp
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

