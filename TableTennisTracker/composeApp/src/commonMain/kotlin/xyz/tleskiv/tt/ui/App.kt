package xyz.tleskiv.tt.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation3.runtime.NavEntry
import androidx.navigation3.ui.NavDisplay
import org.jetbrains.compose.ui.tooling.preview.Preview
import xyz.tleskiv.tt.ui.nav.DetailsRoute
import xyz.tleskiv.tt.ui.nav.HomeRoute

@Composable
@Preview
fun App() {
	MaterialTheme {
		val backStack = remember { mutableStateListOf<Any>(HomeRoute) }

		NavDisplay(
			backStack = backStack,
			onBack = { backStack.removeLastOrNull() },
			entryProvider = { route ->
				when (route) {
					is HomeRoute -> NavEntry(route) {
						HomeScreen(
							onNavigateToDetails = { itemId ->
								backStack.add(DetailsRoute(itemId))
							}
						)
					}
					is DetailsRoute -> NavEntry(route) {
						DetailsScreen(
							itemId = route.itemId,
							onBack = { backStack.removeLastOrNull() }
						)
					}
					else -> error("Unknown route: $route")
				}
			}
		)
	}
}

@Composable
private fun HomeScreen(
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

@Composable
private fun DetailsScreen(
	itemId: String,
	onBack: () -> Unit
) {
	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.secondaryContainer)
			.safeContentPadding(),
		horizontalAlignment = Alignment.CenterHorizontally,
		verticalArrangement = Arrangement.Center
	) {
		Text(
			text = "Details Screen",
			style = MaterialTheme.typography.headlineMedium,
			color = MaterialTheme.colorScheme.onSecondaryContainer
		)
		Spacer(modifier = Modifier.height(16.dp))
		Text(
			text = "Item ID: $itemId",
			style = MaterialTheme.typography.bodyLarge,
			color = MaterialTheme.colorScheme.onSecondaryContainer
		)
		Spacer(modifier = Modifier.height(24.dp))
		Button(onClick = onBack) {
			Text("Go Back")
		}
	}
}