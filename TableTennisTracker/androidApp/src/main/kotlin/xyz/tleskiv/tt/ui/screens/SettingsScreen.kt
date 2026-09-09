package xyz.tleskiv.tt.ui.screens

import androidx.annotation.StringRes
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.KeyboardArrowRight
import androidx.compose.material.icons.outlined.BugReport
import androidx.compose.material.icons.outlined.Feedback
import androidx.compose.material.icons.outlined.Language
import androidx.compose.material.icons.outlined.Lock
import androidx.compose.material.icons.outlined.People
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material.icons.outlined.Star
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.koin.compose.viewmodel.koinViewModel
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.ui.nav.navdisplay.TopAppBarState
import xyz.tleskiv.tt.ui.nav.routes.SettingsRoute
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.viewmodel.SettingsViewModel

@Composable
fun SettingsScreen(
	topAppBarState: TopAppBarState,
	onNavigateToGeneralSettings: () -> Unit = {},
	onNavigateToOpponents: () -> Unit = {},
	onNavigateToDebug: () -> Unit = {},
	viewModel: SettingsViewModel = koinViewModel()
) {
	topAppBarState.title = { Text(text = stringResource(SettingsRoute.label)) }
	topAppBarState.actions = null

	val uriHandler = LocalUriHandler.current

	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surface)
			.verticalScroll(rememberScrollState())
	) {
		Column(modifier = Modifier.padding(16.dp)) {
			SettingsSectionHeader(title = stringResource(R.string.settings_section_general))
			Spacer(modifier = Modifier.height(8.dp))
			ContentCard {
				Column(modifier = Modifier.fillMaxWidth()) {
					SettingsMenuRow(
						item = SettingsMenuItem(
							R.string.action_ui_settings,
							Icons.Outlined.Settings,
							onNavigateToGeneralSettings,
							TestTags.SETTINGS_GENERAL
						),
						onClick = onNavigateToGeneralSettings
					)
					HorizontalDivider(
						modifier = Modifier.padding(start = 52.dp),
						color = MaterialTheme.colorScheme.outlineVariant,
						thickness = 0.5.dp
					)
					SettingsMenuRow(
						item = SettingsMenuItem(
							R.string.action_opponents,
							Icons.Outlined.People,
							onNavigateToOpponents,
							TestTags.SETTINGS_OPPONENTS
						),
						onClick = onNavigateToOpponents
					)
				}
			}

			Spacer(modifier = Modifier.height(24.dp))

			SettingsSectionHeader(title = stringResource(R.string.settings_section_help))
			Spacer(modifier = Modifier.height(8.dp))
			ContentCard {
				Column(modifier = Modifier.fillMaxWidth()) {
					SettingsMenuRow(
						item = SettingsMenuItem(R.string.action_send_feedback, Icons.Outlined.Feedback, {}),
						onClick = { viewModel.sendFeedbackEmail() }
					)
				}
			}

			Spacer(modifier = Modifier.height(24.dp))

			SettingsSectionHeader(title = stringResource(R.string.settings_section_about))
			Spacer(modifier = Modifier.height(8.dp))
			ContentCard {
				Column(modifier = Modifier.fillMaxWidth()) {
					val aboutItems = listOf(
						SettingsMenuItem(
							R.string.action_visit_website,
							Icons.Outlined.Language,
							{ uriHandler.openUri("https://ttapp.tleskiv.xyz") }),
						SettingsMenuItem(
							R.string.action_privacy_policy,
							Icons.Outlined.Lock,
							{ uriHandler.openUri("https://ninevastudios.com/privacy-policy") }),
						SettingsMenuItem(R.string.action_rate_app, Icons.Outlined.Star, { viewModel.rateApp() }),
						SettingsMenuItem(
							R.string.action_copy_user_id,
							Icons.Outlined.Person,
							{ viewModel.copyUserId() })
					)

					aboutItems.forEachIndexed { index, item ->
						SettingsMenuRow(item = item, onClick = item.onClick)
						if (index < aboutItems.lastIndex) {
							HorizontalDivider(
								modifier = Modifier.padding(start = 52.dp),
								color = MaterialTheme.colorScheme.outlineVariant,
								thickness = 0.5.dp
							)
						}
					}
				}
			}

			if (viewModel.isDebugBuild) {
				Spacer(modifier = Modifier.height(24.dp))

				SettingsSectionHeader(title = stringResource(R.string.settings_section_developer))
				Spacer(modifier = Modifier.height(8.dp))
				ContentCard {
					Column(modifier = Modifier.fillMaxWidth()) {
						SettingsMenuRow(
							item = SettingsMenuItem(
								R.string.action_debug,
								Icons.Outlined.BugReport,
								onNavigateToDebug,
								TestTags.SETTINGS_DEBUG
							),
							onClick = onNavigateToDebug
						)
					}
				}
			}

			Spacer(modifier = Modifier.height(32.dp))

			Text(
				text = stringResource(R.string.settings_version_format, viewModel.versionName, viewModel.buildNumber),
				modifier = Modifier.fillMaxWidth(),
				textAlign = androidx.compose.ui.text.style.TextAlign.Center,
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f)
			)

			Spacer(modifier = Modifier.height(4.dp))

			Row(
				modifier = Modifier.fillMaxWidth(),
				horizontalArrangement = androidx.compose.foundation.layout.Arrangement.Center
			) {
				Text(
					text = stringResource(R.string.settings_made_with_prefix),
					modifier = Modifier.alignByBaseline(),
					style = MaterialTheme.typography.bodySmall,
					color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f)
				)
				Spacer(modifier = Modifier.width(4.dp))
				Text(
					text = stringResource(R.string.settings_company_name),
					modifier = Modifier.alignByBaseline().clickable { uriHandler.openUri("https://ninevastudios.com") },
					style = MaterialTheme.typography.bodySmall,
					color = MaterialTheme.colorScheme.primary.copy(alpha = 0.8f)
				)
			}

			Spacer(modifier = Modifier.height(16.dp))
		}
	}
}

@Composable
private fun SettingsSectionHeader(title: String) {
	Text(
		text = title,
		style = MaterialTheme.typography.titleSmall,
		fontWeight = FontWeight.SemiBold,
		color = MaterialTheme.colorScheme.primary,
		modifier = Modifier.padding(start = 4.dp, bottom = 4.dp)
	)
}

private data class SettingsMenuItem(
	@StringRes val titleRes: Int,
	val icon: ImageVector,
	val onClick: () -> Unit,
	/// Set only on the rows the screenshot test navigates through; their titles are localized.
	val tag: String? = null
)

@Composable
private fun SettingsMenuRow(item: SettingsMenuItem, onClick: () -> Unit) {
	Surface(
		modifier = Modifier.fillMaxWidth().then(item.tag?.let { Modifier.testTag(it) } ?: Modifier)
			.clickable(onClick = onClick),
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
				text = stringResource(item.titleRes),
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
