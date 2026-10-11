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
}
