package xyz.tleskiv.tt.util.ext

import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.Month
import kotlinx.datetime.YearMonth
import xyz.tleskiv.tt.R

@Composable
fun DayOfWeek.displayText(): String = stringResource(
	when (this) {
		DayOfWeek.MONDAY -> R.string.day_monday_short
		DayOfWeek.TUESDAY -> R.string.day_tuesday_short
		DayOfWeek.WEDNESDAY -> R.string.day_wednesday_short
		DayOfWeek.THURSDAY -> R.string.day_thursday_short
		DayOfWeek.FRIDAY -> R.string.day_friday_short
		DayOfWeek.SATURDAY -> R.string.day_saturday_short
		DayOfWeek.SUNDAY -> R.string.day_sunday_short
	}
)

@Composable
fun DayOfWeek.fullText(): String = stringResource(
	when (this) {
		DayOfWeek.MONDAY -> R.string.day_monday
		DayOfWeek.TUESDAY -> R.string.day_tuesday
		DayOfWeek.WEDNESDAY -> R.string.day_wednesday
		DayOfWeek.THURSDAY -> R.string.day_thursday
		DayOfWeek.FRIDAY -> R.string.day_friday
		DayOfWeek.SATURDAY -> R.string.day_saturday
		DayOfWeek.SUNDAY -> R.string.day_sunday
	}
)

@Composable
fun Month.displayText(): String = stringResource(
	when (this) {
		Month.JANUARY -> R.string.month_january
		Month.FEBRUARY -> R.string.month_february
		Month.MARCH -> R.string.month_march
		Month.APRIL -> R.string.month_april
		Month.MAY -> R.string.month_may
		Month.JUNE -> R.string.month_june
		Month.JULY -> R.string.month_july
		Month.AUGUST -> R.string.month_august
		Month.SEPTEMBER -> R.string.month_september
		Month.OCTOBER -> R.string.month_october
		Month.NOVEMBER -> R.string.month_november
		Month.DECEMBER -> R.string.month_december
	}
)

@Composable
fun Month.shortDisplayText(): String = stringResource(
	when (this) {
		Month.JANUARY -> R.string.month_january_short
		Month.FEBRUARY -> R.string.month_february_short
		Month.MARCH -> R.string.month_march_short
		Month.APRIL -> R.string.month_april_short
		Month.MAY -> R.string.month_may_short
		Month.JUNE -> R.string.month_june_short
		Month.JULY -> R.string.month_july_short
		Month.AUGUST -> R.string.month_august_short
		Month.SEPTEMBER -> R.string.month_september_short
		Month.OCTOBER -> R.string.month_october_short
		Month.NOVEMBER -> R.string.month_november_short
		Month.DECEMBER -> R.string.month_december_short
	}
)

@Composable
fun YearMonth.formatMonthYear(): String = "${month.displayText()} $year"

@Composable
fun LocalDate.formatDayMonth(): String = "$day ${month.shortDisplayText()}"

@Composable
fun LocalDate.formatDateHeader(currentDate: LocalDate): String {
	val daysDiff = toEpochDays() - currentDate.toEpochDays()
	return when (daysDiff.toInt()) {
		-1 -> stringResource(R.string.time_yesterday)
		0 -> stringResource(R.string.time_today)
		1 -> stringResource(R.string.time_tomorrow)
		else -> dayOfWeek.fullText()
	}
}

@Composable
fun LocalDate.formatFullDate(): String = "${month.displayText()} $day, $year"

@Composable
fun formatSessionDateFull(date: LocalDate): String =
	"${date.dayOfWeek.fullText()}, ${date.month.displayText()} ${date.day}, ${date.year}"

@Composable
fun formatDuration(minutes: Int): String = when {
	minutes < 60 -> stringResource(R.string.duration_minutes_full, minutes)
	minutes % 60 == 0 -> {
		val hours = minutes / 60
		if (hours == 1) stringResource(R.string.duration_hours_full, hours)
		else stringResource(R.string.duration_hours_plural_full, hours)
	}

	else -> stringResource(R.string.duration_hm_short, minutes / 60, minutes % 60)
}
