package xyz.tleskiv.tt.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.ui.unit.dp

// Each role sits one rung rounder than the Material default. extraSmall and small are held back
// because their only consumers are heatmap cells and chart bars, where rounding distorts the mark.
val AppShapes = Shapes(
	extraSmall = RoundedCornerShape(4.dp),
	small = RoundedCornerShape(8.dp),
	medium = RoundedCornerShape(16.dp),
	large = RoundedCornerShape(20.dp),
	largeIncreased = RoundedCornerShape(24.dp),
	extraLarge = RoundedCornerShape(32.dp),
	extraLargeIncreased = RoundedCornerShape(36.dp),
	extraExtraLarge = RoundedCornerShape(48.dp),
)
