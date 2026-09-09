package xyz.tleskiv.tt.ui.nav.routes

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.TestTags


val NAV_BAR_TAB_ROUTES: List<NavBarTabLevelRoute> =
	listOf(SessionsRoute, AnalyticsRoute, SettingsRoute)

sealed interface NavBarTabLevelRoute {
	@get:DrawableRes val icon: Int
	@get:StringRes val label: Int

	/// The label is localized in fourteen languages, so the screenshot test cannot address a tab by
	/// it. The tag is what it uses instead.
	val tag: String
}

data object SessionsRoute : NavBarTabLevelRoute {
	override val icon = R.drawable.ic_sessions
	override val label = R.string.nav_sessions
	override val tag = TestTags.TAB_SESSIONS
}

data object AnalyticsRoute : NavBarTabLevelRoute {
	override val icon = R.drawable.ic_analytics
	override val label = R.string.nav_analytics
	override val tag = TestTags.TAB_ANALYTICS
}

data object SettingsRoute : NavBarTabLevelRoute {
	override val icon = R.drawable.ic_settings
	override val label = R.string.nav_settings
	override val tag = TestTags.TAB_SETTINGS
}
