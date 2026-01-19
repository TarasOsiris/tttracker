package xyz.tleskiv.tt.di.components

import platform.Foundation.NSBundle

class IosNativeInfoProvider : NativeInfoProvider {
	override val versionName: String =
		NSBundle.mainBundle.objectForInfoDictionaryKey("CFBundleShortVersionString") as? String ?: "1.0.0"

	override val buildNumber: String =
		NSBundle.mainBundle.objectForInfoDictionaryKey("CFBundleVersion") as? String ?: "1"
}
