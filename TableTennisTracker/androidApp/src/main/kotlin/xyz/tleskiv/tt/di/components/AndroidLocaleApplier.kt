package xyz.tleskiv.tt.di.components

import java.util.Locale

class AndroidLocaleApplier : LocaleApplier {
	private var defaultLocale: Locale? = null

	override fun applyLocale(languageTag: String?) {
		if (defaultLocale == null) {
			defaultLocale = Locale.getDefault()
		}
		val newLocale = if (languageTag.isNullOrEmpty()) {
			defaultLocale!!
		} else {
			Locale.forLanguageTag(languageTag)
		}
		Locale.setDefault(newLocale)
	}

	override fun getSystemLocale(): String = Locale.getDefault().toLanguageTag()
}
