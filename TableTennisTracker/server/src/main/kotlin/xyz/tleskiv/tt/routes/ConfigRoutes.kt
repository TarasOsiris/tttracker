package xyz.tleskiv.tt.routes

import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import xyz.tleskiv.tt.config.ServerConfig

fun Routing.configRoute() {
	val config by inject<ServerConfig>()

	get("/config") {
		val port = application.environment.config.property("ktor.deployment.port").getString()

		val response = buildString {
			appendLine("Server Configuration")
			appendLine("=".repeat(50))
			appendLine("Environment: ${config.environment}")
			appendLine("Port: $port")
			appendLine("Database Path: ${config.databasePath}")
		}
		call.respondText(response)
	}
}
