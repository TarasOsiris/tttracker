package xyz.tleskiv.tt.util

import io.sentry.kotlin.multiplatform.Sentry
import io.sentry.kotlin.multiplatform.protocol.User

object SentryInit {
	private var initialized = false

	fun init(dsn: String, userId: String) {
		if (initialized) return
		if (dsn.isNotEmpty()) {
			Sentry.init { options ->
				options.dsn = dsn
			}
			Sentry.setUser(User().apply { id = userId })
		}
		initialized = true
	}
}
