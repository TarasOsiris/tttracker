package xyz.tleskiv.tt.previews.fakes

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.viewmodel.settings.DataExportViewModel

class FakeDataExportViewModel(isExporting: Boolean = false) : DataExportViewModel() {
	override val isExporting: StateFlow<Boolean> = MutableStateFlow(isExporting)
	override val failure: StateFlow<String?> = MutableStateFlow(null)

	override fun export() {}
	override fun dismissFailure() {}
}
