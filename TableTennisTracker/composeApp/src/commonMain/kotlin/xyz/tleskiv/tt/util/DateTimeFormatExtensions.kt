package xyz.tleskiv.tt.util

import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.YearMonth

fun DayOfWeek.displayText(): String {
	return name.take(3).lowercase().replaceFirstChar { it.uppercase() }
}

fun YearMonth.formatMonthYear(): String {
	val monthName = month.name.lowercase().replaceFirstChar { it.uppercase() }
	return "$monthName $year"
}

fun LocalDate.formatDayMonth(): String {
	val monthName = month.name.take(3).lowercase().replaceFirstChar { it.uppercase() }
	return "$day $monthName"
}

fun LocalDate.formatDateHeader(currentDate: LocalDate): String {
	val daysDiff = toEpochDays() - currentDate.toEpochDays()
	return when (daysDiff.toInt()) {
		-1 -> "Yesterday"
		0 -> "Today"
		1 -> "Tomorrow"
		else -> dayOfWeek.name.lowercase().replaceFirstChar { it.uppercase() }
	}
}

fun LocalDate.formatFullDate(): String {
	val monthName = month.name.lowercase().replaceFirstChar { it.uppercase() }
	return "$monthName $day, $year"
}
