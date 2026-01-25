package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
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
import androidx.compose.material.icons.outlined.CalendarMonth
import androidx.compose.material3.BasicAlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import org.koin.compose.viewmodel.koinViewModel
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_back
import tabletennistracker.composeapp.generated.resources.action_cancel
import tabletennistracker.composeapp.generated.resources.action_general_settings
import tabletennistracker.composeapp.generated.resources.action_week_start
import tabletennistracker.composeapp.generated.resources.label_default_notes
import tabletennistracker.composeapp.generated.resources.settings_highlight_current_day
import tabletennistracker.composeapp.generated.resources.settings_section_calendar
import tabletennistracker.composeapp.generated.resources.settings_section_sessions
import tabletennistracker.composeapp.generated.resources.week_start_monday
import tabletennistracker.composeapp.generated.resources.week_start_saturday
import tabletennistracker.composeapp.generated.resources.week_start_select_title
import tabletennistracker.composeapp.generated.resources.week_start_sunday
import xyz.tleskiv.tt.model.WeekStartDay
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.ui.widgets.fields.DurationField
import xyz.tleskiv.tt.ui.widgets.fields.NotesField
import xyz.tleskiv.tt.ui.widgets.fields.RpeField
import xyz.tleskiv.tt.ui.widgets.fields.SessionTypeField
import xyz.tleskiv.tt.viewmodel.settings.GeneralSettingsScreenViewModel

@Composable
fun GeneralSettingsScreen(
	onNavigateBack: () -> Unit,
	viewModel: GeneralSettingsScreenViewModel = koinViewModel()
) {
	var defaultDuration by viewModel.inputData.defaultSessionDuration
	var defaultRpe by viewModel.inputData.defaultRpe
	var defaultSessionType by viewModel.inputData.defaultSessionType
	var defaultNotes by viewModel.inputData.defaultNotes
	val weekStartDay by viewModel.weekStartDay.collectAsState()
	val highlightCurrentDay by viewModel.highlightCurrentDay.collectAsState()
	var showWeekStartDialog by rememberSaveable { mutableStateOf(false) }

	if (showWeekStartDialog) {
		WeekStartSelectionDialog(
			currentDay = weekStartDay,
			onDismissRequest = { showWeekStartDialog = false },
			onDaySelected = { day ->
				viewModel.setWeekStartDay(day)
				showWeekStartDialog = false
			}
		)
	}

	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surface)
	) {
		SettingsTopBar(onNavigateBack = onNavigateBack)

		Column(
			modifier = Modifier
				.fillMaxSize()
				.verticalScroll(rememberScrollState())
				.padding(16.dp)
		) {
			// Calendar Section
			SettingsSectionHeader(stringResource(Res.string.settings_section_calendar))
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

			// Sessions Section
			SettingsSectionHeader(stringResource(Res.string.settings_section_sessions))
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
						labelRes = Res.string.label_default_notes,
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
					text = stringResource(Res.string.action_general_settings),
					style = MaterialTheme.typography.titleLarge
				)
			},
			navigationIcon = {
				IconButton(onClick = onNavigateBack) {
					Icon(
						imageVector = Icons.AutoMirrored.Filled.ArrowBack,
						contentDescription = stringResource(Res.string.action_back)
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
					text = stringResource(Res.string.action_week_start),
					style = MaterialTheme.typography.bodyLarge,
					color = MaterialTheme.colorScheme.onSurface
				)
				Text(
					text = when (currentDay) {
						WeekStartDay.MONDAY -> stringResource(Res.string.week_start_monday)
						WeekStartDay.SUNDAY -> stringResource(Res.string.week_start_sunday)
						WeekStartDay.SATURDAY -> stringResource(Res.string.week_start_saturday)
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
				text = stringResource(Res.string.settings_highlight_current_day),
				style = MaterialTheme.typography.bodyLarge,
				color = MaterialTheme.colorScheme.onSurface,
				modifier = Modifier.weight(1f)
			)
			Switch(checked = enabled, onCheckedChange = onToggle)
		}
	}
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun WeekStartSelectionDialog(
	currentDay: WeekStartDay,
	onDismissRequest: () -> Unit,
	onDaySelected: (WeekStartDay) -> Unit
) {
	BasicAlertDialog(onDismissRequest = onDismissRequest) {
		Surface(
			shape = MaterialTheme.shapes.large,
			color = MaterialTheme.colorScheme.surfaceContainerHigh
		) {
			Column(modifier = Modifier.padding(24.dp)) {
				Text(
					text = stringResource(Res.string.week_start_select_title),
					style = MaterialTheme.typography.headlineSmall,
					color = MaterialTheme.colorScheme.onSurface
				)
				Spacer(modifier = Modifier.height(16.dp))

				WeekStartDay.entries.forEach { day ->
					Row(
						modifier = Modifier
							.fillMaxWidth()
							.clickable { onDaySelected(day) }
							.padding(vertical = 8.dp),
						verticalAlignment = Alignment.CenterVertically
					) {
						RadioButton(selected = day == currentDay, onClick = null)
						Spacer(modifier = Modifier.width(8.dp))
						Text(
							text = when (day) {
								WeekStartDay.MONDAY -> stringResource(Res.string.week_start_monday)
								WeekStartDay.SUNDAY -> stringResource(Res.string.week_start_sunday)
								WeekStartDay.SATURDAY -> stringResource(Res.string.week_start_saturday)
							},
							style = MaterialTheme.typography.bodyLarge,
							color = MaterialTheme.colorScheme.onSurface
						)
					}
				}

				Spacer(modifier = Modifier.height(24.dp))

				Row(
					modifier = Modifier.fillMaxWidth(),
					horizontalArrangement = Arrangement.End
				) {
					TextButton(onClick = onDismissRequest) {
						Text(stringResource(Res.string.action_cancel))
					}
				}
			}
		}
	}
}
