package xyz.tleskiv.tt.ui

import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.ic_more_vert
import tabletennistracker.composeapp.generated.resources.ic_search
import tabletennistracker.composeapp.generated.resources.ic_settings
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.navigation3.runtime.NavEntry
import androidx.navigation3.runtime.entryProvider
import androidx.navigation3.ui.NavDisplay
import org.jetbrains.compose.resources.vectorResource
import org.jetbrains.compose.ui.tooling.preview.Preview
import androidx.compose.foundation.layout.fillMaxSize
import xyz.tleskiv.tt.ui.nav.*
import xyz.tleskiv.tt.ui.screens.AnalyticsScreen
import xyz.tleskiv.tt.ui.screens.ProfileScreen
import xyz.tleskiv.tt.ui.screens.SessionsScreen
import xyz.tleskiv.tt.ui.theme.AppTheme

@Composable
@Preview
fun App() {
	AppTheme {
		val topLevelBackStack = remember { mutableStateListOf<Any>(RouteA) }

		Top(topLevelBackStack)
	}
}

private data object RouteA

private data class RouteB(val id: String)

@Composable
private fun Top(topLevelbackStack: SnapshotStateList<Any>) {
	NavDisplay(
		backStack = topLevelbackStack,
		onBack = { topLevelbackStack.removeLastOrNull() },
		entryProvider = { key ->
			when (key) {
				is RouteA -> NavEntry(key) {
//					ContentGreen("Welcome to Nav3") {
//						Button(onClick = {
//							backStack.add(RouteB("123"))
//						}) {
//							Text("Click to navigate")
//						}
//					}
					NavBarScreens(topLevelbackStack)
				}

				is RouteB -> NavEntry(key) {
					ContentBlue("Route id: ${key.id} ")
				}

				else -> {
					error("Unknown route: $key")
				}
			}
		}
	)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun NavBarScreens(topLevelBackStack: SnapshotStateList<Any>) {
	val navBarScreenBackStack = remember { TopLevelBackStack<Any>(SessionsRoute) }
	val currentRoute = navBarScreenBackStack.topLevelKey as? TopLevelRoute

	Scaffold(
		topBar = {
			TopAppBar(
				title = { Text(currentRoute?.label ?: "") },
				actions = {
					IconButton(onClick = { /* Search action */ }) {
						Icon(vectorResource(Res.drawable.ic_search), contentDescription = "Search")
					}
					IconButton(onClick = { /* Settings action */ }) {
						Icon(vectorResource(Res.drawable.ic_settings), contentDescription = "Settings")
					}
					IconButton(onClick = { /* More options */ }) {
						Icon(vectorResource(Res.drawable.ic_more_vert), contentDescription = "More")
					}
				},
				colors = TopAppBarDefaults.topAppBarColors(
					containerColor = MaterialTheme.colorScheme.surface
				)
			)
		},
		bottomBar = {
			NavigationBar {
				TOP_LEVEL_ROUTES.forEach { topLevelRoute ->
					val isSelected = topLevelRoute == navBarScreenBackStack.topLevelKey
					val scale by animateFloatAsState(
						targetValue = if (isSelected) 1.15f else 1f,
						animationSpec = spring(
							dampingRatio = Spring.DampingRatioMediumBouncy,
							stiffness = Spring.StiffnessLow
						),
						label = "iconScale"
					)
					NavigationBarItem(
						selected = isSelected,
						onClick = { navBarScreenBackStack.addTopLevel(topLevelRoute) },
						icon = {
							Icon(
								imageVector = vectorResource(topLevelRoute.icon),
								contentDescription = topLevelRoute.label,
								modifier = Modifier.scale(scale)
							)
						},
						label = { Text(topLevelRoute.label) }
					)
				}
			}
		}
	) { paddingValues ->
		Box(modifier = Modifier.padding(paddingValues)) {
			NavDisplay(
				backStack = navBarScreenBackStack.backStack,
				onBack = { navBarScreenBackStack.removeLast() },
				entryProvider = entryProvider {
					entry<SessionsRoute> {
						SessionsScreen(
							onNavigateToDetails = { id ->
								topLevelBackStack.add(RouteB(id))
							}
						)
					}
					entry<AnalyticsRoute> {
						AnalyticsScreen()
					}
					entry<ProfileRoute> {
						ProfileScreen()
					}
				}
			)
		}
	}
}

