package xyz.tleskiv.tt.util

import androidx.annotation.StringRes
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel

@StringRes fun CompetitionLevel.labelRes(): Int = when (this) {
	CompetitionLevel.PRACTICE -> R.string.competition_level_practice
	CompetitionLevel.LEAGUE -> R.string.competition_level_league
	CompetitionLevel.TOURNAMENT -> R.string.competition_level_tournament
}
