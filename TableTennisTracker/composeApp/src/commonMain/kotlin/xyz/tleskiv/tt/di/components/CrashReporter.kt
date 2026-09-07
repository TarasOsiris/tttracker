package xyz.tleskiv.tt.di.components

interface CrashReporter {
	fun start(dsn: String, userId: String)
}
