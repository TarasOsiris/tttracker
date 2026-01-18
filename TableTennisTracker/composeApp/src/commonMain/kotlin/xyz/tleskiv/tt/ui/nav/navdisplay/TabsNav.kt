package xyz.tleskiv.tt.ui.nav.navdisplay

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.lifecycle.viewmodel.navigation3.rememberViewModelStoreNavEntryDecorator
import androidx.navigation3.runtime.entryProvider
import androidx.navigation3.runtime.rememberSaveableStateHolderNavEntryDecorator
import androidx.navigation3.ui.NavDisplay
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import org.koin.compose.viewmodel.koinViewModel
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_more
import tabletennistracker.composeapp.generated.resources.action_search
import tabletennistracker.composeapp.generated.resources.action_settings
import tabletennistracker.composeapp.generated.resources.ic_more_vert
import tabletennistracker.composeapp.generated.resources.ic_search
import tabletennistracker.composeapp.generated.resources.ic_settings
import xyz.tleskiv.tt.ui.nav.TopLevelBackStack
import xyz.tleskiv.tt.ui.nav.instantTransitionMetadata
import xyz.tleskiv.tt.ui.nav.routes.AnalyticsRoute
import xyz.tleskiv.tt.ui.nav.routes.CreateSessionRoute
import xyz.tleskiv.tt.ui.nav.routes.NAV_BAR_TAB_ROUTES
import xyz.tleskiv.tt.ui.nav.routes.NavBarTabLevelRoute
import xyz.tleskiv.tt.ui.nav.routes.ProfileRoute
import xyz.tleskiv.tt.ui.nav.routes.SessionDetailsRoute
import xyz.tleskiv.tt.ui.nav.routes.SessionsRoute
import xyz.tleskiv.tt.ui.nav.routes.SettingsRoute
import xyz.tleskiv.tt.ui.nav.routes.TopLevelRoute
import xyz.tleskiv.tt.ui.screens.AnalyticsScreen
import xyz.tleskiv.tt.ui.screens.ProfileScreen
import xyz.tleskiv.tt.ui.screens.SessionsScreen

@Composable
fun TabsNavDisplay(topLevelBackStack: SnapshotStateList<TopLevelRoute>) {
	val navBarScreenBackStack = remember { TopLevelBackStack<Any>(SessionsRoute) }
	val currentRoute = navBarScreenBackStack.topLevelKey as? NavBarTabLevelRoute

	Scaffold(
		topBar = {
			TopAppBar(
				title = { Text(currentRoute?.let { stringResource(it.label) } ?: "") },
				colors = TopAppBarDefaults.topAppBarColors(
					containerColor = MaterialTheme.colorScheme.surface
				)
			)
		},
		bottomBar = {
			NavigationBar {
				NAV_BAR_TAB_ROUTES.forEach { topLevelRoute ->
					val isSelected = topLevelRoute == navBarScreenBackStack.topLevelKey
					val scale by animateFloatAsState(
						targetValue = if (isSelected) 1.1f else 1f,
						animationSpec = tween(200)
					)
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
						ProfileScreen(
							onNavigateToSettings = { topLevelBackStack.add(SettingsRoute) }
						)
					}
				}
			)
		}
	}
}
