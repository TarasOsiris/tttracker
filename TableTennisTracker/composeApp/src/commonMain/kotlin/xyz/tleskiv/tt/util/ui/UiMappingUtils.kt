package xyz.tleskiv.tt.util.ui

import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.lerp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.*
import xyz.tleskiv.tt.data.model.enums.SessionType

enum class HeatMapLevel {
	Zero,
	One,
	Two,
	Three,
	Four
}

@Composable
fun HeatMapLevel.toColor(): Color {
	val base = androidx.compose.material3.MaterialTheme.colorScheme.primary
	return when (this) {
		HeatMapLevel.Zero -> androidx.compose.material3.MaterialTheme.colorScheme.surfaceVariant
		HeatMapLevel.One -> base.copy(alpha = 0.25f)
		HeatMapLevel.Two -> base.copy(alpha = 0.45f)
		HeatMapLevel.Three -> base.copy(alpha = 0.65f)
		HeatMapLevel.Four -> base
	}
}

@Composable
fun SessionType?.toColor(): Color = when (this) {
	SessionType.TECHNIQUE -> Color(0xFF4CAF50)
	SessionType.MATCH_PLAY -> Color(0xFFFF5722)
	SessionType.SERVE_PRACTICE -> Color(0xFF2196F3)
	SessionType.PHYSICAL -> Color(0xFFE91E63)
	SessionType.FREE_PLAY -> Color(0xFF9C27B0)
	SessionType.OTHER, null -> Color(0xFF607D8B)
}

private val RpeColorGreen = Color(0xFF4CAF50)
private val RpeColorYellow = Color(0xFFFFC107)
private val RpeColorRed = Color(0xFFF44336)

fun getRpeColor(rpe: Int): Color = getRpeColor(rpe.toFloat())

fun getRpeColor(value: Float): Color {
	val fraction = (value - 1f) / 9f
	return when {
		fraction <= 0.5f -> lerp(RpeColorGreen, RpeColorYellow, fraction * 2f)
		else -> lerp(RpeColorYellow, RpeColorRed, (fraction - 0.5f) * 2f)
	}
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
