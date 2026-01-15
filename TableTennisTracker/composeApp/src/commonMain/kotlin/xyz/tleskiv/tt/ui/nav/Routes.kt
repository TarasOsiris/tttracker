package xyz.tleskiv.tt.ui.nav

import kotlinx.datetime.LocalDate
import org.jetbrains.compose.resources.DrawableResource
import org.jetbrains.compose.resources.StringResource
import tabletennistracker.composeapp.generated.resources.*

sealed interface TopLevelRoute {
	val icon: DrawableResource
	val label: StringResource
}

data object SessionsRoute : TopLevelRoute {
	override val icon = Res.drawable.ic_sessions
	override val label = Res.string.nav_sessions
}

data object AnalyticsRoute : TopLevelRoute {
	override val icon = Res.drawable.ic_analytics
	override val label = Res.string.nav_analytics
}

data object ProfileRoute : TopLevelRoute {
	override val icon = Res.drawable.ic_person
	override val label = Res.string.nav_profile
}

data class CreateSessionRoute(val initialDate: LocalDate? = null)

data class SessionDetailsRoute(val sessionId: String)

val TOP_LEVEL_ROUTES: List<TopLevelRoute> = listOf(SessionsRoute, AnalyticsRoute, ProfileRoute)
