package xyz.tleskiv.tt.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import xyz.tleskiv.tt.R

private val MontserratFontFamily = FontFamily(
	Font(R.font.montserrat_regular, FontWeight.Normal),
	Font(R.font.montserrat_medium, FontWeight.Medium),
	Font(R.font.montserrat_semibold, FontWeight.SemiBold),
	Font(R.font.montserrat_bold, FontWeight.Bold),
)

private val PoppinsFontFamily = FontFamily(
	Font(R.font.poppins_regular, FontWeight.Normal),
	Font(R.font.poppins_medium, FontWeight.Medium),
	Font(R.font.poppins_semibold, FontWeight.SemiBold),
	Font(R.font.poppins_bold, FontWeight.Bold),
)

@Composable
fun AppTypography(): Typography {
	val montserrat = MontserratFontFamily
	val poppins = PoppinsFontFamily

	// Display styles - Montserrat
	val displayLarge = TextStyle(
		fontFamily = montserrat,
		fontWeight = FontWeight.Normal,
		fontSize = 57.sp,
		lineHeight = 64.sp,
		letterSpacing = (-0.25).sp
	)
	val displayMedium = TextStyle(
		fontFamily = montserrat,
		fontWeight = FontWeight.Normal,
		fontSize = 45.sp,
		lineHeight = 52.sp,
		letterSpacing = 0.sp
	)
	val displaySmall = TextStyle(
		fontFamily = montserrat,
		fontWeight = FontWeight.Normal,
		fontSize = 36.sp,
		lineHeight = 44.sp,
		letterSpacing = 0.sp
	)

	// Headline styles - Montserrat
	val headlineLarge = TextStyle(
		fontFamily = montserrat,
		fontWeight = FontWeight.SemiBold,
		fontSize = 32.sp,
		lineHeight = 40.sp,
		letterSpacing = 0.sp
	)
	val headlineMedium = TextStyle(
		fontFamily = montserrat,
		fontWeight = FontWeight.SemiBold,
		fontSize = 28.sp,
		lineHeight = 36.sp,
		letterSpacing = 0.sp
	)
	val headlineSmall = TextStyle(
		fontFamily = montserrat,
		fontWeight = FontWeight.SemiBold,
		fontSize = 24.sp,
		lineHeight = 32.sp,
		letterSpacing = 0.sp
	)

	// Title styles - Montserrat
	val titleLarge = TextStyle(
		fontFamily = montserrat,
		fontWeight = FontWeight.Medium,
		fontSize = 22.sp,
		lineHeight = 28.sp,
		letterSpacing = 0.sp
	)
	val titleMedium = TextStyle(
		fontFamily = montserrat,
		fontWeight = FontWeight.Medium,
		fontSize = 16.sp,
		lineHeight = 24.sp,
		letterSpacing = 0.15.sp
	)
	val titleSmall = TextStyle(
		fontFamily = montserrat,
		fontWeight = FontWeight.Medium,
		fontSize = 14.sp,
		lineHeight = 20.sp,
		letterSpacing = 0.1.sp
	)

	// Body styles - Poppins
	val bodyLarge = TextStyle(
		fontFamily = poppins,
		fontWeight = FontWeight.Normal,
		fontSize = 16.sp,
		lineHeight = 24.sp,
		letterSpacing = 0.5.sp
	)
	val bodyMedium = TextStyle(
		fontFamily = poppins,
		fontWeight = FontWeight.Normal,
		fontSize = 14.sp,
		lineHeight = 20.sp,
		letterSpacing = 0.25.sp
	)
	val bodySmall = TextStyle(
		fontFamily = poppins,
		fontWeight = FontWeight.Normal,
		fontSize = 12.sp,
		lineHeight = 16.sp,
		letterSpacing = 0.4.sp
	)

	// Label styles - Poppins
	val labelLarge = TextStyle(
		fontFamily = poppins,
		fontWeight = FontWeight.Medium,
		fontSize = 14.sp,
		lineHeight = 20.sp,
		letterSpacing = 0.1.sp
	)
	val labelMedium = TextStyle(
		fontFamily = poppins,
		fontWeight = FontWeight.Medium,
		fontSize = 12.sp,
		lineHeight = 16.sp,
		letterSpacing = 0.5.sp
	)
	val labelSmall = TextStyle(
		fontFamily = poppins,
		fontWeight = FontWeight.Medium,
		fontSize = 11.sp,
		lineHeight = 16.sp,
		letterSpacing = 0.5.sp
	)

	return Typography(
		displayLarge = displayLarge,
		displayMedium = displayMedium,
		displaySmall = displaySmall,
		headlineLarge = headlineLarge,
		headlineMedium = headlineMedium,
		headlineSmall = headlineSmall,
		titleLarge = titleLarge,
		titleMedium = titleMedium,
		titleSmall = titleSmall,
		bodyLarge = bodyLarge,
		bodyMedium = bodyMedium,
		bodySmall = bodySmall,
		labelLarge = labelLarge,
		labelMedium = labelMedium,
		labelSmall = labelSmall,
		displayLargeEmphasized = displayLarge.copy(fontWeight = FontWeight.Medium, letterSpacing = 0.sp),
		displayMediumEmphasized = displayMedium.copy(fontWeight = FontWeight.Medium),
		displaySmallEmphasized = displaySmall.copy(fontWeight = FontWeight.Medium),
		headlineLargeEmphasized = headlineLarge.copy(fontWeight = FontWeight.Bold),
		headlineMediumEmphasized = headlineMedium.copy(fontWeight = FontWeight.Bold),
		headlineSmallEmphasized = headlineSmall.copy(fontWeight = FontWeight.Bold),
		titleLargeEmphasized = titleLarge.copy(fontWeight = FontWeight.SemiBold),
		titleMediumEmphasized = titleMedium.copy(fontWeight = FontWeight.Bold),
		titleSmallEmphasized = titleSmall.copy(fontWeight = FontWeight.Bold),
		bodyLargeEmphasized = bodyLarge.copy(fontWeight = FontWeight.Medium, letterSpacing = 0.15.sp),
		bodyMediumEmphasized = bodyMedium.copy(fontWeight = FontWeight.Medium),
		bodySmallEmphasized = bodySmall.copy(fontWeight = FontWeight.Medium),
		labelLargeEmphasized = labelLarge.copy(fontWeight = FontWeight.SemiBold),
		labelMediumEmphasized = labelMedium.copy(fontWeight = FontWeight.SemiBold),
		labelSmallEmphasized = labelSmall.copy(fontWeight = FontWeight.SemiBold),
	)
}
