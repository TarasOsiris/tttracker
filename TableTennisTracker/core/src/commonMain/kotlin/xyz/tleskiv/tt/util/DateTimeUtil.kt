package xyz.tleskiv.tt.util

import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.todayIn
import kotlin.time.Clock
import kotlin.time.Instant

val nowMillis: Long get() = Clock.System.now().toEpochMilliseconds()

val nowInstant: Instant get() = Clock.System.now()

fun today(): LocalDate = Clock.System.todayIn(TimeZone.currentSystemDefault())
