package xyz.tleskiv.tt.di

import org.koin.core.component.KoinComponent
import org.koin.core.component.get
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.di.components.ClipboardManager
import xyz.tleskiv.tt.di.components.ExternalAppLauncher
import xyz.tleskiv.tt.di.components.LocaleApplier
import xyz.tleskiv.tt.di.components.NativeInfoProvider
import xyz.tleskiv.tt.repo.OpponentRepository
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.MatchService
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.service.UserIdService
import xyz.tleskiv.tt.service.UserPreferencesService

/**
 * Service locator for the native iOS UI.
 *
 * Koin does not survive the Objective-C export: `KoinPlatform` and `startKoin` are absent from the
 * generated header, `Koin.get()` loses its reified type parameter, and `Koin.get(clazz:)` wants a
 * `KotlinKClass` that Swift cannot construct. Every dependency Swift needs is therefore named here,
 * where `get()` still resolves against a real type.
 *
 * The getters are computed rather than lazy: Koin already caches singletons, so resolution is a map
 * lookup, and caching here would pin a stale instance if the graph were ever restarted.
 *
 * Valid only after [doInitApp] has run.
 */
object IosServices : KoinComponent {
	val userPreferencesService: UserPreferencesService get() = get()
	val userPreferencesRepository: UserPreferencesRepository get() = get()
	val opponentService: OpponentService get() = get()
	val opponentRepository: OpponentRepository get() = get()
	val trainingSessionService: TrainingSessionService get() = get()
	val matchService: MatchService get() = get()
	val userIdService: UserIdService get() = get()
	val nativeInfoProvider: NativeInfoProvider get() = get()
	val externalAppLauncher: ExternalAppLauncher get() = get()
	val clipboardManager: ClipboardManager get() = get()
	val localeApplier: LocaleApplier get() = get()
	val analyticsService: AnalyticsService get() = get()
}
