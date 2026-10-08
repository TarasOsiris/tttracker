package xyz.tleskiv.tt.ui.theme

import androidx.compose.ui.graphics.Color
import xyz.tleskiv.tt.model.BrandColors

val primaryLight = Color(0xFF415F91)
val onPrimaryLight = Color(0xFFFFFFFF)
val primaryContainerLight = Color(0xFFD6E3FF)
val onPrimaryContainerLight = Color(0xFF284777)
val secondaryLight = Color(0xFF565F71)
val onSecondaryLight = Color(0xFFFFFFFF)
val secondaryContainerLight = Color(0xFFDAE2F9)
val onSecondaryContainerLight = Color(0xFF3E4759)
val tertiaryLight = Color(0xFF705575)
val onTertiaryLight = Color(0xFFFFFFFF)
val tertiaryContainerLight = Color(0xFFFAD8FD)
val onTertiaryContainerLight = Color(0xFF573E5C)
val errorLight = Color(0xFFBA1A1A)
val onErrorLight = Color(0xFFFFFFFF)
val errorContainerLight = Color(0xFFFFDAD6)
val onErrorContainerLight = Color(0xFF93000A)
val backgroundLight = Color(0xFFF9F9FF)
val onBackgroundLight = Color(0xFF191C20)
val surfaceLight = Color(0xFFF9F9FF)
val onSurfaceLight = Color(0xFF191C20)
val surfaceVariantLight = Color(0xFFE0E2EC)
val onSurfaceVariantLight = Color(0xFF44474E)
val outlineLight = Color(0xFF74777F)
val outlineVariantLight = Color(0xFFC4C6D0)
val scrimLight = Color(0xFF000000)
val inverseSurfaceLight = Color(0xFF2E3036)
val inverseOnSurfaceLight = Color(0xFFF0F0F7)
val inversePrimaryLight = Color(0xFFAAC7FF)
val surfaceDimLight = Color(0xFFD9D9E0)
val surfaceBrightLight = Color(0xFFF9F9FF)
val surfaceContainerLowestLight = Color(0xFFFFFFFF)
val surfaceContainerLowLight = Color(0xFFF3F3FA)
val surfaceContainerLight = Color(0xFFEDEDF4)
val surfaceContainerHighLight = Color(0xFFE7E8EE)
val surfaceContainerHighestLight = Color(0xFFE2E2E9)

val primaryDark = Color(0xFFAAC7FF)
val onPrimaryDark = Color(0xFF0A305F)
val primaryContainerDark = Color(0xFF284777)
val onPrimaryContainerDark = Color(0xFFD6E3FF)
val secondaryDark = Color(0xFFBEC6DC)
val onSecondaryDark = Color(0xFF283141)
val secondaryContainerDark = Color(0xFF3E4759)
val onSecondaryContainerDark = Color(0xFFDAE2F9)
val tertiaryDark = Color(0xFFDDBCE0)
val onTertiaryDark = Color(0xFF3F2844)
val tertiaryContainerDark = Color(0xFF573E5C)
val onTertiaryContainerDark = Color(0xFFFAD8FD)
val errorDark = Color(0xFFFFB4AB)
val onErrorDark = Color(0xFF690005)
val errorContainerDark = Color(0xFF93000A)
val onErrorContainerDark = Color(0xFFFFDAD6)
val backgroundDark = Color(0xFF111318)
val onBackgroundDark = Color(0xFFE2E2E9)
val surfaceDark = Color(0xFF111318)
val onSurfaceDark = Color(0xFFE2E2E9)
val surfaceVariantDark = Color(0xFF44474E)
val onSurfaceVariantDark = Color(0xFFC4C6D0)
val outlineDark = Color(0xFF8E9099)
val outlineVariantDark = Color(0xFF44474E)
val scrimDark = Color(0xFF000000)
val inverseSurfaceDark = Color(0xFFE2E2E9)
val inverseOnSurfaceDark = Color(0xFF2E3036)
val inversePrimaryDark = Color(0xFF415F91)
val surfaceDimDark = Color(0xFF111318)
val surfaceBrightDark = Color(0xFF37393E)
val surfaceContainerLowestDark = Color(0xFF0C0E13)
val surfaceContainerLowDark = Color(0xFF191C20)
val surfaceContainerDark = Color(0xFF1D2024)
val surfaceContainerHighDark = Color(0xFF282A2F)
val surfaceContainerHighestDark = Color(0xFF33353A)

// Fixed roles hold one value across both schemes, so they carry no Light/Dark suffix.
val primaryFixed = Color(0xFFD6E3FF)
val primaryFixedDim = Color(0xFFAAC7FF)
val onPrimaryFixed = Color(0xFF001B3E)
val onPrimaryFixedVariant = Color(0xFF284777)
val secondaryFixed = Color(0xFFDAE2F9)
val secondaryFixedDim = Color(0xFFBEC6DC)
val onSecondaryFixed = Color(0xFF131C2B)
val onSecondaryFixedVariant = Color(0xFF3E4759)
val tertiaryFixed = Color(0xFFFAD8FD)
val tertiaryFixedDim = Color(0xFFDDBCE0)
val onTertiaryFixed = Color(0xFF28132E)
val onTertiaryFixedVariant = Color(0xFF573E5C)

