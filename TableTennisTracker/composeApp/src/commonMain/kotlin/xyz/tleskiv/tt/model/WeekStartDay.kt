package xyz.tleskiv.tt.model

import kotlinx.datetime.DayOfWeek

enum class WeekStartDay {
	MONDAY,
	SUNDAY,
	SATURDAY;

	fun toDayOfWeek(): DayOfWeek = when (this) {
		MONDAY -> DayOfWeek.MONDAY
		SUNDAY -> DayOfWeek.SUNDAY
		SATURDAY -> DayOfWeek.SATURDAY
	}
}
