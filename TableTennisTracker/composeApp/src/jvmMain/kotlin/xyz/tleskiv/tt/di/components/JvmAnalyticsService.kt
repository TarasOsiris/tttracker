package xyz.tleskiv.tt.di.components

/**
 * JVM/Desktop Analytics Service.
 * Currently a no-op implementation since PostHog doesn't have a native JVM SDK.
 * For desktop analytics, consider using PostHog's HTTP API directly if needed.
 */
class JvmAnalyticsService : AnalyticsService {
	override fun capture(event: String, properties: Map<String, Any>?) {
		// No-op for desktop
	}

	override fun screen(screenName: String, properties: Map<String, Any>?) {
		// No-op for desktop
	}

	override fun identify(userId: String, properties: Map<String, Any>?) {
		// No-op for desktop
	}

	override fun reset() {
		// No-op for desktop
	}
}
