package xyz.tleskiv.tt.ui.nav

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.Saver
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshots.SnapshotStateList

class TopLevelBackStack<T : Any>(startKey: T) {
	companion object {
		fun <T : Any> saver(allRoutes: List<T>): Saver<TopLevelBackStack<T>, Int> = Saver(
			save = { allRoutes.indexOf(it.topLevelKey) },
			restore = { index -> TopLevelBackStack(allRoutes.getOrElse(index) { allRoutes.first() }) }
		)
	}

	private var topLevelStacks: LinkedHashMap<T, SnapshotStateList<T>> = linkedMapOf(
		startKey to mutableStateListOf(startKey)
	)

	var topLevelKey by mutableStateOf(startKey)
		private set

	val backStack = mutableStateListOf(startKey)

	private fun updateBackStack() = backStack.apply {
		clear()
		addAll(topLevelStacks.flatMap { it.value })
	}

	fun addTopLevel(key: T) {
		if (topLevelStacks[key] == null) {
			topLevelStacks[key] = mutableStateListOf(key)
		} else {
			topLevelStacks.apply {
				remove(key)?.let { put(key, it) }
			}
		}
		topLevelKey = key
		updateBackStack()
	}

	fun add(key: T) {
		topLevelStacks[topLevelKey]?.add(key)
		updateBackStack()
	}

	fun removeLast() {
		val removedKey = topLevelStacks[topLevelKey]?.removeLastOrNull()
		topLevelStacks.remove(removedKey)
		topLevelKey = topLevelStacks.keys.last()
		updateBackStack()
	}
}
