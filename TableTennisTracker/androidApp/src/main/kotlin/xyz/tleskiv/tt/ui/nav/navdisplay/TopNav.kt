package xyz.tleskiv.tt.ui.nav.navdisplay

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.lifecycle.viewmodel.navigation3.rememberViewModelStoreNavEntryDecorator
import androidx.navigation3.runtime.NavEntry
import androidx.navigation3.runtime.rememberSaveableStateHolderNavEntryDecorator
import androidx.navigation3.ui.NavDisplay
import xyz.tleskiv.tt.deeplink.DeepLink
import xyz.tleskiv.tt.pro.PaywallSource
import xyz.tleskiv.tt.ui.nav.TopLevelBackStack
import xyz.tleskiv.tt.ui.nav.instantTransitionMetadata
import xyz.tleskiv.tt.ui.nav.openDeepLink
import xyz.tleskiv.tt.ui.nav.rememberLateralEntryTransitionMetadata
import xyz.tleskiv.tt.ui.nav.rememberModalEntryTransitionMetadata
import xyz.tleskiv.tt.ui.nav.routes.CoreAppRoute
import xyz.tleskiv.tt.ui.nav.routes.CreateSessionRoute
import xyz.tleskiv.tt.ui.nav.routes.DebugRoute
import xyz.tleskiv.tt.ui.nav.routes.EditSessionRoute
import xyz.tleskiv.tt.ui.nav.routes.GeneralSettingsRoute
import xyz.tleskiv.tt.ui.nav.routes.NAV_BAR_TAB_ROUTES
import xyz.tleskiv.tt.ui.nav.routes.OpponentsRoute
import xyz.tleskiv.tt.ui.nav.routes.SessionDetailsRoute
import xyz.tleskiv.tt.ui.nav.routes.SessionsRoute
import xyz.tleskiv.tt.ui.nav.routes.SettingsRoute
import xyz.tleskiv.tt.ui.nav.routes.TopLevelRoute
import xyz.tleskiv.tt.ui.pro.LocalPro
import xyz.tleskiv.tt.ui.screens.CreateSessionScreen
import xyz.tleskiv.tt.ui.screens.DebugScreen
import xyz.tleskiv.tt.ui.screens.EditSessionScreen
import xyz.tleskiv.tt.ui.screens.GeneralSettingsScreen
import xyz.tleskiv.tt.ui.screens.OpponentsScreen
import xyz.tleskiv.tt.ui.screens.SessionDetailsScreen
import xyz.tleskiv.tt.ui.screens.SettingsScreen


@Composable
fun TopNavDisplay(
	topLevelBackStack: SnapshotStateList<TopLevelRoute>,
	deepLink: DeepLink? = null,
	onDeepLinkHandled: () -> Unit = {}
) {
	val tabsBackStack = rememberSaveable(saver = TopLevelBackStack.saver(NAV_BAR_TAB_ROUTES)) {
		TopLevelBackStack(SessionsRoute)
	}
	val pro = LocalPro.current
	LaunchedEffect(deepLink) {
		deepLink ?: return@LaunchedEffect
		openDeepLink(deepLink, topLevelBackStack, tabsBackStack, pro.hasProFeatures) {
			pro.openPaywall(PaywallSource.WIDGET)
		}
		onDeepLinkHandled()
	}
	val modalEntryMetadata = rememberModalEntryTransitionMetadata()
	val lateralEntryMetadata = rememberLateralEntryTransitionMetadata()

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

				is CreateSessionRoute -> NavEntry(key, metadata = modalEntryMetadata) {
					CreateSessionScreen(
						initialDate = key.initialDate,
						onNavigateBack = { topLevelBackStack.removeLastOrNull() }
					)
				}

				is EditSessionRoute -> NavEntry(key, metadata = instantTransitionMetadata) {
					EditSessionScreen(
						sessionId = key.sessionId,
						onClose = { topLevelBackStack.removeLastOrNull() }
					)
				}

				is SessionDetailsRoute -> NavEntry(key, metadata = lateralEntryMetadata) {
					SessionDetailsScreen(
						sessionId = key.sessionId,
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

				is SettingsRoute -> NavEntry(key, metadata = lateralEntryMetadata) {
					SettingsScreen(
						onNavigateBack = { topLevelBackStack.removeLastOrNull() },
						onNavigateToGeneralSettings = { topLevelBackStack.add(GeneralSettingsRoute) },
						onNavigateToOpponents = { topLevelBackStack.add(OpponentsRoute) },
						onNavigateToDebug = { topLevelBackStack.add(DebugRoute) }
					)
				}

				is GeneralSettingsRoute -> NavEntry(key, metadata = lateralEntryMetadata) {
					GeneralSettingsScreen(
						onNavigateBack = { topLevelBackStack.removeLastOrNull() }
					)
				}

				is OpponentsRoute -> NavEntry(key, metadata = lateralEntryMetadata) {
					OpponentsScreen(
						onNavigateBack = { topLevelBackStack.removeLastOrNull() }
					)
				}

				is DebugRoute -> NavEntry(key, metadata = lateralEntryMetadata) {
					DebugScreen(onNavigateBack = { topLevelBackStack.removeLastOrNull() })
				}
			}
		}
	)
}
