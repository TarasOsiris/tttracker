package xyz.tleskiv.tt.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.di.components.ClipboardManager
import xyz.tleskiv.tt.di.components.ExternalAppLauncher
import xyz.tleskiv.tt.di.components.NativeInfoProvider
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.UserIdService

class SettingsViewModel(
	private val userPreferencesRepository: UserPreferencesRepository,
	private val nativeInfoProvider: NativeInfoProvider,
	private val externalAppLauncher: ExternalAppLauncher,
	private val userIdService: UserIdService,
	private val clipboardManager: ClipboardManager
) : ViewModel() {

	val versionName: String get() = nativeInfoProvider.versionName
	val buildNumber: String get() = nativeInfoProvider.buildNumber
	val isDebugBuild: Boolean get() = nativeInfoProvider.isDebugBuild

	private val _userId = MutableStateFlow("")
	val userId: StateFlow<String> = _userId.asStateFlow()

	init {
		viewModelScope.launch {
			_userId.value = userIdService.getUserId()
		}
	}

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

	fun sendFeedbackEmail() {
		viewModelScope.launch {
			val userId = userIdService.getUserId()
			externalAppLauncher.sendEmail(
				to = "info@ninevastudios.com",
				subject = "Table Tennis Tracker Feedback",
				body = "\n\n---\nApp Version: $versionName ($buildNumber)\nUser ID: $userId"
			)
		}
	}

	fun rateApp() {
		externalAppLauncher.openAppStore()
	}

	fun copyUserId() {
		clipboardManager.copyToClipboard(_userId.value)
	}
}
