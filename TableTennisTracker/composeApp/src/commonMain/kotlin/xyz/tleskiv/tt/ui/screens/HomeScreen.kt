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
			text = "Home Screen",
			style = MaterialTheme.typography.headlineMedium,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)
		Spacer(modifier = Modifier.height(24.dp))
		Button(onClick = { onNavigateToDetails("match-123") }) {
			Text("View Match Details")
		}
		Spacer(modifier = Modifier.height(8.dp))
		Button(onClick = { onNavigateToDetails("player-456") }) {
			Text("View Player Details")
		}
	}
}
