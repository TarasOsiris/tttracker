package xyz.tleskiv.tt.config

import io.ktor.server.config.*

object ConfigLoader {
	fun loadConfig(config: ApplicationConfig): ServerConfig {
		val environment = config.propertyOrNull("app.environment")?.getString()
			?.let { Environment.valueOf(it) } ?: Environment.LOCAL
		val databasePath = config.property("app.database.path").getString()

		return ServerConfig(
			environment = environment,
			databasePath = databasePath
		)
	}
}
