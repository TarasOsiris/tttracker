package xyz.tleskiv.tt.di

import kotlinx.coroutines.runBlocking
import org.koin.core.context.startKoin
import org.koin.core.module.Module
import org.koin.core.qualifier.named
import org.koin.dsl.KoinAppDeclaration
import org.koin.dsl.module
import org.koin.mp.KoinPlatform.getKoin
import xyz.tleskiv.tt.di.components.NativeInfoProvider
import xyz.tleskiv.tt.repo.MatchRepository
import xyz.tleskiv.tt.repo.MetadataRepository
import xyz.tleskiv.tt.repo.OpponentRepository
import xyz.tleskiv.tt.repo.TrainingSessionsRepository
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.repo.impl.MatchRepositoryImpl
import xyz.tleskiv.tt.repo.impl.MetadataRepositoryImpl
import xyz.tleskiv.tt.repo.impl.OpponentRepositoryImpl
import xyz.tleskiv.tt.repo.impl.TrainingSessionsRepositoryImpl
import xyz.tleskiv.tt.repo.impl.UserPreferencesRepositoryImpl
import xyz.tleskiv.tt.service.UserIdService
import xyz.tleskiv.tt.util.SentryInit

val appModule = module {
	includes(viewModelModule, serviceModule, dbModule, dispatchersModule)
	single<TrainingSessionsRepository> {
		TrainingSessionsRepositoryImpl(get(), get(named(DispatcherQualifiers.IO)))
	}
	single<UserPreferencesRepository> {
		UserPreferencesRepositoryImpl(get(), get(named(DispatcherQualifiers.IO)))
	}
	single<MetadataRepository> {
		MetadataRepositoryImpl(get(), get(named(DispatcherQualifiers.IO)))
	}
	single<OpponentRepository> {
		OpponentRepositoryImpl(get(), get(named(DispatcherQualifiers.IO)))
	}
	single<MatchRepository> {
		MatchRepositoryImpl(get(), get(named(DispatcherQualifiers.IO)))
	}
}

fun initApp(platformModule: Module, configure: KoinAppDeclaration = {}) {
	startKoin {
		configure()
		modules(appModule, platformModule)
	}
	val nativeInfoProvider = getKoin().get<NativeInfoProvider>()
	val userIdService = getKoin().get<UserIdService>()
	val userId = runBlocking { userIdService.getUserId() }
	SentryInit.init(nativeInfoProvider.sentryDsn, userId)
}
