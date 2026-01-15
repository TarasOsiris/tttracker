package xyz.tleskiv.tt.util

import xyz.tleskiv.tt.data.model.enums.SessionType

fun SessionType.displayName(): String = when (this) {
	SessionType.TECHNIQUE -> "Technique"
	SessionType.MATCH_PLAY -> "Match Play"
	SessionType.SERVE_PRACTICE -> "Serve Practice"
	SessionType.PHYSICAL -> "Physical"
	SessionType.FREE_PLAY -> "Free Play"
	else -> "Other"
}
