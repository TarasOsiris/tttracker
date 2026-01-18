package xyz.tleskiv.tt.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.repo.UserPreferencesRepository

class SettingsViewModel(
	private val userPreferencesRepository: UserPreferencesRepository
) : ViewModel() {

	val currentThemeMode: StateFlow<AppThemeMode> = userPreferencesRepository.themeMode
		.stateIn(
			scope = viewModelScope,
			started = SharingStarted.WhileSubscribed(5000),
			initialValue = AppThemeMode.SYSTEM
		)

	fun setThemeMode(mode: AppThemeMode) {
		viewModelScope.launch {
			userPreferencesRepository.setThemeMode(mode)
		}
	}
}
