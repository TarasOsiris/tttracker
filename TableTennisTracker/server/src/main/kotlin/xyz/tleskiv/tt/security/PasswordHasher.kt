package xyz.tleskiv.tt.security

import java.security.SecureRandom
import java.util.Base64
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.PBEKeySpec

data class PasswordHash(
	val hash: String,
	val salt: String,
	val iterations: Int
)

object PasswordHasher {
	private const val defaultIterations = 120_000
	private const val saltBytes = 16
	private const val hashBytes = 32

	fun hash(password: String, iterations: Int = defaultIterations): PasswordHash {
		val salt = ByteArray(saltBytes)
		SecureRandom().nextBytes(salt)

		val hash = deriveHash(password, salt, iterations)
		return PasswordHash(
			hash = Base64.getEncoder().encodeToString(hash),
			salt = Base64.getEncoder().encodeToString(salt),
			iterations = iterations
		)
	}

	fun verify(password: String, expectedHash: String, salt: String, iterations: Int): Boolean {
		val saltBytes = Base64.getDecoder().decode(salt)
		val expectedBytes = Base64.getDecoder().decode(expectedHash)
		val computed = deriveHash(password, saltBytes, iterations)
		return computed.contentEquals(expectedBytes)
	}

	private fun deriveHash(password: String, salt: ByteArray, iterations: Int): ByteArray {
		val spec = PBEKeySpec(password.toCharArray(), salt, iterations, hashBytes * 8)
		val factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256")
		return factory.generateSecret(spec).encoded
	}
}
