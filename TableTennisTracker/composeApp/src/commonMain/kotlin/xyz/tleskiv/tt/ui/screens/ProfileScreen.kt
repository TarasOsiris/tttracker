package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.HelpOutline
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material.icons.outlined.Lock
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_settings
import tabletennistracker.composeapp.generated.resources.profile_menu_about
import tabletennistracker.composeapp.generated.resources.profile_menu_privacy
import tabletennistracker.composeapp.generated.resources.profile_menu_support
import tabletennistracker.composeapp.generated.resources.title_profile
import xyz.tleskiv.tt.ui.widgets.ContentCard

@Composable
fun ProfileScreen() {
	val menuItems = listOf(
		ProfileMenuItem(Res.string.action_settings, Icons.Outlined.Settings),
		ProfileMenuItem(Res.string.profile_menu_privacy, Icons.Outlined.Lock),
		ProfileMenuItem(Res.string.profile_menu_about, Icons.Outlined.Info),
		ProfileMenuItem(Res.string.profile_menu_support, Icons.Outlined.HelpOutline)
	)

	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surfaceVariant)
			.padding(16.dp),
		horizontalAlignment = Alignment.CenterHorizontally,
		verticalArrangement = Arrangement.Top
	) {
		Text(
			text = stringResource(Res.string.title_profile),
			style = MaterialTheme.typography.headlineMedium,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
		Spacer(modifier = Modifier.height(24.dp))
		ContentCard {
			Column(modifier = Modifier.fillMaxWidth()) {
				menuItems.forEachIndexed { index, item ->
					ProfileMenuRow(item = item)
					if (index < menuItems.lastIndex) {
						HorizontalDivider(
							color = MaterialTheme.colorScheme.outlineVariant,
							thickness = 0.5.dp
						)
					}
				}
			}
		}
	}
}

private data class ProfileMenuItem(
	val title: StringResource,
	val icon: ImageVector
)

@Composable
private fun ProfileMenuRow(item: ProfileMenuItem) {
	Row(
		modifier = Modifier
			.fillMaxWidth()
			.padding(horizontal = 16.dp, vertical = 14.dp),
		verticalAlignment = Alignment.CenterVertically
	) {
		Icon(
			imageVector = item.icon,
			contentDescription = null,
			tint = MaterialTheme.colorScheme.primary
		)
		Spacer(modifier = Modifier.width(12.dp))
		Text(
			text = stringResource(item.title),
			style = MaterialTheme.typography.bodyLarge,
			color = MaterialTheme.colorScheme.onSurface
		)
	}
}
