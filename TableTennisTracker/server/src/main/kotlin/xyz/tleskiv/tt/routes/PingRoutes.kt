package xyz.tleskiv.tt.routes

import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Routing.pingRoute() {
	get("/") {
		call.respondText("OK")
	}
}
