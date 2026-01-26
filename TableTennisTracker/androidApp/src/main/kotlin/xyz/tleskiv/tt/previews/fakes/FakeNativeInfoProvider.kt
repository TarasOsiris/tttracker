package xyz.tleskiv.tt.previews.fakes

import xyz.tleskiv.tt.di.components.NativeInfoProvider

class FakeNativeInfoProvider(private val isDebug: Boolean = false) : NativeInfoProvider {
	override val buildNumber: String = "123"
	override val versionName: String = "1.0.0"
	override val isDebugBuild: Boolean = isDebug
	override val sentryDsn: String = ""
}
