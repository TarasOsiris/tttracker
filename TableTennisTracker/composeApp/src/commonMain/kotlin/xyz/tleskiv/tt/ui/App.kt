package xyz.tleskiv.tt.ui

import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.lifecycle.viewmodel.navigation3.rememberViewModelStoreNavEntryDecorator
import androidx.navigation3.runtime.NavEntry
import androidx.navigation3.runtime.entryProvider
import androidx.navigation3.runtime.rememberSaveableStateHolderNavEntryDecorator
import androidx.navigation3.ui.NavDisplay
import org.jetbrains.compose.resources.vectorResource
import org.jetbrains.compose.ui.tooling.preview.Preview
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.ic_more_vert
import tabletennistracker.composeapp.generated.resources.ic_search
import tabletennistracker.composeapp.generated.resources.ic_settings
import xyz.tleskiv.tt.ui.nav.*
import xyz.tleskiv.tt.ui.screens.AnalyticsScreen
import xyz.tleskiv.tt.ui.screens.CreateSessionScreen
import xyz.tleskiv.tt.ui.screens.ProfileScreen
import xyz.tleskiv.tt.ui.screens.SessionsScreen
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel

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
private fun Top(topLevelBackStack: SnapshotStateList<Any>) {
	NavDisplay(
		backStack = topLevelBackStack,
		onBack = { topLevelBackStack.removeLastOrNull() },
		entryDecorators = listOf(
			rememberSaveableStateHolderNavEntryDecorator(),
			rememberViewModelStoreNavEntryDecorator()
		),
		entryProvider = { key ->
			when (key) {
				is RouteA -> NavEntry(key) {
					NavBarScreens(topLevelBackStack)
				}

				is RouteB -> NavEntry(key) {
					ContentBlue("Route id: ${key.id} ")
				}

				is CreateSessionRoute -> NavEntry(key) {
					CreateSessionScreen(
						viewModel = koinViewModel<CreateSessionScreenViewModel> { parametersOf(key.initialDate) },
						onNavigateBack = { topLevelBackStack.removeLastOrNull() }
					)
				}

				else -> {
					error("Unknown route: $key")
				}
			}
		}
	)
}

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
				entryDecorators = listOf(
					rememberSaveableStateHolderNavEntryDecorator(),
					rememberViewModelStoreNavEntryDecorator()
				),
				entryProvider = entryProvider {
					entry<SessionsRoute> {
						SessionsScreen(
							viewModel = koinViewModel(),
							onNavigateToDetails = { id ->
								topLevelBackStack.add(RouteB(id))
							},
							onAddSession = { selectedDate ->
								topLevelBackStack.add(CreateSessionRoute(selectedDate))
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

