package xyz.tleskiv.tt.util.ui

import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.rpe_easy
import tabletennistracker.composeapp.generated.resources.rpe_hard
import tabletennistracker.composeapp.generated.resources.rpe_max_effort
import tabletennistracker.composeapp.generated.resources.rpe_moderate
import tabletennistracker.composeapp.generated.resources.rpe_very_easy
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.model.BrandColors
import xyz.tleskiv.tt.ui.theme.sessionTypeFreePlay
import xyz.tleskiv.tt.ui.theme.sessionTypeMatchPlay
import xyz.tleskiv.tt.ui.theme.sessionTypeOther
import xyz.tleskiv.tt.ui.theme.sessionTypePhysical
import xyz.tleskiv.tt.ui.theme.sessionTypeServePractice
import xyz.tleskiv.tt.ui.theme.sessionTypeTechnique
import xyz.tleskiv.tt.ui.theme.sessionTypeTournament

enum class HeatMapLevel {
	Zero,
	One,
	Two,
	Three,
	Four
}

@Composable
fun HeatMapLevel.toColor(): Color {
	val base = androidx.compose.material3.MaterialTheme.colorScheme.tertiary
	return when (this) {
		HeatMapLevel.Zero -> androidx.compose.material3.MaterialTheme.colorScheme.surfaceVariant
		HeatMapLevel.One -> base.copy(alpha = 0.35f)
		HeatMapLevel.Two -> base.copy(alpha = 0.55f)
		HeatMapLevel.Three -> base.copy(alpha = 0.75f)
		HeatMapLevel.Four -> base
	}
}

@Composable
fun SessionType?.toColor(): Color = when (this) {
	SessionType.TECHNIQUE -> sessionTypeTechnique
	SessionType.MATCH_PLAY -> sessionTypeMatchPlay
	SessionType.TOURNAMENT -> sessionTypeTournament
	SessionType.SERVE_PRACTICE -> sessionTypeServePractice
	SessionType.PHYSICAL -> sessionTypePhysical
	SessionType.FREE_PLAY -> sessionTypeFreePlay
	SessionType.OTHER, null -> sessionTypeOther
}

/**
 * RPE 1..10 on the green→yellow→red ramp.
 *
 * Reads the pre-resolved ramp in [BrandColors] rather than interpolating, so the native iOS UI can
 * show the same colours without reimplementing Compose's Oklab interpolation.
 */
fun getRpeColor(rpe: Int): Color {
	val ramp = BrandColors.RpeRamp
	return Color(ramp[rpe.coerceIn(1, ramp.size) - 1].toULong() shl 32)
}

@Composable
fun getRpeLabel(rpe: Int): String = when (rpe) {
	1, 2 -> stringResource(Res.string.rpe_very_easy)
	3, 4 -> stringResource(Res.string.rpe_easy)
	5, 6 -> stringResource(Res.string.rpe_moderate)
	7, 8 -> stringResource(Res.string.rpe_hard)
	9, 10 -> stringResource(Res.string.rpe_max_effort)
	else -> ""
}
