package xyz.tleskiv.tt.di

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import org.koin.core.module.dsl.singleOf
import org.koin.core.module.dsl.viewModelOf
import org.koin.core.qualifier.named
import org.koin.dsl.bind
import org.koin.dsl.module
import xyz.tleskiv.tt.appwidget.WidgetDataSource
import xyz.tleskiv.tt.appwidget.WidgetProStore
import xyz.tleskiv.tt.appwidget.WidgetUpdater
import xyz.tleskiv.tt.db.DatabaseFactory
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.di.components.AndroidAnalyticsService
import xyz.tleskiv.tt.di.components.AndroidClipboardManager
import xyz.tleskiv.tt.di.components.AndroidExternalAppLauncher
import xyz.tleskiv.tt.di.components.AndroidFileSharer
import xyz.tleskiv.tt.di.components.AndroidLocaleApplier
import xyz.tleskiv.tt.di.components.AndroidNativeInfoProvider
import xyz.tleskiv.tt.di.components.AndroidPurchasesIdProvider
import xyz.tleskiv.tt.di.components.ClipboardManager
import xyz.tleskiv.tt.di.components.CrashReporter
import xyz.tleskiv.tt.di.components.ExternalAppLauncher
import xyz.tleskiv.tt.di.components.FileSharer
import xyz.tleskiv.tt.di.components.LocaleApplier
import xyz.tleskiv.tt.di.components.NativeInfoProvider
import xyz.tleskiv.tt.di.components.PurchasesIdProvider
import xyz.tleskiv.tt.di.components.SentryCrashReporter
import xyz.tleskiv.tt.pro.ProModel
import xyz.tleskiv.tt.pro.ProViewModel

val androidPlatformModule = module {
	single { DatabaseFactory(get()) }
	single { get<DatabaseFactory>().createDriver() }
	single<CoroutineDispatcher>(named(DispatcherQualifiers.IO)) { Dispatchers.IO }
	singleOf(::AndroidNativeInfoProvider) bind NativeInfoProvider::class
	singleOf(::AndroidExternalAppLauncher) bind ExternalAppLauncher::class
	singleOf(::AndroidClipboardManager) bind ClipboardManager::class
	single<FileSharer> { AndroidFileSharer(get(), get(named(DispatcherQualifiers.IO))) }
	singleOf(::AndroidPurchasesIdProvider) bind PurchasesIdProvider::class
	singleOf(::AndroidLocaleApplier) bind LocaleApplier::class
	singleOf(::AndroidAnalyticsService) bind AnalyticsService::class
	singleOf(::SentryCrashReporter) bind CrashReporter::class
	singleOf(::ProModel)
	singleOf(::WidgetProStore)
	singleOf(::WidgetDataSource)
	singleOf(::WidgetUpdater)
	viewModelOf(::ProViewModel)
}
