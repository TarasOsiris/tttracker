package xyz.tleskiv.tt.viewmodel.settings

import kotlinx.coroutines.flow.StateFlow
import xyz.tleskiv.tt.viewmodel.ViewModelBase

abstract class DataExportViewModel : ViewModelBase() {
	abstract val isExporting: StateFlow<Boolean>

	/** The failure to show, until [dismissFailure]; an empty message means the failure said nothing. */
	abstract val failure: StateFlow<String?>

	abstract fun export()
	abstract fun dismissFailure()
}
