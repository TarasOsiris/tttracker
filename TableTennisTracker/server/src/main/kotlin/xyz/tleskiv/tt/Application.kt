package xyz.tleskiv.tt

import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.server.response.respondText
import io.ktor.server.routing.get
import io.ktor.server.routing.routing
import org.koin.dsl.module
import org.koin.ktor.ext.inject
import org.koin.ktor.plugin.Koin
import xyz.tleskiv.tt.data.User

fun main() {
	embeddedServer(Netty, port = SERVER_PORT, host = "0.0.0.0", module = Application::module)
		.start(wait = true)
}

private val appModule = module {
	single { User(id = "1", email = "heelo@test.tld") }
}

fun Application.module() {
	install(Koin) {
		modules(appModule)
	}

	val user by inject<User>()

	routing {
		get("/") {
			call.respondText(
				"Ktor: ${Greeting().greet()}, User: $user"
			)
		}
	}
}
