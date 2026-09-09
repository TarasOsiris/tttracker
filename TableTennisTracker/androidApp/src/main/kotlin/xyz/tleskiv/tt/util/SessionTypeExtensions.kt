package xyz.tleskiv.tt.util

import androidx.annotation.StringRes
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.data.model.enums.SessionType

@StringRes fun SessionType.labelRes(): Int = when (this) {
	SessionType.TECHNIQUE -> R.string.session_type_technique
	SessionType.MATCH_PLAY -> R.string.session_type_match_play
	SessionType.TOURNAMENT -> R.string.session_type_tournament
	SessionType.SERVE_PRACTICE -> R.string.session_type_serve_practice
	SessionType.PHYSICAL -> R.string.session_type_physical
	SessionType.FREE_PLAY -> R.string.session_type_free_play
	else -> R.string.session_type_other
}
