package xyz.tleskiv.tt.di

import org.koin.dsl.module
import xyz.tleskiv.tt.repo.TrainingSessionsRepository
import xyz.tleskiv.tt.repo.impl.TrainingSessionsRepositoryImpl

expect val platformModule: org.koin.core.module.Module

val appModule = module {
	includes(platformModule, viewModelModule, serviceModule, dbModule)
	single<TrainingSessionsRepository> { TrainingSessionsRepositoryImpl(get()) }
}
