package xyz.tleskiv.tt.viewmodel.settings

import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.viewmodel.ViewModelBase

abstract class SettingsScreenViewModel : ViewModelBase() {
	abstract val defaultSessionDuration: StateFlow<Int>
	abstract val defaultRpe: StateFlow<Int>

	abstract fun setDefaultSessionDuration(minutes: Int)
	abstract fun setDefaultRpe(rpe: Int)
}
