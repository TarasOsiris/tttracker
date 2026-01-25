package xyz.tleskiv.tt.util

import kotlin.time.Clock
import kotlin.time.Instant

val nowMillis: Long get() = Clock.System.now().toEpochMilliseconds()

val nowInstant: Instant get() = Clock.System.now()