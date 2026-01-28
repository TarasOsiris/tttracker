package xyz.tleskiv.tt.di

import org.koin.core.module.dsl.singleOf
import org.koin.dsl.bind
import org.koin.dsl.module
import xyz.tleskiv.tt.service.MatchService
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.service.UserIdService
import xyz.tleskiv.tt.service.UserPreferencesService
import xyz.tleskiv.tt.service.impl.MatchServiceImpl
import xyz.tleskiv.tt.service.impl.OpponentServiceImpl
import xyz.tleskiv.tt.service.impl.TrainingSessionServiceImpl
import xyz.tleskiv.tt.service.impl.UserIdServiceImpl
import xyz.tleskiv.tt.service.impl.UserPreferencesServiceImpl

val serviceModule = module {
	singleOf(::TrainingSessionServiceImpl) bind TrainingSessionService::class
	singleOf(::UserPreferencesServiceImpl) bind UserPreferencesService::class
	singleOf(::UserIdServiceImpl) bind UserIdService::class
	singleOf(::OpponentServiceImpl) bind OpponentService::class
	singleOf(::MatchServiceImpl) bind MatchService::class
}