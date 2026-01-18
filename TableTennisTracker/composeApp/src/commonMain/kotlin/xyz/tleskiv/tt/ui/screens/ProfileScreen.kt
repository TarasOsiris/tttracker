package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.HelpOutline
import androidx.compose.material.icons.automirrored.outlined.KeyboardArrowRight
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material.icons.outlined.Lock
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_settings
import tabletennistracker.composeapp.generated.resources.profile_guest_user
import tabletennistracker.composeapp.generated.resources.profile_menu_about
import tabletennistracker.composeapp.generated.resources.profile_menu_privacy
import tabletennistracker.composeapp.generated.resources.profile_menu_support
import tabletennistracker.composeapp.generated.resources.profile_sign_in_prompt
import xyz.tleskiv.tt.ui.widgets.ContentCard

@Composable
fun ProfileScreen(onNavigateToSettings: () -> Unit = {}) {
	val menuItems = listOf(
		ProfileMenuItem(Res.string.action_settings, Icons.Outlined.Settings, onNavigateToSettings),
		ProfileMenuItem(Res.string.profile_menu_privacy, Icons.Outlined.Lock, {}),
		ProfileMenuItem(Res.string.profile_menu_about, Icons.Outlined.Info, {}),
		ProfileMenuItem(Res.string.profile_menu_support, Icons.AutoMirrored.Outlined.HelpOutline, {})
	)

	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surface)
			.verticalScroll(rememberScrollState())
	) {
		ProfileHeader()

		Column(modifier = Modifier.padding(16.dp)) {
			ContentCard {
				Column(modifier = Modifier.fillMaxWidth()) {
					menuItems.forEachIndexed { index, item ->
						ProfileMenuRow(item = item, onClick = item.onClick)
						if (index < menuItems.lastIndex) {
							HorizontalDivider(
								modifier = Modifier.padding(start = 52.dp),
								color = MaterialTheme.colorScheme.outlineVariant,
								thickness = 0.5.dp
							)
						}
					}
				}
			}
		}
	}
}

@Composable
private fun ProfileHeader() {
	Surface(
		modifier = Modifier.fillMaxWidth(),
		color = MaterialTheme.colorScheme.primaryContainer,
		tonalElevation = 2.dp
	) {
		Row(
			modifier = Modifier
				.fillMaxWidth()
				.padding(24.dp),
			verticalAlignment = Alignment.CenterVertically
		) {
			Box(
				modifier = Modifier
					.size(72.dp)
					.clip(CircleShape)
					.background(MaterialTheme.colorScheme.primary),
				contentAlignment = Alignment.Center
			) {
				Icon(
					imageVector = Icons.Outlined.Person,
					contentDescription = null,
					modifier = Modifier.size(40.dp),
					tint = MaterialTheme.colorScheme.onPrimary
				)
			}

			Spacer(modifier = Modifier.width(16.dp))

			Column {
				Text(
					text = stringResource(Res.string.profile_guest_user),
					style = MaterialTheme.typography.titleLarge,
					fontWeight = FontWeight.SemiBold,
					color = MaterialTheme.colorScheme.onPrimaryContainer
				)
				Spacer(modifier = Modifier.height(4.dp))
				Text(
					text = stringResource(Res.string.profile_sign_in_prompt),
					style = MaterialTheme.typography.bodyMedium,
					color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.7f)
				)
			}
		}
	}
}

private data class ProfileMenuItem(
	val title: StringResource,
	val icon: ImageVector,
	val onClick: () -> Unit
)

@Composable
private fun ProfileMenuRow(item: ProfileMenuItem, onClick: () -> Unit) {
	Surface(
		modifier = Modifier.fillMaxWidth().clickable(onClick = onClick),
		color = MaterialTheme.colorScheme.surfaceContainerLow
	) {
		Row(
			modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 14.dp),
			verticalAlignment = Alignment.CenterVertically
		) {
			Icon(
				imageVector = item.icon,
				contentDescription = null,
				tint = MaterialTheme.colorScheme.onSurfaceVariant
			)
			Spacer(modifier = Modifier.width(16.dp))
			Text(
				text = stringResource(item.title),
				modifier = Modifier.weight(1f),
				style = MaterialTheme.typography.bodyLarge,
				color = MaterialTheme.colorScheme.onSurface
			)
			Icon(
				imageVector = Icons.AutoMirrored.Outlined.KeyboardArrowRight,
				contentDescription = null,
				tint = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.5f)
			)
		}
	}
}
