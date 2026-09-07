package xyz.tleskiv.tt.viewmodel.sessions

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.DatePeriod
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.YearMonth
import kotlinx.datetime.minus
import kotlinx.datetime.plus
import kotlinx.datetime.yearMonth
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.util.today
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import kotlin.uuid.Uuid

private const val CALENDAR_RANGE_MONTHS = 12
private const val DATE_LIST_RANGE_DAYS = 365

abstract class SessionsScreenViewModel : ViewModelBase() {
	abstract val sessions: StateFlow<Map<LocalDate, List<SessionUiModel>>>

	data class SessionUiModel(
		val id: Uuid,
		val date: LocalDate,
		val durationMinutes: Int,
		val sessionType: SessionType?,
		val rpe: Int,
		val notes: String?
	)
	abstract val firstDayOfWeek: StateFlow<DayOfWeek>
	abstract val highlightCurrentDay: StateFlow<Boolean>
	abstract val inputData: InputData

	class InputData {
		val currentDate: LocalDate = today()
		val selectedDate = MutableStateFlow(currentDate)
		val isWeekMode = MutableStateFlow(true)

		val startDate: LocalDate = currentDate.minus(DatePeriod(days = DATE_LIST_RANGE_DAYS))

		// Each day has: 1 sticky header + N items (sessions or 1 placeholder if empty)
		// With empty sessions, each day = 2 items, so header index = dayOffset * 2
		val initialListIndex: Int = (currentDate.toEpochDays() - startDate.toEpochDays()).toInt() * 2

		val currentYearMonth: YearMonth = currentDate.yearMonth
		val startYearMonth: YearMonth = currentDate.minus(DatePeriod(months = CALENDAR_RANGE_MONTHS)).yearMonth
		val endYearMonth: YearMonth = currentDate.plus(DatePeriod(months = CALENDAR_RANGE_MONTHS)).yearMonth
	}
}
