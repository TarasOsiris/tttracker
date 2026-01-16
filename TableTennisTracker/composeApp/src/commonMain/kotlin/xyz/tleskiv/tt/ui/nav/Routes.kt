package xyz.tleskiv.tt.ui.nav

import kotlinx.datetime.LocalDate
import org.jetbrains.compose.resources.DrawableResource
import org.jetbrains.compose.resources.StringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.ic_analytics
import tabletennistracker.composeapp.generated.resources.ic_person
import tabletennistracker.composeapp.generated.resources.ic_sessions
import tabletennistracker.composeapp.generated.resources.nav_analytics
import tabletennistracker.composeapp.generated.resources.nav_profile
import tabletennistracker.composeapp.generated.resources.nav_sessions

sealed interface NavBarTabLevelRoute {
	val icon: DrawableResource
	val label: StringResource
}

data object SessionsRoute : NavBarTabLevelRoute {
	override val icon = Res.drawable.ic_sessions
	override val label = Res.string.nav_sessions
}

data object AnalyticsRoute : NavBarTabLevelRoute {
	override val icon = Res.drawable.ic_analytics
	override val label = Res.string.nav_analytics
}

data object ProfileRoute : NavBarTabLevelRoute {
	override val icon = Res.drawable.ic_person
	override val label = Res.string.nav_profile
}

data class CreateSessionRoute(val initialDate: LocalDate? = null)

data class SessionDetailsRoute(val sessionId: String)

val NAV_BAR_TAB_ROUTES: List<NavBarTabLevelRoute> =
	listOf(SessionsRoute, AnalyticsRoute, ProfileRoute)
