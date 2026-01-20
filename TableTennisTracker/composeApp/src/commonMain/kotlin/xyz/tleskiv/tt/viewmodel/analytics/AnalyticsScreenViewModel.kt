package xyz.tleskiv.tt.viewmodel.analytics

import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import xyz.tleskiv.tt.viewmodel.sessions.SessionUiModel

abstract class AnalyticsScreenViewModel : ViewModelBase() {
	abstract val sessionsByDate: StateFlow<Map<LocalDate, Int>>
	abstract val totalMinutesByDate: StateFlow<Map<LocalDate, Int>>
	abstract val sessionsListByDate: StateFlow<Map<LocalDate, List<SessionUiModel>>>
}
