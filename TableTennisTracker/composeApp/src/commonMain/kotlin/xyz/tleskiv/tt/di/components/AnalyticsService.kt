package xyz.tleskiv.tt.di.components

interface AnalyticsService {
	fun capture(event: String, properties: Map<String, Any>? = null)
	fun screen(screenName: String, properties: Map<String, Any>? = null)
	fun identify(userId: String, properties: Map<String, Any>? = null)
	fun reset()
}
