package xyz.tleskiv.tt.health

import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import kotlin.math.roundToInt
import kotlin.time.Instant

/** A table tennis workout as the platform's health store recorded it. */
data class HealthWorkout(
	/** The health store's own id for the workout, which is what a linked session stores. */
	val id: String,
	val start: Instant,
	val end: Instant,
	val activeEnergyKilocalories: Double?,
	val averageHeartRate: Double?,
	val maxHeartRate: Double?,
	/** The app that recorded it, when the platform says. */
	val sourceName: String?
) {
	val durationMinutes: Int get() = ((end - start).inWholeSeconds / 60.0).roundToInt()

	fun date(timeZone: TimeZone = TimeZone.currentSystemDefault()): LocalDate = start.toLocalDateTime(timeZone).date

	fun toCandidate(timeZone: TimeZone = TimeZone.currentSystemDefault()) =
		HealthWorkoutCandidate(id, date(timeZone), durationMinutes)
}

/** One minute of heart rate, for the chart. */
data class HeartRatePoint(val time: Instant, val beatsPerMinute: Double)
