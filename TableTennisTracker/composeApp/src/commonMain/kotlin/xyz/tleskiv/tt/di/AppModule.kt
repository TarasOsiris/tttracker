package xyz.tleskiv.tt.di

import org.koin.dsl.module
import xyz.tleskiv.tt.db.AppDatabase

expect val platformModule: org.koin.core.module.Module

val appModule = module {
	includes(platformModule)
	single { AppDatabase(get()) }
}
