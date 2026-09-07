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
	}
}
