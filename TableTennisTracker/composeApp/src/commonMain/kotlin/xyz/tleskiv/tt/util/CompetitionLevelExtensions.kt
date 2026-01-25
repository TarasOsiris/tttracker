package xyz.tleskiv.tt.util

import org.jetbrains.compose.resources.StringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.competition_level_league
import tabletennistracker.composeapp.generated.resources.competition_level_practice
import tabletennistracker.composeapp.generated.resources.competition_level_tournament
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel

fun CompetitionLevel.labelRes(): StringResource = when (this) {
	CompetitionLevel.PRACTICE -> Res.string.competition_level_practice
	CompetitionLevel.LEAGUE -> Res.string.competition_level_league
	CompetitionLevel.TOURNAMENT -> Res.string.competition_level_tournament
}
