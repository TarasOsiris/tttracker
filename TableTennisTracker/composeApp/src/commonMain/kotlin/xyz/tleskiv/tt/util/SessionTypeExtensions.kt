package xyz.tleskiv.tt.util

import org.jetbrains.compose.resources.StringResource
import tabletennistracker.composeapp.generated.resources.*
import xyz.tleskiv.tt.data.model.enums.SessionType

fun SessionType.labelRes(): StringResource = when (this) {
	SessionType.TECHNIQUE -> Res.string.session_type_technique
	SessionType.MATCH_PLAY -> Res.string.session_type_match_play
	SessionType.TOURNAMENT -> Res.string.session_type_tournament
	SessionType.SERVE_PRACTICE -> Res.string.session_type_serve_practice
	SessionType.PHYSICAL -> Res.string.session_type_physical
	SessionType.FREE_PLAY -> Res.string.session_type_free_play
	else -> Res.string.session_type_other
}
