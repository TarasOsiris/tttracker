package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import org.koin.compose.viewmodel.koinViewModel
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.viewmodel.DebugScreenViewModel

@Composable
fun DebugScreen(
	onNavigateBack: () -> Unit,
	viewModel: DebugScreenViewModel = koinViewModel()
) {
	val isGenerating by viewModel.isGenerating.collectAsState()
	val isClearing by viewModel.isClearing.collectAsState()

	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surface)
	) {
		DebugTopBar(onNavigateBack = onNavigateBack)

		Column(
			modifier = Modifier
				.fillMaxSize()
				.verticalScroll(rememberScrollState())
				.padding(16.dp)
		) {
			DataGenerationSection(
				isLoading = isGenerating,
				enabled = !isGenerating && !isClearing,
				onGenerate = { viewModel.generateRandomSessions(100) },
				onSeedShowcase = { viewModel.seedShowcaseData() }
			)

			Spacer(modifier = Modifier.height(16.dp))

			ClearDatabaseSection(
				isLoading = isClearing,
				enabled = !isGenerating && !isClearing,
				onClear = { viewModel.clearAllSessions() }
			)
		}
	}
}

@Composable
private fun DataGenerationSection(
	isLoading: Boolean,
	enabled: Boolean,
	onGenerate: () -> Unit,
	onSeedShowcase: () -> Unit
) {
	ContentCard {
		Column(modifier = Modifier.padding(16.dp)) {
			Text(
				text = stringResource(R.string.debug_data_generation_title),
				style = MaterialTheme.typography.titleMedium,
				color = MaterialTheme.colorScheme.onSurface
			)
			Spacer(modifier = Modifier.height(8.dp))
			Text(
				text = stringResource(R.string.debug_data_generation_description),
				style = MaterialTheme.typography.bodyMedium,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
			Spacer(modifier = Modifier.height(16.dp))
			Button(
				onClick = onGenerate,
				enabled = enabled,
				modifier = Modifier.fillMaxWidth()
			) {
				if (isLoading) {
					CircularProgressIndicator(
						modifier = Modifier.height(20.dp),
						strokeWidth = 2.dp,
						color = MaterialTheme.colorScheme.onPrimary
					)
				} else {
					Text(stringResource(R.string.debug_generate_random_sessions))
				}
			}
			Spacer(modifier = Modifier.height(8.dp))
			Button(
				onClick = onSeedShowcase,
				enabled = enabled,
				modifier = Modifier.fillMaxWidth().testTag(TestTags.DEBUG_SEED_SHOWCASE)
			) {
				Text(stringResource(R.string.debug_seed_showcase_data))
			}
		}
	}
}

@Composable
private fun ClearDatabaseSection(
	isLoading: Boolean,
	enabled: Boolean,
	onClear: () -> Unit
) {
	ContentCard {
		Column(modifier = Modifier.padding(16.dp)) {
			Text(
				text = stringResource(R.string.debug_clear_database_title),
				style = MaterialTheme.typography.titleMedium,
				color = MaterialTheme.colorScheme.error
			)
			Spacer(modifier = Modifier.height(8.dp))
			Text(
				text = stringResource(R.string.debug_clear_database_description),
				style = MaterialTheme.typography.bodyMedium,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
			Spacer(modifier = Modifier.height(16.dp))
			Button(
				onClick = onClear,
				enabled = enabled,
				colors = ButtonDefaults.buttonColors(
					containerColor = MaterialTheme.colorScheme.error,
					contentColor = MaterialTheme.colorScheme.onError
				),
				modifier = Modifier.fillMaxWidth()
			) {
				if (isLoading) {
					CircularProgressIndicator(
						modifier = Modifier.height(20.dp),
						strokeWidth = 2.dp,
						color = MaterialTheme.colorScheme.onError
					)
				} else {
					Text(stringResource(R.string.debug_clear_all_sessions))
				}
			}
		}
	}
}

@Composable
private fun DebugTopBar(onNavigateBack: () -> Unit) {
	Surface(
		color = MaterialTheme.colorScheme.surface,
		tonalElevation = 2.dp
	) {
		TopAppBar(
			title = {
				Text(
					text = stringResource(R.string.action_debug),
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
