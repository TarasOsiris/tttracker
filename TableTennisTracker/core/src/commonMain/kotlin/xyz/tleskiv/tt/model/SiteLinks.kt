package xyz.tleskiv.tt.model

/**
 * Pages on the app's website. The site has fewer languages than the app; a language it lacks gets
 * the English page, which lives at the root rather than under `/en`.
 */
object SiteLinks {
	const val SITE_URL = "https://ttapp.smashyapps.com"

	/** The site's own locale codes, which mirror `website/app/i18n/config.ts` (English excluded). */
	private val siteLocales = mapOf(
		AppLocale.SPANISH to "es", AppLocale.GERMAN to "de", AppLocale.FRENCH to "fr", AppLocale.PORTUGUESE to "pt",
		AppLocale.JAPANESE to "ja", AppLocale.CHINESE_SIMPLIFIED to "zh", AppLocale.CHINESE_TRADITIONAL to "zh-tw",
		AppLocale.KOREAN to "ko", AppLocale.ITALIAN to "it", AppLocale.UKRAINIAN to "uk", AppLocale.TURKISH to "tr",
		AppLocale.INDONESIAN to "id", AppLocale.HINDI to "hi", AppLocale.ARABIC to "ar"
	)

	/** The privacy policy in the language the app is shown in, given as a tag such as `de-DE`. */
	fun privacyPolicy(languageTag: String): String = page("privacy", languageTag)

	private fun page(path: String, languageTag: String): String {
		val prefix = siteLocales[AppLocale.matching(languageTag)]?.let { "/$it" }.orEmpty()
		return "$SITE_URL$prefix/$path"
	}
}
