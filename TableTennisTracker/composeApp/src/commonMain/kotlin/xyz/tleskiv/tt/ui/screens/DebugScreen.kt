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
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import org.koin.compose.viewmodel.koinViewModel
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_back
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
			ContentCard {
				Column(modifier = Modifier.padding(16.dp)) {
					Text(
						text = "Data Generation",
						style = MaterialTheme.typography.titleMedium,
						color = MaterialTheme.colorScheme.onSurface
					)
					Spacer(modifier = Modifier.height(8.dp))
					Text(
						text = "Generate random training sessions for the last year to test the app with realistic data.",
						style = MaterialTheme.typography.bodyMedium,
						color = MaterialTheme.colorScheme.onSurfaceVariant
					)
					Spacer(modifier = Modifier.height(16.dp))
					Button(
						onClick = { viewModel.generateRandomSessions(100) },
						enabled = !isGenerating && !isClearing,
						modifier = Modifier.fillMaxWidth()
					) {
						if (isGenerating) {
							CircularProgressIndicator(
								modifier = Modifier.height(20.dp),
								strokeWidth = 2.dp,
								color = MaterialTheme.colorScheme.onPrimary
							)
						} else {
							Text("Generate 100 Random Sessions")
						}
					}
				}
			}

			Spacer(modifier = Modifier.height(16.dp))

			ContentCard {
				Column(modifier = Modifier.padding(16.dp)) {
					Text(
						text = "Clear Database",
						style = MaterialTheme.typography.titleMedium,
						color = MaterialTheme.colorScheme.error
					)
					Spacer(modifier = Modifier.height(8.dp))
					Text(
						text = "Permanently delete all training sessions from the database. This action cannot be undone.",
						style = MaterialTheme.typography.bodyMedium,
						color = MaterialTheme.colorScheme.onSurfaceVariant
					)
					Spacer(modifier = Modifier.height(16.dp))
					Button(
						onClick = { viewModel.clearAllSessions() },
						enabled = !isGenerating && !isClearing,
						colors = ButtonDefaults.buttonColors(
							containerColor = MaterialTheme.colorScheme.error,
							contentColor = MaterialTheme.colorScheme.onError
						),
						modifier = Modifier.fillMaxWidth()
					) {
						if (isClearing) {
							CircularProgressIndicator(
								modifier = Modifier.height(20.dp),
								strokeWidth = 2.dp,
								color = MaterialTheme.colorScheme.onError
							)
						} else {
							Text("Clear All Sessions")
						}
					}
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
					text = "Debug",
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