// Semantic colours are defined once in :core so the native iOS UI reads the same values.
private fun brand(argb: Long) = Color(argb.toULong() shl 32)

// Session Type Colors
val sessionTypeTechnique = brand(BrandColors.SessionTypeTechnique)
val sessionTypeMatchPlay = brand(BrandColors.SessionTypeMatchPlay)
val sessionTypeTournament = brand(BrandColors.SessionTypeTournament)
val sessionTypeServePractice = brand(BrandColors.SessionTypeServePractice)
val sessionTypePhysical = brand(BrandColors.SessionTypePhysical)
val sessionTypeFreePlay = brand(BrandColors.SessionTypeFreePlay)
val sessionTypeOther = brand(BrandColors.SessionTypeOther)

// Win/Loss Colors
val winColor = brand(BrandColors.Win)
val lossColor = brand(BrandColors.Loss)
val winContainerColor = brand(BrandColors.WinContainer)
val onWinContainerColor = brand(BrandColors.OnWinContainer)

// Win/Loss as text on a light widget background: the brand green measures 2.9:1 there, so light
// mode uses a deeper tone of each hue, as iOS's `Palette.matchWinText` does. Dark mode keeps the brand.
val winTextLight = Color(0xFF2E7D32)
val lossTextLight = Color(0xFFC62828)

/// The Pro accent choices, one Material tonal set per light/dark, seeded from the same system hues
/// iOS uses for `AccentChoice`: primary, onPrimary, primaryContainer, onPrimaryContainer.
data class AccentTones(val primary: Color, val onPrimary: Color, val container: Color, val onContainer: Color)

data class AccentPalette(val swatch: Color, val light: AccentTones, val dark: AccentTones)

val accentGreen = AccentPalette(
	swatch = Color(0xFF34C759),
	light = AccentTones(Color(0xFF006E26), Color(0xFFFFFFFF), Color(0xFF97F7A0), Color(0xFF002106)),
	dark = AccentTones(Color(0xFF7BDA87), Color(0xFF00390F), Color(0xFF00531A), Color(0xFF97F7A0))
)
val accentTeal = AccentPalette(
	swatch = Color(0xFF30B0C7),
	light = AccentTones(Color(0xFF006878), Color(0xFFFFFFFF), Color(0xFFA6EEFF), Color(0xFF001F25)),
	dark = AccentTones(Color(0xFF83D2E4), Color(0xFF00363F), Color(0xFF004E5A), Color(0xFFA6EEFF))
)
val accentIndigo = AccentPalette(
	swatch = Color(0xFF5856D6),
	light = AccentTones(Color(0xFF4D4BC9), Color(0xFFFFFFFF), Color(0xFFE2DFFF), Color(0xFF0E0068)),
	dark = AccentTones(Color(0xFFC2C1FF), Color(0xFF1F1B98), Color(0xFF3631B1), Color(0xFFE2DFFF))
)
val accentPurple = AccentPalette(
	swatch = Color(0xFFAF52DE),
	light = AccentTones(Color(0xFF8B32B8), Color(0xFFFFFFFF), Color(0xFFF8D8FF), Color(0xFF330045)),
	dark = AccentTones(Color(0xFFECB1FF), Color(0xFF52006F), Color(0xFF71139D), Color(0xFFF8D8FF))
)
val accentPink = AccentPalette(
	swatch = Color(0xFFFF2D55),
	light = AccentTones(Color(0xFFBA0B45), Color(0xFFFFFFFF), Color(0xFFFFD9DD), Color(0xFF400012)),
	dark = AccentTones(Color(0xFFFFB2BC), Color(0xFF670021), Color(0xFF910032), Color(0xFFFFD9DD))
)
val accentRed = AccentPalette(
	swatch = Color(0xFFFF3B30),
	light = AccentTones(Color(0xFFB9161B), Color(0xFFFFFFFF), Color(0xFFFFDAD5), Color(0xFF410001)),
	dark = AccentTones(Color(0xFFFFB4AA), Color(0xFF690003), Color(0xFF930007), Color(0xFFFFDAD5))
)
val accentOrange = AccentPalette(
	swatch = Color(0xFFFF9500),
	light = AccentTones(Color(0xFF8B5000), Color(0xFFFFFFFF), Color(0xFFFFDCBE), Color(0xFF2C1600)),
	dark = AccentTones(Color(0xFFFFB870), Color(0xFF4A2800), Color(0xFF6A3C00), Color(0xFFFFDCBE))
)
