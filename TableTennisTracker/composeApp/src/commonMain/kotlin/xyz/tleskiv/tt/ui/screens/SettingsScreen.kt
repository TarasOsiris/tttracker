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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Slider
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_back
import tabletennistracker.composeapp.generated.resources.action_settings
import tabletennistracker.composeapp.generated.resources.settings_default_duration
import tabletennistracker.composeapp.generated.resources.settings_default_duration_description
import tabletennistracker.composeapp.generated.resources.settings_section_sessions
import tabletennistracker.composeapp.generated.resources.suffix_minutes_value
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.ui.widgets.fields.RpeField
import xyz.tleskiv.tt.viewmodel.settings.SettingsScreenViewModel
import kotlin.math.roundToInt

@Composable
fun SettingsScreen(
	viewModel: SettingsScreenViewModel,
	onNavigateBack: () -> Unit
) {
	val defaultDuration by viewModel.defaultSessionDuration.collectAsState()
	val defaultRpe by viewModel.defaultRpe.collectAsState()

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
					DefaultDurationSetting(
						durationMinutes = defaultDuration,
						onDurationChange = { viewModel.setDefaultSessionDuration(it) }
					)

					HorizontalDivider(
						modifier = Modifier.padding(vertical = 16.dp),
						color = MaterialTheme.colorScheme.outlineVariant
					)

					RpeField(
						rpeValue = defaultRpe.toFloat(),
						onRpeChange = { viewModel.setDefaultRpe(it.roundToInt()) }
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
					text = stringResource(Res.string.action_settings),
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
private fun DefaultDurationSetting(durationMinutes: Int, onDurationChange: (Int) -> Unit) {
	Column {
		Row(
			modifier = Modifier.fillMaxWidth(),
			horizontalArrangement = Arrangement.SpaceBetween,
			verticalAlignment = Alignment.CenterVertically
		) {
			Column(modifier = Modifier.weight(1f)) {
				Text(
					text = stringResource(Res.string.settings_default_duration),
					style = MaterialTheme.typography.bodyLarge,
					color = MaterialTheme.colorScheme.onSurface
				)
				Text(
					text = stringResource(Res.string.settings_default_duration_description),
					style = MaterialTheme.typography.bodySmall,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}
			Text(
				text = stringResource(Res.string.suffix_minutes_value, durationMinutes),
				style = MaterialTheme.typography.titleMedium,
				color = MaterialTheme.colorScheme.primary,
				fontWeight = FontWeight.Bold
			)
		}
		Spacer(modifier = Modifier.height(12.dp))
		Slider(
			value = durationMinutes.toFloat(),
			onValueChange = { onDurationChange((it / 10).roundToInt() * 10) },
			valueRange = 10f..180f,
			steps = 16,
			modifier = Modifier.fillMaxWidth()
		)
		Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
			Text(
				text = stringResource(Res.string.suffix_minutes_value, 10),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
			Text(
				text = stringResource(Res.string.suffix_minutes_value, 180),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
	}
}
