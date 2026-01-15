package xyz.tleskiv.tt.util.ui

import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.*
import xyz.tleskiv.tt.data.model.enums.SessionType

@Composable
fun SessionType?.toColor(): Color = when (this) {
	SessionType.TECHNIQUE -> Color(0xFF4CAF50)
	SessionType.MATCH_PLAY -> Color(0xFFFF5722)
	SessionType.SERVE_PRACTICE -> Color(0xFF2196F3)
	SessionType.PHYSICAL -> Color(0xFFE91E63)
	SessionType.FREE_PLAY -> Color(0xFF9C27B0)
	SessionType.OTHER, null -> Color(0xFF607D8B)
}

@Composable
fun getRpeColor(rpe: Int): Color = when {
	rpe <= 3 -> MaterialTheme.colorScheme.tertiary
	rpe <= 6 -> MaterialTheme.colorScheme.secondary
	else -> MaterialTheme.colorScheme.error
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
