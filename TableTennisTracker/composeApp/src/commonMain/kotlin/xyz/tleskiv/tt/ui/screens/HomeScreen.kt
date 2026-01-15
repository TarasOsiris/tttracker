package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.home_view_match
import tabletennistracker.composeapp.generated.resources.home_view_player
import tabletennistracker.composeapp.generated.resources.title_home

@Composable
fun HomeScreen(
	onNavigateToDetails: (String) -> Unit
) {
	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.primaryContainer)
			.safeContentPadding(),
		horizontalAlignment = Alignment.CenterHorizontally,
		verticalArrangement = Arrangement.Center
	) {
		Text(
			text = stringResource(Res.string.title_home),
			style = MaterialTheme.typography.headlineMedium,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)
		Spacer(modifier = Modifier.height(24.dp))
		Button(onClick = { onNavigateToDetails("match-123") }) {
			Text(stringResource(Res.string.home_view_match))
		}
		Spacer(modifier = Modifier.height(8.dp))
		Button(onClick = { onNavigateToDetails("player-456") }) {
			Text(stringResource(Res.string.home_view_player))
		}
	}
}
