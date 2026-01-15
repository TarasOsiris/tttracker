package xyz.tleskiv.tt.ui.nav

import kotlinx.datetime.LocalDate
import org.jetbrains.compose.resources.DrawableResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.ic_analytics
import tabletennistracker.composeapp.generated.resources.ic_person
import tabletennistracker.composeapp.generated.resources.ic_sessions

sealed interface TopLevelRoute {
	val icon: DrawableResource
	val label: String
}

data object SessionsRoute : TopLevelRoute {
	override val icon = Res.drawable.ic_sessions
	override val label = "Sessions"
}

data object AnalyticsRoute : TopLevelRoute {
	override val icon = Res.drawable.ic_analytics
	override val label = "Analytics"
}

data object ProfileRoute : TopLevelRoute {
	override val icon = Res.drawable.ic_person
	override val label = "Profile"
}

data class CreateSessionRoute(val initialDate: LocalDate? = null)

data class SessionDetailsRoute(val sessionId: String)

val TOP_LEVEL_ROUTES: List<TopLevelRoute> = listOf(SessionsRoute, AnalyticsRoute, ProfileRoute)
