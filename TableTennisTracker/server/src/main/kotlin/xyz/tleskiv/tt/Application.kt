package xyz.tleskiv.tt

import io.ktor.server.application.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import org.koin.ktor.plugin.Koin
import xyz.tleskiv.tt.config.ServerConfig
import xyz.tleskiv.tt.data.model.SessionType
import xyz.tleskiv.tt.db.ServerDatabase
import xyz.tleskiv.tt.di.createAppModule
import kotlin.uuid.Uuid

fun main(args: Array<String>) {
	EngineMain.main(args)
}

fun Application.module() {
	val config by inject<ServerConfig>()

	install(Koin) {
		modules(createAppModule(environment.config))
	}

	log.info("Starting server in ${config.environment} environment")
	log.info("Database path: ${config.databasePath}")

	routing {
		pingRoute()
		configRoute()
		databaseTestRoute()
		usersTestRoute()
	}
}

private fun Routing.pingRoute() {
	get("/") {
		call.respondText("Ktor: ${Greeting().greet()}")
	}
}

private fun Routing.configRoute() {
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

private fun Routing.usersTestRoute() {
	val database by inject<ServerDatabase>()

	get("/users/test") {
		val now = System.currentTimeMillis()

		// Create test users with UUID
		val userId1 = Uuid.random()
		val userId2 = Uuid.random()

		database.serverDatabaseQueries.insertUser(
			id = userId1,
			email = "player_${now}@example.com",
			role = "player",
			updated_at = now
		)

		database.serverDatabaseQueries.insertUser(
			id = userId2,
			email = "coach_${now}@example.com",
			role = "coach",
			updated_at = now
		)

		// Create training sessions for player with UUID
		database.serverDatabaseQueries.insertSession(
			id = Uuid.random(),
			user_id = userId1,
			date = now - 86400000, // Yesterday
			duration_min = 90,
			rpe = 7,
			session_type = SessionType.TECHNICAL,
			notes = "Focused on forehand drives and footwork",
			updated_at = now
		)

		database.serverDatabaseQueries.insertSession(
			id = Uuid.random(),
			user_id = userId1,
			date = now - 172800000, // 2 days ago
			duration_min = 60,
			rpe = 5,
			session_type = SessionType.MATCHPLAY,
			notes = "Practice matches with club members",
			updated_at = now
		)

		// Query all users
		val allUsers = database.serverDatabaseQueries.selectAllUsers().executeAsList()

		// Query sessions for player
		val playerSessions = database.serverDatabaseQueries.getSessionsByUserId(userId1).executeAsList()

		// Get statistics
		val sessionCount = database.serverDatabaseQueries.getSessionCountByUserId(userId1).executeAsOne()
		val totalDuration = database.serverDatabaseQueries.getTotalDurationByUserId(userId1).executeAsOne().SUM
		val avgRpe = database.serverDatabaseQueries.getAverageRpeByUserId(userId1).executeAsOne().AVG

		// Build response
		val response = buildString {
			appendLine("Users and Training Sessions Test")
			appendLine("=".repeat(50))
			appendLine()

			appendLine("All Users (${allUsers.size}):")
			allUsers.forEach { user ->
				appendLine("  ID: ${user.id}")
				appendLine("  Email: ${user.email}")
				appendLine("  Role: ${user.role}")
				appendLine("  Created: ${user.created_at}")
				appendLine()
			}

			appendLine("Training Sessions for ${userId1} (${playerSessions.size}):")
			playerSessions.forEach { session ->
				appendLine("  Session ID: ${session.id}")
				appendLine("  Date: ${session.date}")
				appendLine("  Duration: ${session.duration_min} min")
				appendLine("  RPE: ${session.rpe ?: "N/A"}")
				appendLine("  Type: ${session.session_type}")
				appendLine("  Notes: ${session.notes}")
				appendLine()
			}

			appendLine("Statistics for Player:")
			appendLine("  Total Sessions: $sessionCount")
			appendLine("  Total Duration: ${totalDuration ?: 0} minutes")
			appendLine("  Average RPE: ${avgRpe?.let { String.format("%.2f", it) } ?: "N/A"}")
		}

		call.respondText(response)
	}
}
