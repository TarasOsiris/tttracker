package xyz.tleskiv.tt.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.ColorScheme
import androidx.compose.material3.MaterialExpressiveTheme
import androidx.compose.material3.MotionScheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import xyz.tleskiv.tt.model.AppAccent

private val LightColorScheme = lightColorScheme(
	primary = primaryLight,
	onPrimary = onPrimaryLight,
	primaryContainer = primaryContainerLight,
	onPrimaryContainer = onPrimaryContainerLight,
	secondary = secondaryLight,
	onSecondary = onSecondaryLight,
	secondaryContainer = secondaryContainerLight,
	onSecondaryContainer = onSecondaryContainerLight,
	tertiary = tertiaryLight,
	onTertiary = onTertiaryLight,
	tertiaryContainer = tertiaryContainerLight,
	onTertiaryContainer = onTertiaryContainerLight,
	error = errorLight,
	onError = onErrorLight,
	errorContainer = errorContainerLight,
	onErrorContainer = onErrorContainerLight,
	background = backgroundLight,
	onBackground = onBackgroundLight,
	surface = surfaceLight,
	onSurface = onSurfaceLight,
	surfaceVariant = surfaceVariantLight,
	onSurfaceVariant = onSurfaceVariantLight,
	outline = outlineLight,
	outlineVariant = outlineVariantLight,
	scrim = scrimLight,
	inverseSurface = inverseSurfaceLight,
	inverseOnSurface = inverseOnSurfaceLight,
	inversePrimary = inversePrimaryLight,
	surfaceDim = surfaceDimLight,
	surfaceBright = surfaceBrightLight,
	surfaceContainerLowest = surfaceContainerLowestLight,
	surfaceContainerLow = surfaceContainerLowLight,
	surfaceContainer = surfaceContainerLight,
	surfaceContainerHigh = surfaceContainerHighLight,
	surfaceContainerHighest = surfaceContainerHighestLight,
	primaryFixed = primaryFixed,
	primaryFixedDim = primaryFixedDim,
	onPrimaryFixed = onPrimaryFixed,
	onPrimaryFixedVariant = onPrimaryFixedVariant,
	secondaryFixed = secondaryFixed,
	secondaryFixedDim = secondaryFixedDim,
	onSecondaryFixed = onSecondaryFixed,
	onSecondaryFixedVariant = onSecondaryFixedVariant,
	tertiaryFixed = tertiaryFixed,
	tertiaryFixedDim = tertiaryFixedDim,
	onTertiaryFixed = onTertiaryFixed,
	onTertiaryFixedVariant = onTertiaryFixedVariant,
)

private val DarkColorScheme = darkColorScheme(
	primary = primaryDark,
	onPrimary = onPrimaryDark,
	primaryContainer = primaryContainerDark,
	onPrimaryContainer = onPrimaryContainerDark,
	secondary = secondaryDark,
	onSecondary = onSecondaryDark,
	secondaryContainer = secondaryContainerDark,
	onSecondaryContainer = onSecondaryContainerDark,
	tertiary = tertiaryDark,
	onTertiary = onTertiaryDark,
	tertiaryContainer = tertiaryContainerDark,
	onTertiaryContainer = onTertiaryContainerDark,
	error = errorDark,
	onError = onErrorDark,
	errorContainer = errorContainerDark,
	onErrorContainer = onErrorContainerDark,
	background = backgroundDark,
	onBackground = onBackgroundDark,
	surface = surfaceDark,
	onSurface = onSurfaceDark,
	surfaceVariant = surfaceVariantDark,
	onSurfaceVariant = onSurfaceVariantDark,
	outline = outlineDark,
	outlineVariant = outlineVariantDark,
	scrim = scrimDark,
	inverseSurface = inverseSurfaceDark,
	inverseOnSurface = inverseOnSurfaceDark,
	inversePrimary = inversePrimaryDark,
	surfaceDim = surfaceDimDark,
	surfaceBright = surfaceBrightDark,
	surfaceContainerLowest = surfaceContainerLowestDark,
	surfaceContainerLow = surfaceContainerLowDark,
	surfaceContainer = surfaceContainerDark,
	surfaceContainerHigh = surfaceContainerHighDark,
	surfaceContainerHighest = surfaceContainerHighestDark,
	primaryFixed = primaryFixed,
	primaryFixedDim = primaryFixedDim,
	onPrimaryFixed = onPrimaryFixed,
	onPrimaryFixedVariant = onPrimaryFixedVariant,
	secondaryFixed = secondaryFixed,
	secondaryFixedDim = secondaryFixedDim,
	onSecondaryFixed = onSecondaryFixed,
	onSecondaryFixedVariant = onSecondaryFixedVariant,
	tertiaryFixed = tertiaryFixed,
	tertiaryFixedDim = tertiaryFixedDim,
	onTertiaryFixed = onTertiaryFixed,
	onTertiaryFixedVariant = onTertiaryFixedVariant,
)

/// The palette behind a Pro accent; null for [AppAccent.DEFAULT], which keeps the brand scheme.
val AppAccent.palette: AccentPalette?
	get() = when (this) {
		AppAccent.DEFAULT -> null
		AppAccent.GREEN -> accentGreen
		AppAccent.TEAL -> accentTeal
		AppAccent.INDIGO -> accentIndigo
		AppAccent.PURPLE -> accentPurple
		AppAccent.PINK -> accentPink
		AppAccent.RED -> accentRed
		AppAccent.ORANGE -> accentOrange
	}

private fun ColorScheme.withAccent(palette: AccentPalette?, darkTheme: Boolean): ColorScheme {
	palette ?: return this
	val tones = if (darkTheme) palette.dark else palette.light
	val inverse = if (darkTheme) palette.light else palette.dark
	return copy(
		primary = tones.primary,
		onPrimary = tones.onPrimary,
		primaryContainer = tones.container,
		onPrimaryContainer = tones.onContainer,
		inversePrimary = inverse.primary,
		surfaceTint = tones.primary
	)
}

/// The app's scheme with [accent] applied — also what the home-screen widgets are themed from.
fun appColorScheme(darkTheme: Boolean, accent: AppAccent): ColorScheme =
	(if (darkTheme) DarkColorScheme else LightColorScheme).withAccent(accent.palette, darkTheme)

/// [accent] is applied only while Pro is owned; the caller passes [AppAccent.DEFAULT] otherwise, so
/// losing Pro puts the default back without forgetting the choice.
@Composable
fun AppTheme(
	darkTheme: Boolean = isSystemInDarkTheme(),
	accent: AppAccent = AppAccent.DEFAULT,
	content: @Composable () -> Unit
) {
	val colorScheme = appColorScheme(darkTheme, accent)
	val typography = AppTypography()

	MaterialExpressiveTheme(
		colorScheme = colorScheme,
		motionScheme = MotionScheme.expressive(),
		shapes = AppShapes,
		typography = typography,
		content = content
	)
}
