package xyz.tleskiv.tt.di.components

interface NativeInfoProvider {
	val buildNumber: String
	val versionName: String
	val isDebugBuild: Boolean
}
