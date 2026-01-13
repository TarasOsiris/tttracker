package xyz.tleskiv.tt.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation3.runtime.NavEntry
import androidx.navigation3.ui.NavDisplay
import kotlinx.coroutines.launch
import org.jetbrains.compose.ui.tooling.preview.Preview
import org.koin.compose.koinInject
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.App_metadata
import xyz.tleskiv.tt.ui.nav.DetailsRoute
import xyz.tleskiv.tt.ui.nav.HomeRoute
import xyz.tleskiv.tt.util.currentTimeMillis

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
	val database: AppDatabase = koinInject()
	val scope = rememberCoroutineScope()
	var metadataList by remember { mutableStateOf<List<App_metadata>>(emptyList()) }
	var counter by remember { mutableStateOf(0) }

	LaunchedEffect(Unit) {
		metadataList = database.appDatabaseQueries.selectAll().executeAsList()
	}

	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.primaryContainer)
			.safeContentPadding()
			.padding(16.dp),
		horizontalAlignment = Alignment.CenterHorizontally
	) {
		Text(
			text = "SQLDelight Demo",
			style = MaterialTheme.typography.headlineMedium,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)
		Spacer(modifier = Modifier.height(16.dp))

		Button(
			onClick = {
				scope.launch {
					val now = currentTimeMillis()
					database.appDatabaseQueries.insert(
						key = "test_key_$counter",
						value_ = "Test value $counter",
						created_at = now,
						updated_at = now
					)
					counter++
					metadataList = database.appDatabaseQueries.selectAll().executeAsList()
				}
			}
		) {
			Text("Add Test Data")
		}

		Spacer(modifier = Modifier.height(8.dp))

		Button(
			onClick = {
				scope.launch {
					database.appDatabaseQueries.deleteAll()
					metadataList = emptyList()
					counter = 0
				}
			}
		) {
			Text("Clear All Data")
		}

		Spacer(modifier = Modifier.height(16.dp))

		Text(
			text = "Database Entries (${metadataList.size}):",
			style = MaterialTheme.typography.titleMedium,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)

		Spacer(modifier = Modifier.height(8.dp))

		LazyColumn(
			modifier = Modifier.weight(1f),
			verticalArrangement = Arrangement.spacedBy(8.dp)
		) {
			items(metadataList) { metadata ->
				Card(
					modifier = Modifier.fillMaxWidth()
				) {
					Column(
						modifier = Modifier.padding(12.dp)
					) {
						Text(
							text = "Key: ${metadata.key}",
							style = MaterialTheme.typography.bodyMedium
						)
						Text(
							text = "Value: ${metadata.value_}",
							style = MaterialTheme.typography.bodySmall
						)
						Text(
							text = "Created: ${metadata.created_at}",
							style = MaterialTheme.typography.bodySmall
						)
					}
				}
			}
		}

		Spacer(modifier = Modifier.height(16.dp))

		Button(onClick = { onNavigateToDetails("match-123") }) {
			Text("View Match Details")
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