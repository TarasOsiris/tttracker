package xyz.tleskiv.tt.routes

import io.ktor.server.response.*
import io.ktor.server.routing.*
import xyz.tleskiv.tt.Greeting

fun Routing.pingRoute() {
	get("/") {
		call.respondText("Ktor: ${Greeting().greet()}")
	}
}
