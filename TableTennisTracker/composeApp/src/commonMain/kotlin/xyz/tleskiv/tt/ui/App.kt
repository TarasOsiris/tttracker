package xyz.tleskiv.tt.ui


import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
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
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import org.jetbrains.compose.ui.tooling.preview.Preview
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_more
import tabletennistracker.composeapp.generated.resources.action_search
import tabletennistracker.composeapp.generated.resources.action_settings
import tabletennistracker.composeapp.generated.resources.ic_more_vert
import tabletennistracker.composeapp.generated.resources.ic_search
import tabletennistracker.composeapp.generated.resources.ic_settings
import xyz.tleskiv.tt.ui.nav.AnalyticsRoute
import xyz.tleskiv.tt.ui.nav.CreateSessionRoute
import xyz.tleskiv.tt.ui.nav.NAV_BAR_TAB_ROUTES
import xyz.tleskiv.tt.ui.nav.NavBarTabLevelRoute
import xyz.tleskiv.tt.ui.nav.ProfileRoute
import xyz.tleskiv.tt.ui.nav.SessionDetailsRoute
import xyz.tleskiv.tt.ui.nav.SessionsRoute
import xyz.tleskiv.tt.ui.nav.TopLevelBackStack
import xyz.tleskiv.tt.ui.nav.createSessionEntryMetadata
import xyz.tleskiv.tt.ui.nav.instantTransitionMetadata
import xyz.tleskiv.tt.ui.nav.sessionDetailsEntryMetadata
import xyz.tleskiv.tt.ui.screens.AnalyticsScreen
import xyz.tleskiv.tt.ui.screens.CreateSessionScreen
import xyz.tleskiv.tt.ui.screens.ProfileScreen
import xyz.tleskiv.tt.ui.screens.SessionDetailsScreen
import xyz.tleskiv.tt.ui.screens.SessionsScreen
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel

@Composable
@Preview
fun App() {
	AppTheme {
		Surface(
			modifier = Modifier.fillMaxSize(),
			color = MaterialTheme.colorScheme.surface
		) {
			val topLevelBackStack = remember { mutableStateListOf<Any>(RouteA) }
			Top(topLevelBackStack)
		}
	}
}

private data object RouteA

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

				is CreateSessionRoute -> NavEntry(key, metadata = createSessionEntryMetadata) {
					CreateSessionScreen(
						viewModel = koinViewModel<CreateSessionScreenViewModel> { parametersOf(key.initialDate) },
						onNavigateBack = { topLevelBackStack.removeLastOrNull() }
					)
				}

				is SessionDetailsRoute -> NavEntry(key, metadata = sessionDetailsEntryMetadata) {
					SessionDetailsScreen(
						viewModel = koinViewModel<SessionDetailsScreenViewModel> { parametersOf(key.sessionId) },
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
	val currentRoute = navBarScreenBackStack.topLevelKey as? NavBarTabLevelRoute

	Scaffold(
		topBar = {
			TopAppBar(
				title = { Text(currentRoute?.let { stringResource(it.label) } ?: "") },
				actions = {
					IconButton(onClick = { /* Search action */ }) {
						Icon(
							vectorResource(Res.drawable.ic_search),
							contentDescription = stringResource(Res.string.action_search)
						)
					}
					IconButton(onClick = { /* Settings action */ }) {
						Icon(
							vectorResource(Res.drawable.ic_settings),
							contentDescription = stringResource(Res.string.action_settings)
						)
					}
					IconButton(onClick = { /* More options */ }) {
						Icon(
							vectorResource(Res.drawable.ic_more_vert),
							contentDescription = stringResource(Res.string.action_more)
						)
					}
				},
				colors = TopAppBarDefaults.topAppBarColors(
					containerColor = MaterialTheme.colorScheme.surface
				)
			)
		},
		bottomBar = {
			NavigationBar {
				NAV_BAR_TAB_ROUTES.forEach { topLevelRoute ->
					val isSelected = topLevelRoute == navBarScreenBackStack.topLevelKey
					val scale = if (isSelected) 1.15f else 1f
					NavigationBarItem(
						selected = isSelected,
						onClick = { navBarScreenBackStack.addTopLevel(topLevelRoute) },
						icon = {
							Icon(
								imageVector = vectorResource(topLevelRoute.icon),
								contentDescription = stringResource(topLevelRoute.label),
								modifier = Modifier.scale(scale)
							)
						},
						label = { Text(stringResource(topLevelRoute.label)) }
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
					entry<SessionsRoute>(metadata = instantTransitionMetadata) {
						SessionsScreen(
							viewModel = koinViewModel(),
							onNavigateToDetails = { id ->
								topLevelBackStack.add(SessionDetailsRoute(id))
							},
							onAddSession = { selectedDate ->
								topLevelBackStack.add(CreateSessionRoute(selectedDate))
							}
						)
					}
					entry<AnalyticsRoute>(metadata = instantTransitionMetadata) {
						AnalyticsScreen()
					}
					entry<ProfileRoute>(metadata = instantTransitionMetadata) {
						ProfileScreen()
					}
				}
			)
		}
	}
}
