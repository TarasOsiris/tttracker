package xyz.tleskiv.tt.ui

import android.content.Context
import android.content.res.Configuration
import android.os.LocaleList
import androidx.activity.compose.LocalActivity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalResources
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LocalLifecycleOwner
import com.google.android.play.core.ktx.launchReview
import com.google.android.play.core.ktx.requestReview
import com.google.android.play.core.review.ReviewManagerFactory
import com.google.android.play.core.review.testing.FakeReviewManager
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.collectLatest
import org.koin.compose.viewmodel.koinViewModel
import xyz.tleskiv.tt.BuildConfig
import xyz.tleskiv.tt.deeplink.DeepLink
import xyz.tleskiv.tt.model.AppAccent
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode.DARK
import xyz.tleskiv.tt.model.AppThemeMode.LIGHT
import xyz.tleskiv.tt.model.AppThemeMode.SYSTEM
import xyz.tleskiv.tt.ui.nav.navdisplay.TopNavDisplay
import xyz.tleskiv.tt.ui.nav.routes.CoreAppRoute
import xyz.tleskiv.tt.ui.nav.routes.TopLevelRoute
import xyz.tleskiv.tt.ui.pro.LocalPro
import xyz.tleskiv.tt.ui.pro.ProHost
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.util.catchingFailures
import xyz.tleskiv.tt.viewmodel.AppViewModel
import java.util.Locale
import kotlin.time.Duration.Companion.milliseconds

@Composable
fun App(deepLink: DeepLink? = null, onDeepLinkHandled: () -> Unit = {}) {
	val viewModel = koinViewModel<AppViewModel>()
	val themeMode by viewModel.themeMode.collectAsState()
	val appLocale by viewModel.appLocale.collectAsState()
	val accent by viewModel.accent.collectAsState()

	val currentTheme = themeMode ?: return
	val currentLocale = appLocale ?: return

	val baseContext = LocalContext.current
	val localizedContext = remember(baseContext, currentLocale) {
		viewModel.applyLocale(currentLocale)
		baseContext.localizedFor(currentLocale)
	}

	val darkTheme = when (currentTheme) {
		SYSTEM -> isSystemInDarkTheme()
		LIGHT -> false
		DARK -> true
	}

	SystemAppearanceEffect(isDarkTheme = darkTheme)

	key(currentLocale) {
		CompositionLocalProvider(
			LocalContext provides localizedContext,
			LocalResources provides localizedContext.resources,
			LocalConfiguration provides localizedContext.resources.configuration
		) {
			ProHost {
				val effectiveAccent = if (LocalPro.current.hasProFeatures) accent else AppAccent.DEFAULT
				AppTheme(darkTheme = darkTheme, accent = effectiveAccent) {
					Surface(
						modifier = Modifier.fillMaxSize(),
						color = MaterialTheme.colorScheme.surface
					) {
						val topLevelBackStack = remember { mutableStateListOf<TopLevelRoute>(CoreAppRoute) }
						TopNavDisplay(topLevelBackStack, deepLink, onDeepLinkHandled)
						ReviewPromptEffect(viewModel) { topLevelBackStack.lastOrNull() == CoreAppRoute }
					}
				}
			}
		}
	}
}

/// Asks for a Play review a moment after a new session's screen has closed, if the tabs are back on top
/// with no dialog (the paywall, a permission prompt) holding focus and the policy in `:core` agrees. Play
/// decides whether the card shows and says nothing either way, so a review request that did not fail is
/// counted as asked — before the card launches, so leaving the screen while it is up cannot lose the record.
@Composable
private fun ReviewPromptEffect(viewModel: AppViewModel, canPrompt: () -> Boolean) {
	val activity = LocalActivity.current ?: return
	val lifecycle = LocalLifecycleOwner.current.lifecycle
	val currentCanPrompt by rememberUpdatedState(canPrompt)
	val reviewManager = remember(activity) {
		if (BuildConfig.DEBUG) FakeReviewManager(activity) else ReviewManagerFactory.create(activity)
	}
	LaunchedEffect(viewModel, reviewManager) {
		viewModel.sessionCreated.collectLatest {
			delay(REVIEW_PROMPT_DELAY)
			val isInFront = lifecycle.currentState.isAtLeast(Lifecycle.State.RESUMED) && activity.hasWindowFocus()
			if (!isInFront || !currentCanPrompt() || !viewModel.shouldRequestReview()) return@collectLatest
			catchingFailures(Unit) {
				val reviewInfo = reviewManager.requestReview()
				viewModel.markReviewRequested()
				reviewManager.launchReview(activity, reviewInfo)
			}
		}
	}
}

private val REVIEW_PROMPT_DELAY = 1500.milliseconds

/// Android resolves `res/values-*` through the Configuration, not through `Locale.setDefault`, so
/// an in-app language choice only reaches `stringResource` as an overridden Context handed down the
/// tree. Deriving it from the activity context each time keeps SYSTEM honest after a switch away.
private fun Context.localizedFor(locale: AppLocale): Context {
	if (locale == AppLocale.SYSTEM) return this
	val configuration = Configuration(resources.configuration)
	configuration.setLocales(LocaleList(Locale.forLanguageTag(locale.languageTag)))
	return createConfigurationContext(configuration)
}
