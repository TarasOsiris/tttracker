package xyz.tleskiv.tt.di

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import org.koin.core.qualifier.named
import org.koin.dsl.module
import xyz.tleskiv.tt.db.DatabaseFactory
import xyz.tleskiv.tt.di.components.AndroidClipboardManager
import xyz.tleskiv.tt.di.components.AndroidExternalAppLauncher
import xyz.tleskiv.tt.di.components.AndroidLocaleApplier
import xyz.tleskiv.tt.di.components.AndroidNativeInfoProvider
import xyz.tleskiv.tt.di.components.ClipboardManager
import xyz.tleskiv.tt.di.components.ExternalAppLauncher
import xyz.tleskiv.tt.di.components.LocaleApplier
import xyz.tleskiv.tt.di.components.NativeInfoProvider

val platformModule = module {
	single { DatabaseFactory(get()) }
	single { get<DatabaseFactory>().createDriver() }
	single<CoroutineDispatcher>(named(DispatcherQualifiers.IO)) { Dispatchers.IO }
	single<NativeInfoProvider> { AndroidNativeInfoProvider(get()) }
	single<ExternalAppLauncher> { AndroidExternalAppLauncher(get()) }
	single<ClipboardManager> { AndroidClipboardManager(get()) }
	single<LocaleApplier> { AndroidLocaleApplier() }
}
