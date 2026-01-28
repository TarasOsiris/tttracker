@file:OptIn(kotlinx.cinterop.ExperimentalForeignApi::class)

package xyz.tleskiv.tt.di.components

import cocoapods.PostHog.PostHogConfig
import cocoapods.PostHog.PostHogSDK
import platform.Foundation.NSBundle

object PostHogWrapper {
	private val apiKey: String =
		NSBundle.mainBundle.objectForInfoDictionaryKey("POSTHOG_API_KEY") as? String ?: ""

	private var isInitialized = false
	private var isEnabled = false

	fun initialize(isDebugBuild: Boolean) {
		if (isDebugBuild || apiKey.isBlank() || isInitialized) return
		val config = PostHogConfig(apiKey = apiKey, host = POSTHOG_HOST)
		PostHogSDK.shared().setup(config)
		isInitialized = true
		isEnabled = true
	}

	private const val POSTHOG_HOST = "https://eu.i.posthog.com"

	fun capture(event: String, properties: Map<String, Any>?) {
		if (!isEnabled) return
		// Note: Properties not supported in cinterop bindings, tracking event only
		PostHogSDK.shared().capture(event)
	}

	fun screen(screenName: String, properties: Map<String, Any>?) {
		if (!isEnabled) return
		PostHogSDK.shared().screen(screenName)
	}

	fun identify(userId: String, properties: Map<String, Any>?) {
		if (!isEnabled) return
		PostHogSDK.shared().identify(userId)
	}

	fun reset() {
		if (!isEnabled) return
		PostHogSDK.shared().reset()
	}
}
