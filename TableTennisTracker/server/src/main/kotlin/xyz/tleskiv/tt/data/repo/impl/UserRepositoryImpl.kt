package xyz.tleskiv.tt.data.repo.impl

import xyz.tleskiv.tt.data.repo.UserRecord
import xyz.tleskiv.tt.data.repo.UserRepository
import xyz.tleskiv.tt.db.ServerDatabase
import xyz.tleskiv.tt.security.PasswordHasher
import kotlin.uuid.Uuid

class UserRepositoryImpl(
	private val database: ServerDatabase
) : UserRepository {

	override fun createUser(email: String, password: String, role: String): UserRecord? {
		if (database.serverDatabaseQueries.getUserByEmail(email).executeAsOneOrNull() != null) {
			return null
		}

		val now = System.currentTimeMillis()
		val userId = Uuid.random()
		val passwordHash = PasswordHasher.hash(password)

		database.serverDatabaseQueries.transaction {
			database.serverDatabaseQueries.insertUser(
				id = userId,
				email = email,
				role = role,
				updated_at = now
			)
			database.serverDatabaseQueries.insertUserCredentials(
				user_id = userId,
				password_hash = passwordHash.hash,
				password_salt = passwordHash.salt,
				password_iterations = passwordHash.iterations.toLong(),
				updated_at = now
			)
		}

		return UserRecord(
			id = userId,
			email = email,
			role = role
		)
	}

	override fun authenticate(email: String, password: String): UserRecord? {
		val record = database.serverDatabaseQueries.getUserWithCredentialsByEmail(email).executeAsOneOrNull()
			?: return null

		val isValid = PasswordHasher.verify(
			password = password,
			expectedHash = record.password_hash,
			salt = record.password_salt,
			iterations = record.password_iterations.toInt()
		)

		if (!isValid) {
			return null
		}

		return UserRecord(
			id = record.id,
			email = record.email,
			role = record.role
		)
	}

	override fun getUserById(userId: Uuid): UserRecord? {
		val record = database.serverDatabaseQueries.getUserById(userId).executeAsOneOrNull() ?: return null

		return UserRecord(
			id = record.id,
			email = record.email,
			role = record.role
		)
	}
}
