package xyz.tleskiv.tt.ui

import android.content.Context
import android.content.res.Configuration
import android.os.LocaleList
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalResources
import org.koin.compose.viewmodel.koinViewModel
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode.DARK
import xyz.tleskiv.tt.model.AppThemeMode.LIGHT
import xyz.tleskiv.tt.model.AppThemeMode.SYSTEM
import xyz.tleskiv.tt.ui.nav.navdisplay.TopNavDisplay
import xyz.tleskiv.tt.ui.nav.routes.CoreAppRoute
import xyz.tleskiv.tt.ui.nav.routes.TopLevelRoute
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.viewmodel.AppViewModel
import java.util.Locale

@Composable
fun App() {
	val viewModel = koinViewModel<AppViewModel>()
	val themeMode by viewModel.themeMode.collectAsState()
	val appLocale by viewModel.appLocale.collectAsState()

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
			AppTheme(darkTheme = darkTheme) {
				Surface(
					modifier = Modifier.fillMaxSize(),
					color = MaterialTheme.colorScheme.surface
				) {
					val topLevelBackStack = remember { mutableStateListOf<TopLevelRoute>(CoreAppRoute) }
					TopNavDisplay(topLevelBackStack)
				}
			}
		}
	}
}

/// Android resolves `res/values-*` through the Configuration, not through `Locale.setDefault`, so
/// an in-app language choice only reaches `stringResource` as an overridden Context handed down the
/// tree. Deriving it from the activity context each time keeps SYSTEM honest after a switch away.
private fun Context.localizedFor(locale: AppLocale): Context {
	if (locale == AppLocale.SYSTEM) return this
	val configuration = Configuration(resources.configuration)
	configuration.setLocales(LocaleList(Locale.forLanguageTag(locale.languageTag)))
	return createConfigurationContext(configuration)
}
