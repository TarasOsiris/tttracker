package xyz.tleskiv.tt.ui.widgets

import androidx.annotation.StringRes
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.FloatingActionButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MediumFloatingActionButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp

val FabContainerSize = 80.dp
val FabMargin = 16.dp

// Clearance a list needs so its last row can scroll clear of a floating AddFab.
val FabListBottomPadding = FabContainerSize + FabMargin * 2

@Composable
fun AddFab(
	onClick: () -> Unit,
	icon: ImageVector,
	@StringRes contentDescription: Int,
	containerColor: Color,
	contentColor: Color,
	modifier: Modifier = Modifier
) {
	MediumFloatingActionButton(
		onClick = onClick,
		modifier = modifier.padding(FabMargin),
		shape = FloatingActionButtonDefaults.mediumShape,
		containerColor = containerColor,
		contentColor = contentColor
	) {
		Icon(
			imageVector = icon,
			contentDescription = stringResource(contentDescription),
			modifier = Modifier.size(FloatingActionButtonDefaults.MediumIconSize)
		)
	}
}
