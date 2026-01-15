package xyz.tleskiv.tt.data

import kotlinx.serialization.Serializable

@Serializable
data class RegisterRequest(
	val email: String,
	val password: String,
	val role: String? = null
)

@Serializable
data class LoginRequest(
	val email: String,
	val password: String
)

@Serializable
data class AuthResponse(
	val token: String,
	val expiresAtMillis: Long,
	val userId: String,
	val email: String,
	val role: String
)

@Serializable
data class AuthMeResponse(
	val userId: String,
	val email: String,
	val role: String
)
