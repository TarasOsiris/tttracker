package xyz.tleskiv.tt.di.components

import io.sentry.kotlin.multiplatform.Sentry
import io.sentry.kotlin.multiplatform.protocol.User

class SentryCrashReporter : CrashReporter {
	private var initialized = false

	override fun start(dsn: String, userId: String) {
		if (initialized || dsn.isEmpty()) return
		Sentry.init { options -> options.dsn = dsn }
		Sentry.setUser(User().apply { id = userId })
		initialized = true
	}
}
