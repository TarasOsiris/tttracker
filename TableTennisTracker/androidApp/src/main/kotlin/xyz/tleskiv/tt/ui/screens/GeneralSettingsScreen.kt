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
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.outlined.KeyboardArrowRight
import androidx.compose.material.icons.outlined.BrightnessMedium
import androidx.compose.material.icons.outlined.CalendarMonth
import androidx.compose.material.icons.outlined.Language
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import org.koin.compose.viewmodel.koinViewModel
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.model.WeekStartDay
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.ui.dialogs.SelectionDialog
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.ui.widgets.fields.DurationField
import xyz.tleskiv.tt.ui.widgets.fields.NotesField
import xyz.tleskiv.tt.ui.widgets.fields.RpeField
import xyz.tleskiv.tt.ui.widgets.fields.SessionTypeField
import xyz.tleskiv.tt.util.ui.collectAsMutableState
import xyz.tleskiv.tt.viewmodel.settings.GeneralSettingsScreenViewModel

@Composable
fun GeneralSettingsScreen(
	onNavigateBack: () -> Unit,
	viewModel: GeneralSettingsScreenViewModel = koinViewModel()
) {
	var defaultDuration by viewModel.inputData.defaultSessionDuration.collectAsMutableState()
	var defaultRpe by viewModel.inputData.defaultRpe.collectAsMutableState()
	var defaultSessionType by viewModel.inputData.defaultSessionType.collectAsMutableState()
	var defaultNotes by viewModel.inputData.defaultNotes.collectAsMutableState()
	val themeMode by viewModel.themeMode.collectAsStateWithLifecycle()
	val weekStartDay by viewModel.weekStartDay.collectAsStateWithLifecycle()
	val highlightCurrentDay by viewModel.highlightCurrentDay.collectAsStateWithLifecycle()
	val appLocale by viewModel.appLocale.collectAsStateWithLifecycle()
	var showThemeDialog by rememberSaveable { mutableStateOf(false) }
	var showWeekStartDialog by rememberSaveable { mutableStateOf(false) }
	var showLanguageDialog by rememberSaveable { mutableStateOf(false) }

	if (showThemeDialog) {
		SelectionDialog(
			title = stringResource(R.string.theme_select_title),
			options = AppThemeMode.entries,
			currentSelection = themeMode,
			onDismissRequest = { showThemeDialog = false },
			onOptionSelected = { mode ->
				viewModel.setThemeMode(mode)
				showThemeDialog = false
			},
			optionLabel = { mode ->
				when (mode) {
					AppThemeMode.SYSTEM -> stringResource(R.string.theme_system)
					AppThemeMode.LIGHT -> stringResource(R.string.theme_light)
					AppThemeMode.DARK -> stringResource(R.string.theme_dark)
				}
			}
		)
	}

	if (showWeekStartDialog) {
		SelectionDialog(
			title = stringResource(R.string.week_start_select_title),
			options = WeekStartDay.entries,
			currentSelection = weekStartDay,
			onDismissRequest = { showWeekStartDialog = false },
			onOptionSelected = { day ->
				viewModel.setWeekStartDay(day)
				showWeekStartDialog = false
			},
			optionLabel = { day ->
				when (day) {
					WeekStartDay.MONDAY -> stringResource(R.string.week_start_monday)
					WeekStartDay.SUNDAY -> stringResource(R.string.week_start_sunday)
					WeekStartDay.SATURDAY -> stringResource(R.string.week_start_saturday)
				}
			}
		)
	}

	if (showLanguageDialog) {
		SelectionDialog(
			title = stringResource(R.string.language_select_title),
			options = AppLocale.entries,
			currentSelection = appLocale,
			onDismissRequest = { showLanguageDialog = false },
			onOptionSelected = { locale ->
				viewModel.setAppLocale(locale)
				showLanguageDialog = false
			},
			optionLabel = { it.displayName }
		)
	}

	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surface)
			.testTag(TestTags.SCREEN_GENERAL)
	) {
		SettingsTopBar(onNavigateBack = onNavigateBack)

		Column(
			modifier = Modifier
				.fillMaxSize()
				.verticalScroll(rememberScrollState())
				.padding(16.dp)
		) {
			SettingsSectionHeader(stringResource(R.string.settings_section_appearance))
			Spacer(modifier = Modifier.height(8.dp))
			ContentCard {
				Column {
					ThemeRow(
						currentMode = themeMode,
						onClick = { showThemeDialog = true }
					)
					HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
					LanguageRow(
						currentLocale = appLocale,
						onClick = { showLanguageDialog = true }
					)
				}
			}

			Spacer(modifier = Modifier.height(24.dp))

			SettingsSectionHeader(stringResource(R.string.settings_section_calendar))
			Spacer(modifier = Modifier.height(8.dp))
			ContentCard {
				Column {
					WeekStartRow(
						currentDay = weekStartDay,
						onClick = { showWeekStartDialog = true }
					)
					HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
					HighlightCurrentDayRow(
						enabled = highlightCurrentDay,
						onToggle = { viewModel.setHighlightCurrentDay(it) }
					)
				}
			}

			Spacer(modifier = Modifier.height(24.dp))

			SettingsSectionHeader(stringResource(R.string.settings_section_sessions))
			Spacer(modifier = Modifier.height(8.dp))

			ContentCard {
				Column(modifier = Modifier.padding(16.dp)) {
					DurationField(durationMinutes = defaultDuration, onDurationChange = { defaultDuration = it })

					HorizontalDivider(
						modifier = Modifier.padding(vertical = 16.dp),
						color = MaterialTheme.colorScheme.outlineVariant
					)

					RpeField(
						rpeValue = defaultRpe,
						onRpeChange = { defaultRpe = it }
					)

					HorizontalDivider(
						modifier = Modifier.padding(vertical = 16.dp),
						color = MaterialTheme.colorScheme.outlineVariant
					)

					SessionTypeField(
						selectedType = defaultSessionType,
						onTypeSelected = { defaultSessionType = it }
					)

					HorizontalDivider(
						modifier = Modifier.padding(vertical = 16.dp),
						color = MaterialTheme.colorScheme.outlineVariant
					)

					NotesField(
						labelRes = R.string.label_default_notes,
						notes = defaultNotes,
						onNotesChange = { defaultNotes = it }
						)
				}
			}
		}
	}
}

