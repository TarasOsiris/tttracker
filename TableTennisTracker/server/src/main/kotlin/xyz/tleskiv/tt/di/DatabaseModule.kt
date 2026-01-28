package xyz.tleskiv.tt.di

import io.ktor.server.config.ApplicationConfig
import org.koin.core.module.dsl.singleOf
import org.koin.dsl.bind
import org.koin.dsl.module
import xyz.tleskiv.tt.config.ConfigLoader
import xyz.tleskiv.tt.config.ServerConfig
import xyz.tleskiv.tt.data.db.DatabaseFactory
import xyz.tleskiv.tt.data.repo.UserRepository
import xyz.tleskiv.tt.data.repo.impl.UserRepositoryImpl
import xyz.tleskiv.tt.db.ServerDatabase
import xyz.tleskiv.tt.security.JwtService

fun createAppModule(config: ApplicationConfig) = module {
	single<ServerConfig> {
		ConfigLoader.loadConfig(config)
	}

	single<ServerDatabase> {
		val serverConfig = get<ServerConfig>()
		DatabaseFactory.create(dbPath = serverConfig.databasePath)
	}

	single<JwtService> {
		val serverConfig = get<ServerConfig>()
		JwtService(serverConfig.jwt)
	}

	singleOf(::UserRepositoryImpl) bind UserRepository::class
}
