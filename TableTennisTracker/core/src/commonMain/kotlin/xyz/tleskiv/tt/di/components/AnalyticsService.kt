package xyz.tleskiv.tt.di.components

interface AnalyticsService {
	fun capture(event: String, properties: Map<String, Any>? = null)
	fun screen(screenName: String, properties: Map<String, Any>? = null)
	fun identify(userId: String, properties: Map<String, Any>? = null)
	fun reset()

	/** Sets person properties without changing who the person is. A PostHog `$set` is a billed event: call it sparingly. */
	fun setPersonProperties(properties: Map<String, Any>) {}
}
