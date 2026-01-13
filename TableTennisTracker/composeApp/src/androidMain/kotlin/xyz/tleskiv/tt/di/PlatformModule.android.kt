package xyz.tleskiv.tt.di

import org.koin.dsl.module
import xyz.tleskiv.tt.db.DatabaseFactory

actual val platformModule = module {
	single { DatabaseFactory(get()) }
	single { get<DatabaseFactory>().createDriver() }
}
