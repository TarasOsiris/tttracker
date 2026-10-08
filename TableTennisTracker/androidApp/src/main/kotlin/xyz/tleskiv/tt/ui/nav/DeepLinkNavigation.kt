package xyz.tleskiv.tt.ui.nav

import xyz.tleskiv.tt.deeplink.DeepLink
import xyz.tleskiv.tt.ui.nav.routes.AnalyticsRoute
import xyz.tleskiv.tt.ui.nav.routes.CreateSessionRoute
import xyz.tleskiv.tt.ui.nav.routes.NavBarTabLevelRoute
import xyz.tleskiv.tt.ui.nav.routes.SessionDetailsRoute
import xyz.tleskiv.tt.ui.nav.routes.SessionsRoute
import xyz.tleskiv.tt.ui.nav.routes.TopLevelRoute
import xyz.tleskiv.tt.util.today

/// Where a `tttracker://` link lands — Android's half of iOS's `RootTabView.open(_:)`. Whatever is
/// open above the tabs, Settings included, is closed first, as iOS closes its Settings sheet before
/// following a link. The paywall is a dialog over everything, so a Pro link leaves the screens alone.
fun openDeepLink(
	link: DeepLink,
	topLevelBackStack: MutableList<TopLevelRoute>,
	tabs: TopLevelBackStack<NavBarTabLevelRoute>,
	hasProFeatures: Boolean,
	openPaywall: () -> Unit
) {
	if (link == DeepLink.Pro) {
		if (!hasProFeatures) openPaywall()
		return
	}
	while (topLevelBackStack.size > 1) topLevelBackStack.removeAt(topLevelBackStack.lastIndex)
	when (link) {
		DeepLink.Analytics -> tabs.addTopLevel(AnalyticsRoute)
		DeepLink.Sessions -> tabs.addTopLevel(SessionsRoute)
		DeepLink.NewSession -> {
			tabs.addTopLevel(SessionsRoute)
			topLevelBackStack.add(CreateSessionRoute(today()))
		}
		is DeepLink.Session -> {
			tabs.addTopLevel(SessionsRoute)
			topLevelBackStack.add(SessionDetailsRoute(link.id))
		}
		DeepLink.Pro -> Unit
	}
}
