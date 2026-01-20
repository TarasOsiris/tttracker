package xyz.tleskiv.tt.util

import io.sentry.kotlin.multiplatform.Sentry

object SentryInit {
	private var initialized = false

	fun init(dsn: String) {
		if (initialized) return
		if (dsn.isNotEmpty()) {
			Sentry.init { options ->
				options.dsn = dsn
			}
		}
		initialized = true
	}
}
