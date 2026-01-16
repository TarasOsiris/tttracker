package xyz.tleskiv.tt.util

import androidx.compose.runtime.Composable
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.Month
import kotlinx.datetime.YearMonth
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.*

@Composable
fun DayOfWeek.displayText(): String = stringResource(
	when (this) {
		DayOfWeek.MONDAY -> Res.string.day_monday_short
		DayOfWeek.TUESDAY -> Res.string.day_tuesday_short
		DayOfWeek.WEDNESDAY -> Res.string.day_wednesday_short
		DayOfWeek.THURSDAY -> Res.string.day_thursday_short
		DayOfWeek.FRIDAY -> Res.string.day_friday_short
		DayOfWeek.SATURDAY -> Res.string.day_saturday_short
		DayOfWeek.SUNDAY -> Res.string.day_sunday_short
		else -> Res.string.day_monday_short // Fallback
	}
)

@Composable
fun DayOfWeek.fullText(): String = stringResource(
	when (this) {
		DayOfWeek.MONDAY -> Res.string.day_monday
		DayOfWeek.TUESDAY -> Res.string.day_tuesday
		DayOfWeek.WEDNESDAY -> Res.string.day_wednesday
		DayOfWeek.THURSDAY -> Res.string.day_thursday
		DayOfWeek.FRIDAY -> Res.string.day_friday
		DayOfWeek.SATURDAY -> Res.string.day_saturday
		DayOfWeek.SUNDAY -> Res.string.day_sunday
		else -> Res.string.day_monday
	}
)

@Composable
fun Month.displayText(): String = stringResource(
	when (this) {
		Month.JANUARY -> Res.string.month_january
		Month.FEBRUARY -> Res.string.month_february
		Month.MARCH -> Res.string.month_march
		Month.APRIL -> Res.string.month_april
		Month.MAY -> Res.string.month_may
		Month.JUNE -> Res.string.month_june
		Month.JULY -> Res.string.month_july
		Month.AUGUST -> Res.string.month_august
		Month.SEPTEMBER -> Res.string.month_september
		Month.OCTOBER -> Res.string.month_october
		Month.NOVEMBER -> Res.string.month_november
		Month.DECEMBER -> Res.string.month_december
		else -> Res.string.month_january
	}
)

@Composable
fun Month.shortDisplayText(): String = stringResource(
	when (this) {
		Month.JANUARY -> Res.string.month_january_short
		Month.FEBRUARY -> Res.string.month_february_short
		Month.MARCH -> Res.string.month_march_short
		Month.APRIL -> Res.string.month_april_short
		Month.MAY -> Res.string.month_may_short
		Month.JUNE -> Res.string.month_june_short
		Month.JULY -> Res.string.month_july_short
		Month.AUGUST -> Res.string.month_august_short
		Month.SEPTEMBER -> Res.string.month_september_short
		Month.OCTOBER -> Res.string.month_october_short
		Month.NOVEMBER -> Res.string.month_november_short
		Month.DECEMBER -> Res.string.month_december_short
		else -> Res.string.month_january_short
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
		-1 -> stringResource(Res.string.time_yesterday)
		0 -> stringResource(Res.string.time_today)
		1 -> stringResource(Res.string.time_tomorrow)
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
	minutes < 60 -> stringResource(Res.string.duration_minutes_full, minutes)
	minutes % 60 == 0 -> {
		val hours = minutes / 60
		if (hours == 1) stringResource(Res.string.duration_hours_full, hours)
		else stringResource(Res.string.duration_hours_plural_full, hours)
	}

	else -> stringResource(Res.string.duration_hm_short, minutes / 60, minutes % 60)
}
