package xyz.tleskiv.tt.util.ext

import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.atStartOfDayIn
import kotlinx.datetime.toLocalDateTime
import kotlin.time.Instant

/**
 * Converts epoch milliseconds to [LocalDateTime] using the system's default time zone.
 */
fun Long.toLocalDateTime(): LocalDateTime =
	Instant.fromEpochMilliseconds(this)
		.toLocalDateTime(TimeZone.currentSystemDefault())

/**
 * Converts epoch milliseconds to [LocalDate] using the system's default time zone.
 */
fun Long.toLocalDate(): LocalDate = this.toLocalDateTime().date

/**
 * Converts epoch milliseconds to [LocalDate] using UTC time zone.
 * Useful for date pickers that work in UTC.
 */
fun Long.toLocalDateUtc(): LocalDate =
	Instant.fromEpochMilliseconds(this)
		.toLocalDateTime(TimeZone.UTC).date

/**
 * Converts [LocalDate] to epoch milliseconds at start of day in UTC.
 */
fun LocalDate.toEpochMillis(): Long = atStartOfDayIn(TimeZone.UTC).toEpochMilliseconds()
