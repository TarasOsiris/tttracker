package xyz.tleskiv.tt.config

enum class Environment {
	LOCAL,
	ACCEPTANCE,
	PRODUCTION
}

data class ServerConfig(
	val environment: Environment,
	val databasePath: String
)
