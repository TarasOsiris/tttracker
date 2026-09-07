package xyz.tleskiv.tt.util

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn

/**
 * Derives a [StateFlow] from this one.
 *
 * The initial value is [transform] applied to the current value rather than a separately stated
 * constant, so the seed cannot drift from the mapper.
 */
fun <T, R> StateFlow<T>.mapState(scope: CoroutineScope, transform: (T) -> R): StateFlow<R> =
	map(transform).stateIn(scope, SharingStarted.Eagerly, transform(value))
