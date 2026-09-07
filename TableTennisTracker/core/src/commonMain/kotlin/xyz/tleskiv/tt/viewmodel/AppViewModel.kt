package xyz.tleskiv.tt.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import xyz.tleskiv.tt.di.components.LocaleApplier
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.repo.UserPreferencesRepository

class AppViewModel(
	private val userPreferencesRepository: UserPreferencesRepository,
	private val localeApplier: LocaleApplier
) : ViewModel() {

	val themeMode: StateFlow<AppThemeMode?> = userPreferencesRepository.themeMode
		.stateIn(
			scope = viewModelScope,
			started = SharingStarted.Eagerly,
			initialValue = null
		)

	val appLocale: StateFlow<AppLocale?> = userPreferencesRepository.appLocale
		.stateIn(
			scope = viewModelScope,
			started = SharingStarted.Eagerly,
			initialValue = null
		)

	fun applyLocale(locale: AppLocale) {
		val tag = if (locale == AppLocale.SYSTEM) null else locale.languageTag
		localeApplier.applyLocale(tag)
	}
}
