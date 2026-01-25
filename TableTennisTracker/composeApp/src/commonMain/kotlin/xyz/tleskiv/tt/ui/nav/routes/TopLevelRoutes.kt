package xyz.tleskiv.tt.ui.nav.routes

import kotlinx.datetime.LocalDate

sealed interface TopLevelRoute

data object CoreAppRoute : TopLevelRoute

data class CreateSessionRoute(val initialDate: LocalDate? = null) : TopLevelRoute

data class SessionDetailsRoute(val sessionId: String) : TopLevelRoute

data class EditSessionRoute(val sessionId: String) : TopLevelRoute

data object GeneralSettingsRoute : TopLevelRoute

data object OpponentsRoute : TopLevelRoute

data object DebugRoute : TopLevelRoute