@Composable
private fun SettingsTopBar(onNavigateBack: () -> Unit) {
	Surface(
		color = MaterialTheme.colorScheme.surface,
		tonalElevation = 2.dp
	) {
		TopAppBar(
			title = {
				Text(
					text = stringResource(R.string.action_ui_settings),
					style = MaterialTheme.typography.titleLarge
				)
			},
			navigationIcon = {
				IconButton(onClick = onNavigateBack) {
					Icon(
						imageVector = Icons.AutoMirrored.Filled.ArrowBack,
						contentDescription = stringResource(R.string.action_back)
					)
				}
			},
			colors = TopAppBarDefaults.topAppBarColors(
				containerColor = MaterialTheme.colorScheme.surface
			)
		)
	}
}

@Composable
private fun SettingsSectionHeader(title: String) {
	Text(
		text = title,
		style = MaterialTheme.typography.titleSmall,
		fontWeight = FontWeight.SemiBold,
		color = MaterialTheme.colorScheme.primary,
		modifier = Modifier.padding(horizontal = 4.dp)
	)
}

@Composable
private fun WeekStartRow(currentDay: WeekStartDay, onClick: () -> Unit) {
	Surface(
		modifier = Modifier.fillMaxWidth().clickable(onClick = onClick),
		color = MaterialTheme.colorScheme.surfaceContainerLow
	) {
		Row(
			modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 14.dp),
			verticalAlignment = Alignment.CenterVertically
		) {
			Icon(
				imageVector = Icons.Outlined.CalendarMonth,
				contentDescription = null,
				tint = MaterialTheme.colorScheme.onSurfaceVariant
			)
			Spacer(modifier = Modifier.width(16.dp))
			Column(modifier = Modifier.weight(1f)) {
				Text(
					text = stringResource(R.string.action_week_start),
					style = MaterialTheme.typography.bodyLarge,
					color = MaterialTheme.colorScheme.onSurface
				)
				Text(
					text = when (currentDay) {
						WeekStartDay.MONDAY -> stringResource(R.string.week_start_monday)
						WeekStartDay.SUNDAY -> stringResource(R.string.week_start_sunday)
						WeekStartDay.SATURDAY -> stringResource(R.string.week_start_saturday)
					},
					style = MaterialTheme.typography.bodySmall,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}
			Icon(
				imageVector = Icons.AutoMirrored.Outlined.KeyboardArrowRight,
				contentDescription = null,
				tint = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.5f)
			)
		}
	}
}

