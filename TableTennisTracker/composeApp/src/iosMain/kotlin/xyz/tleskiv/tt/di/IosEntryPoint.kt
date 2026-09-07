package xyz.tleskiv.tt.di

import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.di.components.CrashReporter

/**
 * Entry point called from Swift before any UI is shown.
 *
 * [analyticsService] and [crashReporter] are implemented on the Swift side against the PostHog and
 * Sentry iOS SDKs. Keeping them there means the Kotlin framework links no Apple SDKs of its own, so
 * it builds standalone, and analytics events can carry properties that the cinterop bindings could
 * not express.
 */
fun doInitApp(analyticsService: AnalyticsService, crashReporter: CrashReporter) {
	initApp(iosPlatformModule(analyticsService, crashReporter))
}
