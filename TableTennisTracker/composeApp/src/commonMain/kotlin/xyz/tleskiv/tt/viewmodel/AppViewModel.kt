package xyz.tleskiv.tt.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.repo.UserPreferencesRepository

class AppViewModel(
	private val userPreferencesRepository: UserPreferencesRepository
) : ViewModel() {

	val themeMode: StateFlow<AppThemeMode> = userPreferencesRepository.themeMode
		.stateIn(
			scope = viewModelScope,
			started = SharingStarted.WhileSubscribed(5000),
			initialValue = AppThemeMode.SYSTEM
		)
}
