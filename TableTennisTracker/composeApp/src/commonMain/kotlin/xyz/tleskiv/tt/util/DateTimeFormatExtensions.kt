package xyz.tleskiv.tt.util

import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.YearMonth
import xyz.tleskiv.tt.util.ext.capCase

fun DayOfWeek.displayText(): String = name.take(3).capCase()

fun YearMonth.formatMonthYear(): String = "${month.name.capCase()} $year"

fun LocalDate.formatDayMonth(): String = "$day ${month.name.take(3).capCase()}"

fun LocalDate.formatDateHeader(currentDate: LocalDate): String {
	val daysDiff = toEpochDays() - currentDate.toEpochDays()
	return when (daysDiff.toInt()) {
		-1 -> "Yesterday"
		0 -> "Today"
		1 -> "Tomorrow"
		else -> dayOfWeek.name.capCase()
	}
}

fun LocalDate.formatFullDate(): String = "${month.name.capCase()} $day, $year"

fun formatSessionDateFull(date: LocalDate): String =
	"${date.dayOfWeek.name.capCase()}, ${date.month.name.capCase()} ${date.day}, ${date.year}"

fun formatDuration(minutes: Int): String = when {
	minutes < 60 -> "$minutes minutes"
	minutes % 60 == 0 -> "${minutes / 60} hour${if (minutes / 60 > 1) "s" else ""}"
	else -> "${minutes / 60}h ${minutes % 60}min"
}

