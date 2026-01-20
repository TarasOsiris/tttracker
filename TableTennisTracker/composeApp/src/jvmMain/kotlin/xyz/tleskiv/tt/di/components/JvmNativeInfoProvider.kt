package xyz.tleskiv.tt.di.components

class JvmNativeInfoProvider : NativeInfoProvider {
	override val versionName: String = "1.0.0"
	override val buildNumber: String = "1"
	override val isDebugBuild: Boolean = System.getProperty("debug", "true").toBoolean()
	override val sentryDsn: String = System.getenv("SENTRY_DSN") ?: System.getProperty("sentry.dsn") ?: ""
}
