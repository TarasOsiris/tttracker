package xyz.tleskiv.tt.util

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

/**
 * Handle returned by [observe]. Cancel it when the observer goes away — from a SwiftUI view's
 * `onDisappear`, or a `deinit`.
 */
class Cancellable internal constructor(private val job: Job) {
	fun cancel() = job.cancel()
}

/**
 * Observes a [Flow] from Swift, which cannot call suspend functions or collect flows directly.
 *
 * [onEach] is invoked on the main dispatcher, so it is safe to drive UI state from it.
 */
fun <T : Any> Flow<T>.observe(onEach: (T) -> Unit): Cancellable {
	val scope = CoroutineScope(Dispatchers.Main)
	val job = scope.launch {
		collect { onEach(it) }
	}
	return Cancellable(job)
}

/**
 * Reads the current value of a [StateFlow] without observing it.
 *
 * Swift sees `StateFlow.value` as `Any?`; this keeps the element type.
 */
fun <T : Any> StateFlow<T>.current(): T = value
