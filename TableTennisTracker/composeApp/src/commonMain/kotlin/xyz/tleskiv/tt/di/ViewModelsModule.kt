package xyz.tleskiv.tt.di

import org.koin.core.module.dsl.viewModelOf
import org.koin.dsl.bind
import org.koin.dsl.module
import xyz.tleskiv.tt.viewmodel.impl.sessions.CreateSessionScreenViewModelImpl
import xyz.tleskiv.tt.viewmodel.impl.sessions.EditSessionScreenViewModelImpl
import xyz.tleskiv.tt.viewmodel.impl.sessions.SessionDetailsScreenViewModelImpl
import xyz.tleskiv.tt.viewmodel.impl.sessions.SessionsScreenViewModelImpl
import xyz.tleskiv.tt.viewmodel.impl.settings.SettingsScreenViewModelImpl
import xyz.tleskiv.tt.viewmodel.impl.analytics.AnalyticsScreenViewModelImpl
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.CreateSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.EditSessionScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel
import xyz.tleskiv.tt.viewmodel.settings.SettingsScreenViewModel

val viewModelModule = module {
	viewModelOf(::SessionsScreenViewModelImpl) bind SessionsScreenViewModel::class
	viewModelOf(::AnalyticsScreenViewModelImpl) bind AnalyticsScreenViewModel::class
	viewModelOf(::CreateSessionScreenViewModelImpl) bind CreateSessionScreenViewModel::class
	viewModelOf(::EditSessionScreenViewModelImpl) bind EditSessionScreenViewModel::class
	viewModelOf(::SessionDetailsScreenViewModelImpl) bind SessionDetailsScreenViewModel::class
	viewModelOf(::SettingsScreenViewModelImpl) bind SettingsScreenViewModel::class
}

