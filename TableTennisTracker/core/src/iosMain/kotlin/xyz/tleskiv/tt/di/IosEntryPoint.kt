package xyz.tleskiv.tt.di

import org.koin.mp.KoinPlatform
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.di.components.CrashReporter

/**
 * Entry point called from Swift before any UI is shown.
 *
 * [analyticsService] and [crashReporter] are implemented on the Swift side against the PostHog and
 * Sentry iOS SDKs. Keeping them there means the Kotlin framework links no Apple SDKs of its own, so
 * it builds standalone, and analytics events can carry properties that the cinterop bindings could
 * not express.
 *
 * Idempotent, because SwiftUI previews each need the graph but do not run the app's entry point, and
 * a second [initApp] would throw from `startKoin` — fatally, since Kotlin exceptions out of a
 * non-suspend function cannot be caught from Swift.
 */
fun doInitApp(analyticsService: AnalyticsService, crashReporter: CrashReporter) {
	if (KoinPlatform.getKoinOrNull() != null) return
	initApp(iosPlatformModule(analyticsService, crashReporter))
}
