package xyz.tleskiv.tt.di.components

import android.app.Application
import com.posthog.PostHog
import com.posthog.android.PostHogAndroid
import com.posthog.android.PostHogAndroidConfig
import xyz.tleskiv.tt.BuildConfig

class AndroidAnalyticsService(
	application: Application,
	private val nativeInfoProvider: NativeInfoProvider
) : AnalyticsService {

	private val isEnabled: Boolean get() = !nativeInfoProvider.isDebugBuild

	init {
		if (isEnabled) {
			val apiKey = BuildConfig.POSTHOG_API_KEY
			if (apiKey.isNotBlank()) {
				val config = PostHogAndroidConfig(apiKey = apiKey, host = POSTHOG_HOST)
				PostHogAndroid.setup(application, config)
			}
		}
	}

	override fun capture(event: String, properties: Map<String, Any>?) {
		if (!isEnabled) return
		PostHog.capture(event, properties = properties)
	}

	override fun screen(screenName: String, properties: Map<String, Any>?) {
		if (!isEnabled) return
		PostHog.screen(screenName, properties = properties)
	}

	override fun identify(userId: String, properties: Map<String, Any>?) {
		if (!isEnabled) return
		PostHog.identify(userId, userProperties = properties)
	}

	override fun reset() {
		if (!isEnabled) return
		PostHog.reset()
	}

	companion object {
		private const val POSTHOG_HOST = "https://eu.i.posthog.com"
	}
}
