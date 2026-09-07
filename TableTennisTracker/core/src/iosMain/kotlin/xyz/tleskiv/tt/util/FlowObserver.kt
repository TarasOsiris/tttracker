package xyz.tleskiv.tt.util

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

/**
 * Handle returned by [observe]. Cancel it when the observer goes away — from a SwiftUI view's
 * `onDisappear`, or a `deinit`.
 */
class Cancellable internal constructor(private val scope: CoroutineScope) {
	fun cancel() = scope.cancel()
}

/**
 * Observes a [Flow] from Swift, which cannot call suspend functions or collect flows directly.
 *
 * [onEach] is invoked on the main dispatcher, so it is safe to drive UI state from it.
 */
fun <T : Any> Flow<T>.observe(onEach: (T) -> Unit): Cancellable {
	val scope = CoroutineScope(Dispatchers.Main.immediate)
	scope.launch { collect { onEach(it) } }
	return Cancellable(scope)
}
