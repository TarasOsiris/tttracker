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
import androidx.compose.material.icons.filled.Info
import androidx.compose.ui.Alignment
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_back
import tabletennistracker.composeapp.generated.resources.action_general_settings
import tabletennistracker.composeapp.generated.resources.label_default_notes
import tabletennistracker.composeapp.generated.resources.settings_section_sessions
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.ui.widgets.fields.DurationField
import xyz.tleskiv.tt.ui.widgets.fields.NotesField
import xyz.tleskiv.tt.ui.widgets.fields.RpeField
import xyz.tleskiv.tt.ui.widgets.fields.SessionTypeField
import xyz.tleskiv.tt.ui.widgets.fields.RpeField
import xyz.tleskiv.tt.ui.widgets.fields.SessionTypeField
import xyz.tleskiv.tt.viewmodel.settings.GeneralSettingsScreenViewModel

@Composable
fun GeneralSettingsScreen(
	viewModel: GeneralSettingsScreenViewModel,
	onNavigateBack: () -> Unit
) {
	var defaultDuration by viewModel.inputData.defaultSessionDuration
	var defaultRpe by viewModel.inputData.defaultRpe
	var defaultSessionType by viewModel.inputData.defaultSessionType
	var defaultNotes by viewModel.inputData.defaultNotes

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
