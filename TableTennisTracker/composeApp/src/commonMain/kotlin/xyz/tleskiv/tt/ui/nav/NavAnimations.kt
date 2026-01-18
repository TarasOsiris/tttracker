package xyz.tleskiv.tt.ui.nav

import androidx.compose.animation.AnimatedContentTransitionScope.SlideDirection
import androidx.compose.animation.EnterTransition
import androidx.compose.animation.ExitTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.navigation3.ui.NavDisplay

private fun animationMetadata(
	forwardDirection: SlideDirection,
	forwardSlideInMillis: Int,
	forwardSlideOutMillis: Int,
	forwardFadeInMillis: Int,
	forwardFadeOutMillis: Int,
	popDirection: SlideDirection,
	popSlideInMillis: Int,
	popSlideOutMillis: Int,
	popFadeInMillis: Int,
	popFadeOutMillis: Int
): Map<String, Any> {
	val forwardSpec = NavDisplay.transitionSpec {
		val enter = slideIntoContainer(
			forwardDirection,
			animationSpec = tween(durationMillis = forwardSlideInMillis)
		) + fadeIn(animationSpec = tween(durationMillis = forwardFadeInMillis))
		val exit = slideOutOfContainer(
			forwardDirection,
			animationSpec = tween(durationMillis = forwardSlideOutMillis)
		) + fadeOut(animationSpec = tween(durationMillis = forwardFadeOutMillis))
		enter togetherWith exit
	}

	val popSpec = NavDisplay.popTransitionSpec {
		val enter = slideIntoContainer(
			popDirection,
			animationSpec = tween(durationMillis = popSlideInMillis)
		) + fadeIn(animationSpec = tween(durationMillis = popFadeInMillis))
		val exit = slideOutOfContainer(
			popDirection,
			animationSpec = tween(durationMillis = popSlideOutMillis)
		) + fadeOut(animationSpec = tween(durationMillis = popFadeOutMillis))
		enter togetherWith exit
	}

	val predictivePopSpec = NavDisplay.predictivePopTransitionSpec { _ ->
		val enter = slideIntoContainer(
			popDirection,
			animationSpec = tween(durationMillis = popSlideInMillis)
		) + fadeIn(animationSpec = tween(durationMillis = popFadeInMillis))
		val exit = slideOutOfContainer(
			popDirection,
			animationSpec = tween(durationMillis = popSlideOutMillis)
		) + fadeOut(animationSpec = tween(durationMillis = popFadeOutMillis))
		enter togetherWith exit
	}

	return forwardSpec + popSpec + predictivePopSpec
}

// Generic metadata for modal-style entries that slide up from the bottom and down when popped.
val modalEntryTransitionMetadata = animationMetadata(
	forwardDirection = SlideDirection.Up,
	forwardSlideInMillis = 320,
	forwardSlideOutMillis = 260,
	forwardFadeInMillis = 160,
	forwardFadeOutMillis = 140,
	popDirection = SlideDirection.Down,
	popSlideInMillis = 260,
	popSlideOutMillis = 220,
	popFadeInMillis = 140,
	popFadeOutMillis = 120
)

// Generic metadata for lateral entries that slide in from the side (used for details/settings screens).
val lateralEntryTransitionMetadata = animationMetadata(
	forwardDirection = SlideDirection.Left,
	forwardSlideInMillis = 300,
	forwardSlideOutMillis = 240,
	forwardFadeInMillis = 140,
	forwardFadeOutMillis = 120,
	popDirection = SlideDirection.Right,
	popSlideInMillis = 240,
	popSlideOutMillis = 220,
	popFadeInMillis = 120,
	popFadeOutMillis = 100
)

val instantTransitionMetadata = run {
	val emptyTransition = EnterTransition.None togetherWith ExitTransition.None
	val forward = NavDisplay.transitionSpec { emptyTransition }
	val pop = NavDisplay.popTransitionSpec { emptyTransition }
	forward + pop
}
