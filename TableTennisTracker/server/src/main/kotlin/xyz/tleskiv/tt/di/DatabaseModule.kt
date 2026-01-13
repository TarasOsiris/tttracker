package xyz.tleskiv.tt.di

import org.koin.dsl.module
import xyz.tleskiv.tt.db.DatabaseFactory
import xyz.tleskiv.tt.db.ServerDatabase

val databaseModule = module {
	single<ServerDatabase> {
		DatabaseFactory.create()
	}
}
