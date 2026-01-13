package xyz.tleskiv.tt.config

enum class Environment {
	LOCAL,
	ACCEPTANCE,
	PRODUCTION
}

data class ServerConfig(
	val environment: Environment,
	val databasePath: String,
	val jwt: JwtConfig
)

data class JwtConfig(
	val issuer: String,
	val audience: String,
	val realm: String,
	val secret: String,
	val tokenTtlMillis: Long
)
