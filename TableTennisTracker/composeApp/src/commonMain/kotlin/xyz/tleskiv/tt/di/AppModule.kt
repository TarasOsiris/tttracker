package xyz.tleskiv.tt.di

import org.koin.core.qualifier.named
import org.koin.dsl.module
import xyz.tleskiv.tt.repo.TrainingSessionsRepository
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.repo.impl.TrainingSessionsRepositoryImpl
import xyz.tleskiv.tt.repo.impl.UserPreferencesRepositoryImpl

expect val platformModule: org.koin.core.module.Module

val appModule = module {
	includes(platformModule, viewModelModule, serviceModule, dbModule, dispatchersModule)
	single<TrainingSessionsRepository> {
		TrainingSessionsRepositoryImpl(get(), get(named(DispatcherQualifiers.IO)))
	}
	single<UserPreferencesRepository> {
		UserPreferencesRepositoryImpl(get(), get(named(DispatcherQualifiers.IO)))
	}
}
