package xyz.tleskiv.tt.di.components

interface LocaleApplier {
	fun applyLocale(languageTag: String?)
	fun getSystemLocale(): String
}
