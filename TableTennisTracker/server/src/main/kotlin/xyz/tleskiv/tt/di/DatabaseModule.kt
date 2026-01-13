package xyz.tleskiv.tt.di

import io.ktor.server.config.*
import org.koin.dsl.module
import xyz.tleskiv.tt.config.ConfigLoader
import xyz.tleskiv.tt.config.ServerConfig
import xyz.tleskiv.tt.data.db.DatabaseFactory
import xyz.tleskiv.tt.db.ServerDatabase

fun createAppModule(config: ApplicationConfig) = module {
	single<ServerConfig> {
		ConfigLoader.loadConfig(config)
	}

	single<ServerDatabase> {
		val serverConfig = get<ServerConfig>()
		DatabaseFactory.create(dbPath = serverConfig.databasePath)
	}
}
