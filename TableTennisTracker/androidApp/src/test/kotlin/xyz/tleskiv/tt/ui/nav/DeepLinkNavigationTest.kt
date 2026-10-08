package xyz.tleskiv.tt.ui.nav

import io.kotest.core.spec.style.FunSpec
import io.kotest.matchers.collections.shouldContainExactly
import io.kotest.matchers.shouldBe
import xyz.tleskiv.tt.deeplink.DeepLink
import xyz.tleskiv.tt.ui.nav.routes.AnalyticsRoute
import xyz.tleskiv.tt.ui.nav.routes.CoreAppRoute
import xyz.tleskiv.tt.ui.nav.routes.CreateSessionRoute
import xyz.tleskiv.tt.ui.nav.routes.GeneralSettingsRoute
import xyz.tleskiv.tt.ui.nav.routes.NavBarTabLevelRoute
import xyz.tleskiv.tt.ui.nav.routes.SessionDetailsRoute
import xyz.tleskiv.tt.ui.nav.routes.SessionsRoute
import xyz.tleskiv.tt.ui.nav.routes.SettingsRoute
import xyz.tleskiv.tt.ui.nav.routes.TopLevelRoute
import xyz.tleskiv.tt.util.today

class DeepLinkNavigationTest : FunSpec({

	val sessionId = "6f1c2a3b-4d5e-4f60-8a7b-9c0d1e2f3a4b"

	fun settingsOpen(): MutableList<TopLevelRoute> = mutableListOf(CoreAppRoute, SettingsRoute, GeneralSettingsRoute)

	test("openDeepLink_analyticsWithSettingsOpen_closesSettingsAndSelectsAnalytics") {
		val topLevel = settingsOpen()
		val tabs = TopLevelBackStack<NavBarTabLevelRoute>(SessionsRoute)

		openDeepLink(DeepLink.Analytics, topLevel, tabs, hasProFeatures = false) {}

		topLevel shouldContainExactly listOf(CoreAppRoute)
		tabs.topLevelKey shouldBe AnalyticsRoute
	}

	test("openDeepLink_newSession_opensTheFormOverTheSessionsTab") {
		val topLevel = settingsOpen()
		val tabs = TopLevelBackStack<NavBarTabLevelRoute>(AnalyticsRoute)

		openDeepLink(DeepLink.NewSession, topLevel, tabs, hasProFeatures = false) {}

		topLevel shouldContainExactly listOf(CoreAppRoute, CreateSessionRoute(today()))
		tabs.topLevelKey shouldBe SessionsRoute
	}

	test("openDeepLink_session_opensItsDetails") {
		val topLevel = mutableListOf<TopLevelRoute>(CoreAppRoute, SessionDetailsRoute("other"))
		val tabs = TopLevelBackStack<NavBarTabLevelRoute>(AnalyticsRoute)

		openDeepLink(DeepLink.Session(sessionId), topLevel, tabs, hasProFeatures = false) {}

		topLevel shouldContainExactly listOf(CoreAppRoute, SessionDetailsRoute(sessionId))
		tabs.topLevelKey shouldBe SessionsRoute
	}

	test("openDeepLink_proWithoutPro_opensThePaywallAndKeepsTheScreens") {
		val topLevel = settingsOpen()
		val expectedTopLevel = topLevel.toList()
		val tabs = TopLevelBackStack<NavBarTabLevelRoute>(SessionsRoute)
		var paywallOpenings = 0
		val expectedOpenings = 1

		openDeepLink(DeepLink.Pro, topLevel, tabs, hasProFeatures = false) { paywallOpenings++ }

		paywallOpenings shouldBe expectedOpenings
		topLevel shouldContainExactly expectedTopLevel
	}

	test("openDeepLink_proWithPro_doesNothing") {
		val topLevel = mutableListOf<TopLevelRoute>(CoreAppRoute)
		val tabs = TopLevelBackStack<NavBarTabLevelRoute>(SessionsRoute)
		var paywallOpenings = 0
		val expectedOpenings = 0

		openDeepLink(DeepLink.Pro, topLevel, tabs, hasProFeatures = true) { paywallOpenings++ }

		paywallOpenings shouldBe expectedOpenings
		topLevel shouldContainExactly listOf(CoreAppRoute)
	}
})
