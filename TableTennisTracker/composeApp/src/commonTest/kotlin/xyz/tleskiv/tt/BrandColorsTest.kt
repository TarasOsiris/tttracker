package xyz.tleskiv.tt

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.lerp
import androidx.compose.ui.graphics.toArgb
import io.kotest.core.spec.style.FunSpec
import io.kotest.matchers.shouldBe
import xyz.tleskiv.tt.model.BrandColors
import xyz.tleskiv.tt.ui.theme.lossColor
import xyz.tleskiv.tt.ui.theme.onWinContainerColor
import xyz.tleskiv.tt.ui.theme.sessionTypeFreePlay
import xyz.tleskiv.tt.ui.theme.sessionTypeMatchPlay
import xyz.tleskiv.tt.ui.theme.sessionTypeOther
import xyz.tleskiv.tt.ui.theme.sessionTypePhysical
import xyz.tleskiv.tt.ui.theme.sessionTypeServePractice
import xyz.tleskiv.tt.ui.theme.sessionTypeTechnique
import xyz.tleskiv.tt.ui.theme.sessionTypeTournament
import xyz.tleskiv.tt.ui.theme.winColor
import xyz.tleskiv.tt.ui.theme.winContainerColor
import xyz.tleskiv.tt.util.ui.getRpeColor

private fun Color.argb(): Long = toArgb().toLong() and 0xFFFFFFFFL

class BrandColorsTest : FunSpec({

	test("composeColors_matchBrandColors") {
		val pairs = listOf(
			sessionTypeTechnique to BrandColors.SessionTypeTechnique,
			sessionTypeMatchPlay to BrandColors.SessionTypeMatchPlay,
			sessionTypeTournament to BrandColors.SessionTypeTournament,
			sessionTypeServePractice to BrandColors.SessionTypeServePractice,
			sessionTypePhysical to BrandColors.SessionTypePhysical,
			sessionTypeFreePlay to BrandColors.SessionTypeFreePlay,
			sessionTypeOther to BrandColors.SessionTypeOther,
			winColor to BrandColors.Win,
			lossColor to BrandColors.Loss,
			winContainerColor to BrandColors.WinContainer,
			onWinContainerColor to BrandColors.OnWinContainer
		)
		pairs.forEach { (composeColor, brandArgb) -> composeColor.argb() shouldBe brandArgb }
	}

	// The ramp was generated from this interpolation, and Compose's lerp works in Oklab — an sRGB
	// blend elsewhere would not reproduce it. Pinning the ramp against the original expression is
	// what makes the switch to a lookup table safe; asserting getRpeColor against the ramp it reads
	// would only restate the implementation.
	test("rpeRamp_matchesTheGradientItReplaced") {
		val green = Color(0xFF4CAF50)
		val yellow = Color(0xFFFFC107)
		val red = Color(0xFFF44336)

		val validRpeRange = 1..10
		validRpeRange.forEach { rpe ->
			val fraction = (rpe - 1f) / 9f
			val expected = if (fraction <= 0.5f) {
				lerp(green, yellow, fraction * 2f)
			} else {
				lerp(yellow, red, (fraction - 0.5f) * 2f)
			}
			BrandColors.RpeRamp[rpe - 1] shouldBe expected.argb()
		}
	}

	test("getRpeColor_forEveryLevel_readsTheSharedRamp") {
		val validRpeRange = 1..10
		validRpeRange.forEach { rpe -> getRpeColor(rpe).argb() shouldBe BrandColors.RpeRamp[rpe - 1] }
	}

	test("getRpeColor_outOfRange_clampsToTheEnds") {
		getRpeColor(0).argb() shouldBe BrandColors.RpeRamp.first()
		getRpeColor(99).argb() shouldBe BrandColors.RpeRamp.last()
	}
})
