package xyz.tleskiv.tt.ui.screens

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
import androidx.compose.material.icons.outlined.BrightnessMedium
import androidx.compose.material.icons.outlined.BugReport
import androidx.compose.material.icons.outlined.Feedback
import androidx.compose.material.icons.outlined.Language
import androidx.compose.material.icons.outlined.Lock
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material.icons.outlined.Star
import androidx.compose.material3.BasicAlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource
import org.koin.compose.viewmodel.koinViewModel
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_cancel
import tabletennistracker.composeapp.generated.resources.action_general_settings
import tabletennistracker.composeapp.generated.resources.action_privacy_policy
import tabletennistracker.composeapp.generated.resources.action_rate_app
import tabletennistracker.composeapp.generated.resources.action_send_feedback
import tabletennistracker.composeapp.generated.resources.action_theme
import tabletennistracker.composeapp.generated.resources.action_visit_website
import tabletennistracker.composeapp.generated.resources.settings_section_about
import tabletennistracker.composeapp.generated.resources.settings_section_general
import tabletennistracker.composeapp.generated.resources.settings_section_help
import tabletennistracker.composeapp.generated.resources.theme_dark
import tabletennistracker.composeapp.generated.resources.theme_light
import tabletennistracker.composeapp.generated.resources.theme_select_title
import tabletennistracker.composeapp.generated.resources.theme_system
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.viewmodel.SettingsViewModel

@Composable
fun SettingsScreen(
	onNavigateToGeneralSettings: () -> Unit = {},
	onNavigateToDebug: () -> Unit = {},
	viewModel: SettingsViewModel = koinViewModel()
) {
	val uriHandler = LocalUriHandler.current
	var showThemeDialog by rememberSaveable { mutableStateOf(false) }

	if (showThemeDialog) {
		ThemeSelectionDialog(
			currentMode = viewModel.currentThemeMode.collectAsState().value,
			onDismissRequest = { showThemeDialog = false },
			onThemeSelected = { mode ->
				viewModel.setThemeMode(mode)
				showThemeDialog = false
			}
		)
	}

	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surface)
			.verticalScroll(rememberScrollState())
	) {
		Column(modifier = Modifier.padding(16.dp)) {
			// General Section
			SettingsSectionHeader(title = stringResource(Res.string.settings_section_general))
			Spacer(modifier = Modifier.height(8.dp))
			ContentCard {
				Column(modifier = Modifier.fillMaxWidth()) {
					SettingsMenuRow(
						item = SettingsMenuItem(
							Res.string.action_general_settings,
							Icons.Outlined.Settings,
							onNavigateToGeneralSettings
						),
						onClick = onNavigateToGeneralSettings
					)
					HorizontalDivider(
						modifier = Modifier.padding(start = 52.dp),
						color = MaterialTheme.colorScheme.outlineVariant,
						thickness = 0.5.dp
					)
					SettingsMenuRow(
						item = SettingsMenuItem(Res.string.action_theme, Icons.Outlined.BrightnessMedium, {}),
						onClick = { showThemeDialog = true }
					)
				}
			}

			Spacer(modifier = Modifier.height(24.dp))

			// Help Section
			SettingsSectionHeader(title = stringResource(Res.string.settings_section_help))
			Spacer(modifier = Modifier.height(8.dp))
			ContentCard {
				Column(modifier = Modifier.fillMaxWidth()) {
					SettingsMenuRow(
						item = SettingsMenuItem(Res.string.action_send_feedback, Icons.Outlined.Feedback, {}),
						onClick = { viewModel.sendFeedbackEmail() }
					)
				}
			}

			Spacer(modifier = Modifier.height(24.dp))

			// About Section
			SettingsSectionHeader(title = stringResource(Res.string.settings_section_about))
			Spacer(modifier = Modifier.height(8.dp))
			ContentCard {
				Column(modifier = Modifier.fillMaxWidth()) {
					val aboutItems = listOf(
						SettingsMenuItem(Res.string.action_visit_website, Icons.Outlined.Language, { uriHandler.openUri("https://ttapp.tleskiv.xyz") }),
						SettingsMenuItem(
							Res.string.action_privacy_policy,
							Icons.Outlined.Lock,
							{ uriHandler.openUri("https://google.com") }),
						SettingsMenuItem(Res.string.action_rate_app, Icons.Outlined.Star, { viewModel.rateApp() })
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

				SettingsSectionHeader(title = "Developer")
				Spacer(modifier = Modifier.height(8.dp))
				ContentCard {
					Column(modifier = Modifier.fillMaxWidth()) {
						SettingsMenuRow(
							item = SettingsMenuItem(Icons.Outlined.BugReport, "Debug", onNavigateToDebug),
							onClick = onNavigateToDebug
						)
					}
				}
			}

			Spacer(modifier = Modifier.height(32.dp))

			Text(
				text = "Version ${viewModel.versionName} (${viewModel.buildNumber})",
				modifier = Modifier.fillMaxWidth(),
				textAlign = androidx.compose.ui.text.style.TextAlign.Center,
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f)
			)

			Spacer(modifier = Modifier.height(16.dp))
		}
	}
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ThemeSelectionDialog(
	currentMode: AppThemeMode,
	onDismissRequest: () -> Unit,
	onThemeSelected: (AppThemeMode) -> Unit
) {
	BasicAlertDialog(
		onDismissRequest = onDismissRequest
	) {
		Surface(
			shape = MaterialTheme.shapes.large,
			color = MaterialTheme.colorScheme.surfaceContainerHigh
		) {
			Column(modifier = Modifier.padding(24.dp)) {
				Text(
					text = stringResource(Res.string.theme_select_title),
					style = MaterialTheme.typography.headlineSmall,
					color = MaterialTheme.colorScheme.onSurface
				)
				Spacer(modifier = Modifier.height(16.dp))

				AppThemeMode.entries.forEach { mode ->
					Row(
						modifier = Modifier
							.fillMaxWidth()
							.clickable { onThemeSelected(mode) }
							.padding(vertical = 8.dp),
						verticalAlignment = Alignment.CenterVertically
					) {
						RadioButton(
							selected = mode == currentMode,
							onClick = null // Handled by Row clickable
						)
						Spacer(modifier = Modifier.width(8.dp))
						Text(
							text = when (mode) {
								AppThemeMode.SYSTEM -> stringResource(Res.string.theme_system)
								AppThemeMode.LIGHT -> stringResource(Res.string.theme_light)
								AppThemeMode.DARK -> stringResource(Res.string.theme_dark)
							},
							style = MaterialTheme.typography.bodyLarge,
							color = MaterialTheme.colorScheme.onSurface
						)
					}
				}

				Spacer(modifier = Modifier.height(24.dp))

				Row(
					modifier = Modifier.fillMaxWidth(),
					horizontalArrangement = androidx.compose.foundation.layout.Arrangement.End
				) {
					TextButton(onClick = onDismissRequest) {
						Text(stringResource(Res.string.action_cancel))
					}
				}
			}
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
	val titleRes: StringResource?,
	val title: String?,
	val icon: ImageVector,
	val onClick: () -> Unit
) {
	constructor(titleRes: StringResource, icon: ImageVector, onClick: () -> Unit) : this(titleRes, null, icon, onClick)
	constructor(icon: ImageVector, title: String, onClick: () -> Unit) : this(null, title, icon, onClick)
}

@Composable
private fun SettingsMenuRow(item: SettingsMenuItem, onClick: () -> Unit) {
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
				text = item.titleRes?.let { stringResource(it) } ?: item.title ?: "",
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
