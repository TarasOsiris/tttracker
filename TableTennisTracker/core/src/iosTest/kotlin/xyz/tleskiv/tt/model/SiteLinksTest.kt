package xyz.tleskiv.tt.model

import io.kotest.matchers.shouldBe
import kotlin.test.Test

class SiteLinksTest {

	@Test
	fun privacyPolicy_englishTag_isTheRootPage() {
		val expected = "https://ttapp.smashyapps.com/privacy"

		SiteLinks.privacyPolicy("en-US") shouldBe expected
	}

	@Test
	fun privacyPolicy_languageTheSiteHas_isItsTranslatedPage() {
		val expected = "https://ttapp.smashyapps.com/de/privacy"

		SiteLinks.privacyPolicy("de-AT") shouldBe expected
	}

	@Test
	fun privacyPolicy_traditionalChinese_usesTheSitesZhTwCode() {
		val expected = "https://ttapp.smashyapps.com/zh-tw/privacy"

		SiteLinks.privacyPolicy("zh-Hant-HK") shouldBe expected
	}

	@Test
	fun privacyPolicy_languageTheSiteLacks_fallsBackToEnglish() {
		val expected = "https://ttapp.smashyapps.com/privacy"

		SiteLinks.privacyPolicy("pl-PL") shouldBe expected
	}

	@Test
	fun home_englishTag_isTheSiteRoot() {
		val languageTag = "en-GB"
		val expected = "https://ttapp.smashyapps.com"

		SiteLinks.home(languageTag) shouldBe expected
	}

	@Test
	fun home_languageTheSiteHas_isItsTranslatedHome() {
		val languageTag = "ja-JP"
		val expected = "https://ttapp.smashyapps.com/ja"

		SiteLinks.home(languageTag) shouldBe expected
	}
}
