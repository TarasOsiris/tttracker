package xyz.tleskiv.tt.di

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import org.koin.core.qualifier.named
import org.koin.dsl.module
import xyz.tleskiv.tt.db.DatabaseFactory
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.di.components.ClipboardManager
import xyz.tleskiv.tt.di.components.ExternalAppLauncher
import xyz.tleskiv.tt.di.components.IosAnalyticsService
import xyz.tleskiv.tt.di.components.IosClipboardManager
import xyz.tleskiv.tt.di.components.IosExternalAppLauncher
import xyz.tleskiv.tt.di.components.IosLocaleApplier
import xyz.tleskiv.tt.di.components.IosNativeInfoProvider
import xyz.tleskiv.tt.di.components.LocaleApplier
import xyz.tleskiv.tt.di.components.NativeInfoProvider
import xyz.tleskiv.tt.di.components.PostHogWrapper

val platformModule = module {
	single { DatabaseFactory() }
	single { get<DatabaseFactory>().createDriver() }
	single<CoroutineDispatcher>(named(DispatcherQualifiers.IO)) { Dispatchers.Default }
	single<NativeInfoProvider> { IosNativeInfoProvider() }
	single<ExternalAppLauncher> { IosExternalAppLauncher() }
	single<ClipboardManager> { IosClipboardManager() }
	single<LocaleApplier> { IosLocaleApplier() }
	single<AnalyticsService> {
		PostHogWrapper.initialize()
		IosAnalyticsService()
	}
}
