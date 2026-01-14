package xyz.tleskiv.tt

import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.routing.*
import kotlinx.serialization.json.Json
import org.koin.ktor.ext.inject
import org.koin.ktor.plugin.Koin
import xyz.tleskiv.tt.config.ServerConfig
import xyz.tleskiv.tt.di.createAppModule
import xyz.tleskiv.tt.routes.*
import xyz.tleskiv.tt.security.JwtService

fun main(args: Array<String>) {
	EngineMain.main(args)
}

fun Application.module() {
	install(Koin) {
		modules(createAppModule(environment.config))
	}

	val config by inject<ServerConfig>()
	val jwtService by inject<JwtService>()

	install(ContentNegotiation) {
		json(
			Json {
				ignoreUnknownKeys = true
				isLenient = true
			}
		)
	}

	install(Authentication) {
		jwt("auth-jwt") {
			realm = config.jwt.realm
			verifier(jwtService.verifier())
			validate { credential ->
				val userId = credential.payload.getClaim("userId").asString()
				if (userId.isNullOrBlank()) null else JWTPrincipal(credential.payload)
			}
		}
	}

	log.info("Starting server in ${config.environment} environment")
	log.info("Database path: ${java.io.File(config.databasePath).absolutePath}")

	routing {
		pingRoute()
		configRoute()
		databaseTestRoute()
		usersTestRoute()
		authRoutes()
	}
}
