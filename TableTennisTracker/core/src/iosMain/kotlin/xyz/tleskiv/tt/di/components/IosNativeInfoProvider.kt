package xyz.tleskiv.tt.di.components

import platform.Foundation.NSBundle
import kotlin.experimental.ExperimentalNativeApi

class IosNativeInfoProvider : NativeInfoProvider {
	override val versionName: String =
		NSBundle.mainBundle.objectForInfoDictionaryKey("CFBundleShortVersionString") as? String ?: "1.0.0"

	override val buildNumber: String =
		NSBundle.mainBundle.objectForInfoDictionaryKey("CFBundleVersion") as? String ?: "1"

	@OptIn(ExperimentalNativeApi::class)
	override val isDebugBuild: Boolean = Platform.isDebugBinary

	override val sentryDsn: String =
		NSBundle.mainBundle.objectForInfoDictionaryKey("SENTRY_DSN") as? String ?: ""
}
