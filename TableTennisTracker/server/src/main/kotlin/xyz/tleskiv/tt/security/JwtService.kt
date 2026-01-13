package xyz.tleskiv.tt.security

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import xyz.tleskiv.tt.config.JwtConfig
import xyz.tleskiv.tt.data.repo.UserRecord
import java.util.Date

class JwtService(
	private val config: JwtConfig
) {
	private val algorithm = Algorithm.HMAC256(config.secret)

	fun createToken(user: UserRecord): Pair<String, Long> {
		val expiresAt = System.currentTimeMillis() + config.tokenTtlMillis
		val token = JWT.create()
			.withIssuer(config.issuer)
			.withAudience(config.audience)
			.withClaim("userId", user.id.toString())
			.withClaim("email", user.email)
			.withClaim("role", user.role)
			.withExpiresAt(Date(expiresAt))
			.sign(algorithm)

		return token to expiresAt
	}

	fun verifier(): JWTVerifier =
		JWT.require(algorithm)
			.withIssuer(config.issuer)
			.withAudience(config.audience)
			.build()
}
