package xyz.tleskiv.tt.config

import io.ktor.server.config.*

object ConfigLoader {
	fun loadConfig(config: ApplicationConfig): ServerConfig {
		val environment = config.propertyOrNull("app.environment")?.getString()
			?.let { Environment.valueOf(it) } ?: Environment.LOCAL
		val databasePath = config.property("app.database.path").getString()
		val jwtConfig = JwtConfig(
			issuer = config.property("app.auth.jwt.issuer").getString(),
			audience = config.property("app.auth.jwt.audience").getString(),
			realm = config.property("app.auth.jwt.realm").getString(),
			secret = config.property("app.auth.jwt.secret").getString(),
			tokenTtlMillis = config.property("app.auth.jwt.tokenTtlMillis").getString().toLong()
		)

		return ServerConfig(
			environment = environment,
			databasePath = databasePath,
			jwt = jwtConfig
		)
	}
}
