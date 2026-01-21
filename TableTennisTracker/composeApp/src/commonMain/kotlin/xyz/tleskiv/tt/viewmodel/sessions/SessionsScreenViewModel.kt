package xyz.tleskiv.tt.viewmodel.sessions

import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.kizitonwose.calendar.core.minusMonths
import com.kizitonwose.calendar.core.now
import com.kizitonwose.calendar.core.plusMonths
import kotlinx.coroutines.flow.StateFlow
import kotlinx.datetime.DatePeriod
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.YearMonth
import kotlinx.datetime.minus
import kotlinx.datetime.yearMonth
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.viewmodel.ViewModelBase
import kotlin.uuid.Uuid

data class SessionUiModel(
	val id: Uuid,
	val date: LocalDate,
	val durationMinutes: Int,
	val sessionType: SessionType?,
	val rpe: Int,
	val notes: String?
)

private const val CALENDAR_RANGE_MONTHS = 12
private const val DATE_LIST_RANGE_DAYS = 365

abstract class SessionsScreenViewModel : ViewModelBase() {
	abstract val sessions: StateFlow<Map<LocalDate, List<SessionUiModel>>>
	abstract val firstDayOfWeek: StateFlow<DayOfWeek>
	abstract val highlightCurrentDay: StateFlow<Boolean>
	abstract val inputData: InputData

	@Stable
	class InputData {
		val currentDate: LocalDate = LocalDate.now()
		var selectedDate by mutableStateOf(currentDate)
		var isWeekMode by mutableStateOf(true)

		// Derived date values for calendar
		val startDate: LocalDate = currentDate.minus(DatePeriod(days = DATE_LIST_RANGE_DAYS))
		// Each day has: 1 sticky header + N items (sessions or 1 placeholder if empty)
		// With empty sessions, each day = 2 items, so header index = dayOffset * 2
		val initialListIndex: Int = (currentDate.toEpochDays() - startDate.toEpochDays()).toInt() * 2

		val currentYearMonth: YearMonth = currentDate.yearMonth
		val startYearMonth: YearMonth = currentYearMonth.minusMonths(CALENDAR_RANGE_MONTHS)
		val endYearMonth: YearMonth = currentYearMonth.plusMonths(CALENDAR_RANGE_MONTHS)
	}
}
