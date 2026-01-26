package xyz.tleskiv.tt.previews.fakes

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class FakeDebugScreenViewModel : FakeViewModel() {
	val isGenerating: StateFlow<Boolean> = MutableStateFlow(false)
	val isClearing: StateFlow<Boolean> = MutableStateFlow(false)

	fun generateRandomSessions(count: Int) {}
	fun clearAllSessions() {}
}
