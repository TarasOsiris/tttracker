package xyz.tleskiv.tt.di

import org.koin.core.module.dsl.viewModelOf
import org.koin.dsl.bind
import org.koin.dsl.module
import xyz.tleskiv.tt.viewmodel.impl.sessions.CreateSessionScreenViewModelImpl
import xyz.tleskiv.tt.viewmodel.impl.sessions.SessionScreenViewModelImpl
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionScreenViewModel

val viewModelModule = module {
	viewModelOf(::SessionScreenViewModelImpl) bind SessionScreenViewModel::class
	viewModelOf(::CreateSessionScreenViewModelImpl) bind CreateSessionScreenViewModel::class
}

