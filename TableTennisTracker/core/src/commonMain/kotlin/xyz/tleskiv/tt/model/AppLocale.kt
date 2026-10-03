package xyz.tleskiv.tt.model

enum class AppLocale(val languageTag: String, val displayName: String) {
	SYSTEM("", "System default"),
	ENGLISH("en", "English"),
	ARABIC("ar", "العربية"),
	CZECH("cs", "Čeština"),
	GERMAN("de", "Deutsch"),
	SPANISH("es", "Español"),
	FRENCH("fr", "Français"),
	HINDI("hi", "हिन्दी"),
	INDONESIAN("id", "Bahasa Indonesia"),
	ITALIAN("it", "Italiano"),
	JAPANESE("ja", "日本語"),
	KOREAN("ko", "한국어"),
	MALAY("ms", "Bahasa Melayu"),
	DUTCH("nl", "Nederlands"),
	POLISH("pl", "Polski"),
	PORTUGUESE("pt", "Português"),
	SWEDISH("sv", "Svenska"),
	THAI("th", "ไทย"),
	TURKISH("tr", "Türkçe"),
	UKRAINIAN("uk", "Українська"),
	VIETNAMESE("vi", "Tiếng Việt"),
	CHINESE_SIMPLIFIED("zh-CN", "简体中文"),
	CHINESE_TRADITIONAL("zh-TW", "繁體中文");

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
			if (language.equals("zh", ignoreCase = true)) return chinese(tag)
			return shipped.find { it.languageTag.substringBefore('-').equals(language, ignoreCase = true) } ?: ENGLISH
		}

		/// Chinese splits by script, not by language: `zh-Hant-HK` and `zh-MO` read Traditional, and
		/// sharing the `zh` prefix with Simplified would otherwise send them to the wrong one.
		private fun chinese(tag: String): AppLocale {
			val subtags = tag.split('-').drop(1).map { it.lowercase() }
			return when {
				"hans" in subtags -> CHINESE_SIMPLIFIED
				"hant" in subtags -> CHINESE_TRADITIONAL
				subtags.any { it in TRADITIONAL_REGIONS } -> CHINESE_TRADITIONAL
				else -> CHINESE_SIMPLIFIED
			}
		}

		private val TRADITIONAL_REGIONS = setOf("tw", "hk", "mo")
	}
}
