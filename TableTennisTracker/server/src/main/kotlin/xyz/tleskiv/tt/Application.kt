package xyz.tleskiv.tt

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import xyz.tleskiv.tt.data.User

fun main() {
	embeddedServer(Netty, port = SERVER_PORT, host = "0.0.0.0", module = Application::module)
		.start(wait = true)
}

val user = User(id = "1", email = "heelo@test.tld")

fun Application.module() {
	routing {
		get("/") {
			call.respondText(
				"Ktor: ${Greeting().greet()}, User: $user"
			)
		}
	}
}