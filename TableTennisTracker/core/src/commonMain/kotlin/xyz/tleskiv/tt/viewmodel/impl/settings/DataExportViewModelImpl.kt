package xyz.tleskiv.tt.viewmodel.impl.settings

import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.di.components.FileSharer
import xyz.tleskiv.tt.di.components.SharedTextFile
import xyz.tleskiv.tt.export.matchesCsv
import xyz.tleskiv.tt.export.sessionsCsv
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.util.today
import xyz.tleskiv.tt.viewmodel.settings.DataExportViewModel
import kotlin.coroutines.cancellation.CancellationException

/** Writes the log out as two CSV files for the share sheet, as iOS's `DataExportModel` does. */
class DataExportViewModelImpl(
	private val sessions: TrainingSessionService,
	private val fileSharer: FileSharer,
	private val analytics: AnalyticsService
) : DataExportViewModel() {

	private val _isExporting = MutableStateFlow(false)
	override val isExporting: StateFlow<Boolean> = _isExporting.asStateFlow()

	private val _failure = MutableStateFlow<String?>(null)
	override val failure: StateFlow<String?> = _failure.asStateFlow()

	override fun export() {
		if (_isExporting.value) return
		_isExporting.value = true
		viewModelScope.launch {
			try {
				val all = sessions.getAllSessions()
				val stamp = today().toString()
				fileSharer.shareTextFiles(
					listOf(
						SharedTextFile("tt-tracker-sessions-$stamp.csv", CSV_MIME_TYPE, sessionsCsv(all)),
						SharedTextFile("tt-tracker-matches-$stamp.csv", CSV_MIME_TYPE, matchesCsv(all))
					)
				)
				analytics.capture("data_exported", mapOf("sessions" to all.size))
			} catch (e: CancellationException) {
				throw e
			} catch (e: Exception) {
				_failure.value = e.message.orEmpty()
			} finally {
				_isExporting.value = false
			}
		}
	}

	override fun dismissFailure() {
		_failure.value = null
	}

	private companion object {
		const val CSV_MIME_TYPE = "text/csv"
	}
}
