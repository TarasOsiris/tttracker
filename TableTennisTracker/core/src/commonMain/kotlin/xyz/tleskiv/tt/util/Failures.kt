package xyz.tleskiv.tt.util

import kotlin.coroutines.cancellation.CancellationException

/** Runs [block] and returns [fallback] if it fails for any reason but cancellation, which is rethrown. */
inline fun <T> catchingFailures(fallback: T, block: () -> T): T = try {
	block()
} catch (e: CancellationException) {
	throw e
} catch (_: Exception) {
	fallback
}
