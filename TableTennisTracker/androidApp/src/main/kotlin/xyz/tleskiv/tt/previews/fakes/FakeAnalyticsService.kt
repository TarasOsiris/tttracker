package xyz.tleskiv.tt.previews.fakes

import xyz.tleskiv.tt.di.components.AnalyticsService

class FakeAnalyticsService : AnalyticsService {
	override fun capture(event: String, properties: Map<String, Any>?) {}
	override fun screen(screenName: String, properties: Map<String, Any>?) {}
	override fun identify(userId: String, properties: Map<String, Any>?) {}
	override fun reset() {}
}
