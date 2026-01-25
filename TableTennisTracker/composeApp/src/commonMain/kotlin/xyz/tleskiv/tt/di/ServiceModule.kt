package xyz.tleskiv.tt.di

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
	single<TrainingSessionService> { TrainingSessionServiceImpl(get()) }
	single<UserPreferencesService> { UserPreferencesServiceImpl(get()) }
	single<UserIdService> { UserIdServiceImpl(get()) }
	single<OpponentService> { OpponentServiceImpl(get()) }
	single<MatchService> { MatchServiceImpl(get()) }
}