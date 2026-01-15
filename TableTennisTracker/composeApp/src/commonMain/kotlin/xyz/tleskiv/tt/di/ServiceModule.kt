package xyz.tleskiv.tt.di

import org.koin.dsl.module
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.service.impl.TrainingSessionServiceImpl

val serviceModule = module {
	single<TrainingSessionService> { TrainingSessionServiceImpl(get()) }
}