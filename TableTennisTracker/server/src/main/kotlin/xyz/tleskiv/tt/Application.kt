package xyz.tleskiv.tt

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import org.koin.ktor.plugin.Koin
import xyz.tleskiv.tt.db.ServerDatabase
import xyz.tleskiv.tt.di.databaseModule

fun main() {
	embeddedServer(Netty, port = SERVER_PORT, host = "0.0.0.0", module = Application::module)
		.start(wait = true)
}

fun Application.module() {
	install(Koin) {
		modules(databaseModule)
	}

	routing {
		pingRoute()
		databaseTestRoute()
	}
}

private fun Routing.pingRoute() {
	get("/") {
		call.respondText("Ktor: ${Greeting().greet()}")
	}
}

private fun Routing.databaseTestRoute() {
	val database by inject<ServerDatabase>()

	get("/db/test") {
		// Insert test data
		database.serverDatabaseQueries.insertMetadata("test_key", "test_value_${System.currentTimeMillis()}")
		database.serverDatabaseQueries.insertMetadata("server_started", System.currentTimeMillis().toString())

		// Query all metadata
		val allMetadata = database.serverDatabaseQueries.selectAllMetadata().executeAsList()

		// Build response
		val response = buildString {
			appendLine("Database connection successful!")
			appendLine("Total entries: ${allMetadata.size}")
			appendLine("\nAll metadata:")
			allMetadata.forEach { metadata ->
				appendLine("  ${metadata.key} = ${metadata.value_}")
			}
		}

		call.respondText(response)
	}
}
