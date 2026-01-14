package xyz.tleskiv.tt.routes

import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import xyz.tleskiv.tt.db.ServerDatabase

fun Routing.databaseTestRoute() {
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
