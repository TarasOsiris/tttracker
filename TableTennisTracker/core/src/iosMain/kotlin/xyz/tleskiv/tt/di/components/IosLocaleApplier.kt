package xyz.tleskiv.tt.di.components

import platform.Foundation.NSLocale
import platform.Foundation.NSUserDefaults
import platform.Foundation.currentLocale
import platform.Foundation.languageCode

class IosLocaleApplier : LocaleApplier {
	private val langKey = "AppleLanguages"
	private val defaultLocale: String = NSLocale.currentLocale.languageCode

	override fun applyLocale(languageTag: String?) {
		if (languageTag.isNullOrEmpty()) {
			NSUserDefaults.standardUserDefaults.removeObjectForKey(langKey)
		} else {
			NSUserDefaults.standardUserDefaults.setObject(listOf(languageTag), langKey)
		}
	}

	override fun getSystemLocale(): String = defaultLocale
}
