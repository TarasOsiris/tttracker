package xyz.tleskiv.tt.data.repo

import kotlin.uuid.Uuid

data class UserRecord(
	val id: Uuid,
	val email: String,
	val role: String
)

interface UserRepository {
	fun createUser(email: String, password: String, role: String): UserRecord?
	fun authenticate(email: String, password: String): UserRecord?
	fun getUserById(userId: Uuid): UserRecord?
}
