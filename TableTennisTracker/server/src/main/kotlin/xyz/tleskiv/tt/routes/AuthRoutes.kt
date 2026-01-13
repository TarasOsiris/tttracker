package xyz.tleskiv.tt.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import xyz.tleskiv.tt.data.AuthMeResponse
import xyz.tleskiv.tt.data.AuthResponse
import xyz.tleskiv.tt.data.LoginRequest
import xyz.tleskiv.tt.data.RegisterRequest
import xyz.tleskiv.tt.data.repo.UserRepository
import xyz.tleskiv.tt.security.JwtService
import kotlin.uuid.Uuid

private val allowedRoles = setOf("player", "coach")

fun Routing.authRoutes() {
	val userRepository by inject<UserRepository>()
	val jwtService by inject<JwtService>()

	route("/auth") {
		post("/register") {
			val request = call.receive<RegisterRequest>()
			val email = request.email.trim()
			val role = request.role?.trim()?.lowercase() ?: "player"

			if (email.isBlank() || request.password.isBlank()) {
				call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Email and password are required."))
				return@post
			}
			if (role !in allowedRoles) {
				call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Role must be player or coach."))
				return@post
			}

			val user = userRepository.createUser(email, request.password, role)
			if (user == null) {
				call.respond(HttpStatusCode.Conflict, mapOf("error" to "Email already registered."))
				return@post
			}

			val (token, expiresAt) = jwtService.createToken(user)
			call.respond(
				AuthResponse(
					token = token,
					expiresAtMillis = expiresAt,
					userId = user.id.toString(),
					email = user.email,
					role = user.role
				)
			)
		}

		post("/login") {
			val request = call.receive<LoginRequest>()
			val email = request.email.trim()

			if (email.isBlank() || request.password.isBlank()) {
				call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Email and password are required."))
				return@post
			}

			val user = userRepository.authenticate(email, request.password)
			if (user == null) {
				call.respond(HttpStatusCode.Unauthorized, mapOf("error" to "Invalid credentials."))
				return@post
			}

			val (token, expiresAt) = jwtService.createToken(user)
			call.respond(
				AuthResponse(
					token = token,
					expiresAtMillis = expiresAt,
					userId = user.id.toString(),
					email = user.email,
					role = user.role
				)
			)
		}

		authenticate("auth-jwt") {
			get("/me") {
				val principal = call.principal<JWTPrincipal>()
					?: return@get call.respond(HttpStatusCode.Unauthorized)
				val userIdValue = principal.payload.getClaim("userId").asString()
					?: return@get call.respond(HttpStatusCode.Unauthorized)

				val userId = runCatching { Uuid.parse(userIdValue) }.getOrNull()
					?: return@get call.respond(HttpStatusCode.BadRequest)
				val user = userRepository.getUserById(userId)
					?: return@get call.respond(HttpStatusCode.NotFound)

				call.respond(
					AuthMeResponse(
						userId = user.id.toString(),
						email = user.email,
						role = user.role
					)
				)
			}
		}
	}
}
