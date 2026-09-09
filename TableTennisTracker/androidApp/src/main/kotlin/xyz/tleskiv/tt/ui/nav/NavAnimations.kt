package xyz.tleskiv.tt.ui.nav

import androidx.compose.animation.AnimatedContentTransitionScope.SlideDirection
import androidx.compose.animation.EnterTransition
import androidx.compose.animation.ExitTransition
import androidx.compose.animation.core.FiniteAnimationSpec
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.unit.IntOffset
import androidx.navigation3.ui.NavDisplay

private fun animationMetadata(
	forwardDirection: SlideDirection,
	popDirection: SlideDirection,
	slideSpec: FiniteAnimationSpec<IntOffset>,
	fadeSpec: FiniteAnimationSpec<Float>
): Map<String, Any> {
	val forwardSpec = NavDisplay.transitionSpec {
		val enter = slideIntoContainer(forwardDirection, animationSpec = slideSpec) + fadeIn(animationSpec = fadeSpec)
		val exit = slideOutOfContainer(forwardDirection, animationSpec = slideSpec) + fadeOut(animationSpec = fadeSpec)
		enter togetherWith exit
	}

	val popSpec = NavDisplay.popTransitionSpec {
		val enter = slideIntoContainer(popDirection, animationSpec = slideSpec) + fadeIn(animationSpec = fadeSpec)
		val exit = slideOutOfContainer(popDirection, animationSpec = slideSpec) + fadeOut(animationSpec = fadeSpec)
		enter togetherWith exit
	}

	val predictivePopSpec = NavDisplay.predictivePopTransitionSpec { _ ->
		val enter = slideIntoContainer(popDirection, animationSpec = slideSpec) + fadeIn(animationSpec = fadeSpec)
		val exit = slideOutOfContainer(popDirection, animationSpec = slideSpec) + fadeOut(animationSpec = fadeSpec)
		enter togetherWith exit
	}

	return forwardSpec + popSpec + predictivePopSpec
}

// Modal-style entries slide up from the bottom and back down when popped.
@Composable
fun rememberModalEntryTransitionMetadata(): Map<String, Any> {
	val motionScheme = MaterialTheme.motionScheme
	return remember(motionScheme) {
		animationMetadata(
			forwardDirection = SlideDirection.Up,
			popDirection = SlideDirection.Down,
			slideSpec = motionScheme.defaultSpatialSpec(),
			fadeSpec = motionScheme.defaultEffectsSpec()
		)
	}
}

// Lateral entries slide in from the side, used for details and settings screens.
@Composable
fun rememberLateralEntryTransitionMetadata(): Map<String, Any> {
	val motionScheme = MaterialTheme.motionScheme
	return remember(motionScheme) {
		animationMetadata(
			forwardDirection = SlideDirection.Left,
			popDirection = SlideDirection.Right,
			slideSpec = motionScheme.fastSpatialSpec(),
			fadeSpec = motionScheme.defaultEffectsSpec()
		)
	}
}

val instantTransitionMetadata = run {
	val emptyTransition = EnterTransition.None togetherWith ExitTransition.None
	val forward = NavDisplay.transitionSpec { emptyTransition }
	val pop = NavDisplay.popTransitionSpec { emptyTransition }
	forward + pop
}
