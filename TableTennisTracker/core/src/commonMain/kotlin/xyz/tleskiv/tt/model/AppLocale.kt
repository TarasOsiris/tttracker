package xyz.tleskiv.tt.model

enum class AppLocale(val languageTag: String, val displayName: String) {
	SYSTEM("", "System default"),
	ENGLISH("en", "English"),
	ARABIC("ar", "العربية"),
	GERMAN("de", "Deutsch"),
	SPANISH("es", "Español"),
	FRENCH("fr", "Français"),
	HINDI("hi", "हिन्दी"),
	INDONESIAN("id", "Bahasa Indonesia"),
	ITALIAN("it", "Italiano"),
	JAPANESE("ja", "日本語"),
	KOREAN("ko", "한국어"),
	PORTUGUESE("pt", "Português"),
	TURKISH("tr", "Türkçe"),
	UKRAINIAN("uk", "Українська"),
	CHINESE_SIMPLIFIED("zh-CN", "简体中文");

	companion object {
		fun fromLanguageTag(tag: String?): AppLocale = entries.find { it.languageTag == tag } ?: SYSTEM

		/// Resolves a platform tag such as `de-DE` or `zh-Hans-CN` onto the closest language the app
		/// actually ships, matching on the primary subtag when the full tag is not one of ours.
		/// Falls back to [ENGLISH], the base language every string is written in.
		fun matching(languageTag: String): AppLocale {
			val tag = languageTag.replace('_', '-')
			val shipped = entries.filter { it != SYSTEM }
			shipped.find { it.languageTag.equals(tag, ignoreCase = true) }?.let { return it }
			val language = tag.substringBefore('-')
			return shipped.find { it.languageTag.substringBefore('-').equals(language, ignoreCase = true) } ?: ENGLISH
		}
	}
}
