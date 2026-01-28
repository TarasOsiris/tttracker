package xyz.tleskiv.tt.di.components

/**
 * iOS Analytics Service using PostHog SDK via Objective-C interop.
 */
class IosAnalyticsService : AnalyticsService {

	init {
		PostHogWrapper.initialize()
	}

	override fun capture(event: String, properties: Map<String, Any>?) {
		PostHogWrapper.capture(event, properties)
	}

	override fun screen(screenName: String, properties: Map<String, Any>?) {
		PostHogWrapper.screen(screenName, properties)
	}

	override fun identify(userId: String, properties: Map<String, Any>?) {
		PostHogWrapper.identify(userId, properties)
	}

	override fun reset() {
		PostHogWrapper.reset()
	}
}
