package xyz.tleskiv.tt.di

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import org.koin.core.qualifier.named
import org.koin.dsl.module
import xyz.tleskiv.tt.db.DatabaseFactory
import xyz.tleskiv.tt.di.components.ClipboardManager
import xyz.tleskiv.tt.di.components.ExternalAppLauncher
import xyz.tleskiv.tt.di.components.JvmClipboardManager
import xyz.tleskiv.tt.di.components.JvmExternalAppLauncher
import xyz.tleskiv.tt.di.components.JvmLocaleApplier
import xyz.tleskiv.tt.di.components.JvmNativeInfoProvider
import xyz.tleskiv.tt.di.components.LocaleApplier
import xyz.tleskiv.tt.di.components.NativeInfoProvider

val platformModule = module {
	single { DatabaseFactory() }
	single { get<DatabaseFactory>().createDriver() }
	single<CoroutineDispatcher>(named(DispatcherQualifiers.IO)) { Dispatchers.IO }
	single<NativeInfoProvider> { JvmNativeInfoProvider() }
	single<ExternalAppLauncher> { JvmExternalAppLauncher() }
	single<ClipboardManager> { JvmClipboardManager() }
	single<LocaleApplier> { JvmLocaleApplier() }
}
