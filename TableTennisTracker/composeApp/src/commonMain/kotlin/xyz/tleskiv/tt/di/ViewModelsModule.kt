package xyz.tleskiv.tt.di

import org.koin.core.module.dsl.viewModelOf
import org.koin.dsl.bind
import org.koin.dsl.module
import xyz.tleskiv.tt.viewmodel.impl.sessions.CreateSessionScreenViewModelImpl
import xyz.tleskiv.tt.viewmodel.impl.sessions.SessionDetailsScreenViewModelImpl
import xyz.tleskiv.tt.viewmodel.impl.sessions.SessionsScreenViewModelImpl
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel

val viewModelModule = module {
	viewModelOf(::SessionsScreenViewModelImpl) bind SessionsScreenViewModel::class
	viewModelOf(::CreateSessionScreenViewModelImpl) bind CreateSessionScreenViewModel::class
	viewModelOf(::SessionDetailsScreenViewModelImpl) bind SessionDetailsScreenViewModel::class
}

