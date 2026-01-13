package xyz.tleskiv.tt.di

import org.koin.dsl.module
import xyz.tleskiv.tt.db.DatabaseFactory

actual val platformModule = module {
	single { DatabaseFactory() }
	single { get<DatabaseFactory>().createDriver() }
}
