package xyz.tleskiv.tt.model

/**
 * Semantic colours shared by every UI.
 *
 * These carry meaning rather than styling — a session type, an exertion level, a match result — so
 * both the Compose UI and the native iOS UI must agree on them. Compose derives its `Color` values
 * from here rather than restating the hex, and Swift reads the same constants through the framework.
 *
 * Values are opaque ARGB, matching Compose's `Color(0xAARRGGBB)` literal form.
 */
object BrandColors {
	const val SessionTypeTechnique = 0xFF4CAF50L
	const val SessionTypeMatchPlay = 0xFFFF5722L
	const val SessionTypeTournament = 0xFFFFD700L
	const val SessionTypeServePractice = 0xFF2196F3L
	const val SessionTypePhysical = 0xFFE91E63L
	const val SessionTypeFreePlay = 0xFF9C27B0L
	const val SessionTypeOther = 0xFF607D8BL

	const val Win = 0xFF4CAF50L
	const val Loss = 0xFFE53935L
	const val WinContainer = 0xFFC8E6C9L
	const val OnWinContainer = 0xFF1B5E20L

	/**
	 * RPE 1..10 mapped to the green→yellow→red ramp, indexed by `rpe - 1`.
	 *
	 * Pre-resolved rather than interpolated at call time: Compose's `lerp(Color, Color, Float)`
	 * interpolates in Oklab and folds a D50→D65 adaptation into its matrix, so a straightforward
	 * sRGB interpolation elsewhere would not match. These values were generated from that ramp, so
	 * every platform reads the same numbers.
	 */
	val RpeRamp = listOf(
		0xFF4CAF50L, 0xFF7FB549L, 0xFFA7B941L, 0xFFCCBD34L, 0xFFEEC01FL,
		0xFFFFB517L, 0xFFFE9C26L, 0xFFFC822EL, 0xFFF96533L, 0xFFF44336L
	)

	/** The ramp endpoints, for anything that needs to draw the gradient itself. */
	const val RpeGreen = 0xFF4CAF50L
	const val RpeYellow = 0xFFFFC107L
	const val RpeRed = 0xFFF44336L
}
