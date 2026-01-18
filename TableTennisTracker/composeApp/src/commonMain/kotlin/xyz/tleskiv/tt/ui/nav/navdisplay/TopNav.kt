package xyz.tleskiv.tt.ui.nav.navdisplay

import androidx.compose.runtime.Composable
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.lifecycle.viewmodel.navigation3.rememberViewModelStoreNavEntryDecorator
import androidx.navigation3.runtime.NavEntry
import androidx.navigation3.runtime.rememberSaveableStateHolderNavEntryDecorator
import androidx.navigation3.ui.NavDisplay
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import xyz.tleskiv.tt.ui.nav.createSessionEntryMetadata
import xyz.tleskiv.tt.ui.nav.instantTransitionMetadata
import xyz.tleskiv.tt.ui.nav.routes.CoreAppRoute
import xyz.tleskiv.tt.ui.nav.routes.CreateSessionRoute
import xyz.tleskiv.tt.ui.nav.routes.EditSessionRoute
import xyz.tleskiv.tt.ui.nav.routes.SessionDetailsRoute
import xyz.tleskiv.tt.ui.nav.routes.SettingsRoute
import xyz.tleskiv.tt.ui.nav.routes.TopLevelRoute
import xyz.tleskiv.tt.ui.nav.sessionDetailsEntryMetadata
import xyz.tleskiv.tt.ui.screens.CreateSessionScreen
import xyz.tleskiv.tt.ui.screens.EditSessionScreen
import xyz.tleskiv.tt.ui.screens.SessionDetailsScreen
import xyz.tleskiv.tt.ui.screens.SettingsScreen
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel
import xyz.tleskiv.tt.viewmodel.settings.SettingsScreenViewModel


@Composable
fun TopNavDisplay(topLevelBackStack: SnapshotStateList<TopLevelRoute>) {
	NavDisplay(
		backStack = topLevelBackStack,
		onBack = { topLevelBackStack.removeLastOrNull() },
		entryDecorators = listOf(
			rememberSaveableStateHolderNavEntryDecorator(),
			rememberViewModelStoreNavEntryDecorator()
		),
		entryProvider = { key ->
			when (key) {
				is CoreAppRoute -> NavEntry(key) {
					TabsNavDisplay(topLevelBackStack)
				}

				is CreateSessionRoute -> NavEntry(key, metadata = createSessionEntryMetadata) {
					CreateSessionScreen(
						viewModel = koinViewModel<CreateSessionScreenViewModel> { parametersOf(key.initialDate) },
						onNavigateBack = { topLevelBackStack.removeLastOrNull() }
					)
				}

				is EditSessionRoute -> NavEntry(key, metadata = instantTransitionMetadata) {
					EditSessionScreen(
						sessionId = key.sessionId,
						onClose = { topLevelBackStack.removeLastOrNull() }
					)
				}

				is SessionDetailsRoute -> NavEntry(key, metadata = sessionDetailsEntryMetadata) {
					SessionDetailsScreen(
						viewModel = koinViewModel<SessionDetailsScreenViewModel> { parametersOf(key.sessionId) },
						onNavigateBack = { topLevelBackStack.removeLastOrNull() },
						onEdit = { sessionId ->
							if (topLevelBackStack.lastOrNull() is SessionDetailsRoute) {
								topLevelBackStack[topLevelBackStack.lastIndex] = EditSessionRoute(sessionId)
							} else {
								topLevelBackStack.add(EditSessionRoute(sessionId))
							}
						}
					)
				}

				is SettingsRoute -> NavEntry(key, metadata = sessionDetailsEntryMetadata) {
					SettingsScreen(
						viewModel = koinViewModel<SettingsScreenViewModel>(),
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
