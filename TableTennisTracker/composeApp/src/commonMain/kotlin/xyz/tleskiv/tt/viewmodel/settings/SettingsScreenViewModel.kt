package xyz.tleskiv.tt.viewmodel.settings

import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.viewmodel.ViewModelBase

abstract class SettingsScreenViewModel : ViewModelBase() {
	abstract val defaultSessionDuration: StateFlow<Int>
	abstract val defaultRpe: StateFlow<Int>
	abstract val defaultSessionType: StateFlow<SessionType>
	abstract val defaultNotes: StateFlow<String>

	abstract fun setDefaultSessionDuration(minutes: Int)
	abstract fun setDefaultRpe(rpe: Int)
	abstract fun setDefaultSessionType(sessionType: SessionType)
	abstract fun setDefaultNotes(notes: String)
}
