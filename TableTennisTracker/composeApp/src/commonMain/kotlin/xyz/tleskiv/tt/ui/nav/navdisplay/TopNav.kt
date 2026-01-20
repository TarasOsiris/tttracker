package xyz.tleskiv.tt.ui.nav.navdisplay

import androidx.compose.runtime.Composable
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.lifecycle.viewmodel.navigation3.rememberViewModelStoreNavEntryDecorator
import androidx.navigation3.runtime.NavEntry
import androidx.navigation3.runtime.rememberSaveableStateHolderNavEntryDecorator
import androidx.navigation3.ui.NavDisplay
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import xyz.tleskiv.tt.ui.nav.TopLevelBackStack
import xyz.tleskiv.tt.ui.nav.instantTransitionMetadata
import xyz.tleskiv.tt.ui.nav.lateralEntryTransitionMetadata
import xyz.tleskiv.tt.ui.nav.modalEntryTransitionMetadata
import xyz.tleskiv.tt.ui.nav.routes.CoreAppRoute
import xyz.tleskiv.tt.ui.nav.routes.CreateSessionRoute
import xyz.tleskiv.tt.ui.nav.routes.DebugRoute
import xyz.tleskiv.tt.ui.nav.routes.EditSessionRoute
import xyz.tleskiv.tt.ui.nav.routes.GeneralSettingsRoute
import xyz.tleskiv.tt.ui.nav.routes.NAV_BAR_TAB_ROUTES
import xyz.tleskiv.tt.ui.nav.routes.NavBarTabLevelRoute
import xyz.tleskiv.tt.ui.nav.routes.SessionDetailsRoute
import xyz.tleskiv.tt.ui.nav.routes.SessionsRoute
import xyz.tleskiv.tt.ui.nav.routes.TopLevelRoute
import xyz.tleskiv.tt.ui.screens.CreateSessionScreen
import xyz.tleskiv.tt.ui.screens.DebugScreen
import xyz.tleskiv.tt.ui.screens.EditSessionScreen
import xyz.tleskiv.tt.ui.screens.GeneralSettingsScreen
import xyz.tleskiv.tt.ui.screens.SessionDetailsScreen
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.EditSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel
import xyz.tleskiv.tt.viewmodel.settings.GeneralSettingsScreenViewModel


@Composable
fun TopNavDisplay(topLevelBackStack: SnapshotStateList<TopLevelRoute>) {
	val tabsBackStack = rememberSaveable(saver = TopLevelBackStack.saver(NAV_BAR_TAB_ROUTES)) {
		TopLevelBackStack(SessionsRoute)
	}
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
					TabsNavDisplay(topLevelBackStack, tabsBackStack)
				}

				is CreateSessionRoute -> NavEntry(key, metadata = modalEntryTransitionMetadata) {
					CreateSessionScreen(
						viewModel = koinViewModel<CreateSessionScreenViewModel> { parametersOf(key.initialDate) },
						onNavigateBack = { topLevelBackStack.removeLastOrNull() }
					)
				}

				is EditSessionRoute -> NavEntry(key, metadata = instantTransitionMetadata) {
					EditSessionScreen(
						viewModel = koinViewModel<EditSessionScreenViewModel> { parametersOf(key.sessionId) },
						onClose = { topLevelBackStack.removeLastOrNull() }
					)
				}

				is SessionDetailsRoute -> NavEntry(key, metadata = lateralEntryTransitionMetadata) {
					SessionDetailsScreen(
						viewModel = koinViewModel<SessionDetailsScreenViewModel> { parametersOf(key.sessionId) },
						onNavigateBack = { topLevelBackStack.removeLastOrNull() },
						onEdit = { sessionId ->
							if (topLevelBackStack.lastOrNull() is SessionDetailsRoute) {
								topLevelBackStack[topLevelBackStack.lastIndex] = EditSessionRoute(sessionId)
							} else {
								topLevelBackStack.add(EditSessionRoute(sessionId))
							}
						},
						onDeleted = { topLevelBackStack.removeLastOrNull() }
					)
				}

				is GeneralSettingsRoute -> NavEntry(key, metadata = lateralEntryTransitionMetadata) {
					GeneralSettingsScreen(
						viewModel = koinViewModel<GeneralSettingsScreenViewModel>(),
						onNavigateBack = { topLevelBackStack.removeLastOrNull() }
					)
				}

				is DebugRoute -> NavEntry(key, metadata = lateralEntryTransitionMetadata) {
					DebugScreen(onNavigateBack = { topLevelBackStack.removeLastOrNull() })
				}
			}
		}
	)
}
