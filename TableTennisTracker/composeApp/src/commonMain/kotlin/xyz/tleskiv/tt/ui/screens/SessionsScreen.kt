package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.ic_add

@Composable
fun SessionsScreen(
	onNavigateToDetails: (String) -> Unit = {},
	onAddSession: () -> Unit = {}
) {
	Box(modifier = Modifier.fillMaxSize()) {
		Column(
			modifier = Modifier
				.fillMaxSize()
				.background(MaterialTheme.colorScheme.tertiaryContainer)
				.padding(16.dp),
			horizontalAlignment = Alignment.CenterHorizontally,
			verticalArrangement = Arrangement.Center
		) {
			Text(
				text = "Training Sessions",
				style = MaterialTheme.typography.headlineMedium,
				color = MaterialTheme.colorScheme.onTertiaryContainer
			)
			Spacer(modifier = Modifier.height(16.dp))
			Text(
				text = "Your training history will appear here",
				style = MaterialTheme.typography.bodyLarge,
				color = MaterialTheme.colorScheme.onTertiaryContainer
			)
			Spacer(modifier = Modifier.height(24.dp))
			Button(onClick = { onNavigateToDetails("session-123") }) {
				Text("View Session Details")
			}
		}

		FloatingActionButton(
			onClick = onAddSession,
			modifier = Modifier
				.align(Alignment.BottomEnd)
				.padding(16.dp),
			containerColor = MaterialTheme.colorScheme.primary
		) {
			Icon(
				imageVector = vectorResource(Res.drawable.ic_add),
				contentDescription = "Add Session"
			)
		}
	}
}
