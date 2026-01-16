package xyz.tleskiv.tt.di

import org.koin.dsl.module
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.service.impl.TrainingSessionServiceImpl
import xyz.tleskiv.tt.service.impl.UserPreferencesServiceImpl

val serviceModule = module {
	single<TrainingSessionService> { TrainingSessionServiceImpl(get()) }
	single<UserPreferencesService> { UserPreferencesServiceImpl(get()) }
}