package xyz.tleskiv.tt.model

import io.kotest.matchers.shouldBe
import kotlin.test.Test

class AppLocaleTest {
	@Test
	fun matching_withTraditionalScriptOrRegion_returnsTraditionalChinese() {
		val traditionalTags = listOf("zh-TW", "zh-Hant-TW", "zh-Hant-HK", "zh-HK", "zh_MO", "zh-Hant")

		traditionalTags.forEach { AppLocale.matching(it) shouldBe AppLocale.CHINESE_TRADITIONAL }
	}

	@Test
	fun matching_withSimplifiedScriptOrRegion_returnsSimplifiedChinese() {
		val simplifiedTags = listOf("zh-CN", "zh-Hans-CN", "zh-Hans-SG", "zh-SG", "zh", "zh-Hans-HK")

		simplifiedTags.forEach { AppLocale.matching(it) shouldBe AppLocale.CHINESE_SIMPLIFIED }
	}

	@Test
	fun matching_withRegionalVariant_returnsItsLanguage() {
		val tag = "de-AT"

		AppLocale.matching(tag) shouldBe AppLocale.GERMAN
	}

	@Test
	fun matching_withUnshippedLanguage_returnsEnglish() {
		val tag = "fi-FI"

		AppLocale.matching(tag) shouldBe AppLocale.ENGLISH
	}
}
