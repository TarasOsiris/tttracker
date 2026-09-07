package xyz.tleskiv.tt.util.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.remember
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import kotlinx.coroutines.flow.MutableStateFlow

/**
 * Adapts a [MutableStateFlow] to Compose's [MutableState] so screens can keep using `by` delegation
 * while ViewModel state stays a plain flow that a non-Compose UI can observe too.
 *
 * The getter reads the collected snapshot state to register the recomposition dependency, then
 * returns the flow's own value: a write followed by a read in the same frame therefore sees the new
 * value, rather than waiting for the collector to be dispatched.
 */
@Composable
fun <T> MutableStateFlow<T>.collectAsMutableState(): MutableState<T> {
	val collected = collectAsStateWithLifecycle()
	val flow = this
	return remember(flow) {
		object : MutableState<T> {
			override var value: T
				get() {
					collected.value
					return flow.value
				}
				set(newValue) {
					flow.value = newValue
				}

			override fun component1(): T = value
			override fun component2(): (T) -> Unit = { value = it }
		}
	}
}
