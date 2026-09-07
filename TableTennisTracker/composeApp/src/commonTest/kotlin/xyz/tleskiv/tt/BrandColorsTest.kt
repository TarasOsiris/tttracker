package xyz.tleskiv.tt

import androidx.compose.ui.graphics.Color
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

	test("getRpeColor_forEveryLevel_readsTheSharedRamp") {
		val validRpeRange = 1..10
		validRpeRange.forEach { rpe -> getRpeColor(rpe).argb() shouldBe BrandColors.RpeRamp[rpe - 1] }
	}

	test("getRpeColor_outOfRange_clampsToTheEnds") {
		getRpeColor(0).argb() shouldBe BrandColors.RpeRamp.first()
		getRpeColor(99).argb() shouldBe BrandColors.RpeRamp.last()
	}
})