@Composable
private fun HighlightCurrentDayRow(enabled: Boolean, onToggle: (Boolean) -> Unit) {
	Surface(
		modifier = Modifier.fillMaxWidth(),
		color = MaterialTheme.colorScheme.surfaceContainerLow
	) {
		Row(
			modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 10.dp),
			verticalAlignment = Alignment.CenterVertically
		) {
			Icon(
				imageVector = Icons.Outlined.CalendarMonth,
				contentDescription = null,
				tint = MaterialTheme.colorScheme.onSurfaceVariant
			)
			Spacer(modifier = Modifier.width(16.dp))
			Text(
				text = stringResource(R.string.settings_highlight_current_day),
				style = MaterialTheme.typography.bodyLarge,
				color = MaterialTheme.colorScheme.onSurface,
				modifier = Modifier.weight(1f)
			)
			Switch(checked = enabled, onCheckedChange = onToggle)
		}
	}
}

@Composable
private fun ThemeRow(currentMode: AppThemeMode, onClick: () -> Unit) {
	Surface(
		modifier = Modifier.fillMaxWidth().clickable(onClick = onClick),
		color = MaterialTheme.colorScheme.surfaceContainerLow
	) {
		Row(
			modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 14.dp),
			verticalAlignment = Alignment.CenterVertically
		) {
			Icon(
				imageVector = Icons.Outlined.BrightnessMedium,
				contentDescription = null,
				tint = MaterialTheme.colorScheme.onSurfaceVariant
			)
			Spacer(modifier = Modifier.width(16.dp))
			Column(modifier = Modifier.weight(1f)) {
				Text(
					text = stringResource(R.string.action_theme),
					style = MaterialTheme.typography.bodyLarge,
					color = MaterialTheme.colorScheme.onSurface
				)
				Text(
					text = when (currentMode) {
						AppThemeMode.SYSTEM -> stringResource(R.string.theme_system)
						AppThemeMode.LIGHT -> stringResource(R.string.theme_light)
						AppThemeMode.DARK -> stringResource(R.string.theme_dark)
					},
					style = MaterialTheme.typography.bodySmall,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}
			Icon(
				imageVector = Icons.AutoMirrored.Outlined.KeyboardArrowRight,
				contentDescription = null,
				tint = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.5f)
			)
		}
	}
}

@Composable
private fun LanguageRow(currentLocale: AppLocale, onClick: () -> Unit) {
	Surface(
		modifier = Modifier.fillMaxWidth().clickable(onClick = onClick),
		color = MaterialTheme.colorScheme.surfaceContainerLow
	) {
		Row(
			modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 14.dp),
			verticalAlignment = Alignment.CenterVertically
		) {
			Icon(
				imageVector = Icons.Outlined.Language,
				contentDescription = null,
				tint = MaterialTheme.colorScheme.onSurfaceVariant
			)
			Spacer(modifier = Modifier.width(16.dp))
			Column(modifier = Modifier.weight(1f)) {
				Text(
					text = stringResource(R.string.action_language),
					style = MaterialTheme.typography.bodyLarge,
					color = MaterialTheme.colorScheme.onSurface
				)
				Text(
					text = currentLocale.displayName,
					style = MaterialTheme.typography.bodySmall,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}
			Icon(
				imageVector = Icons.AutoMirrored.Outlined.KeyboardArrowRight,
				contentDescription = null,
				tint = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.5f)
			)
		}
	}
}
