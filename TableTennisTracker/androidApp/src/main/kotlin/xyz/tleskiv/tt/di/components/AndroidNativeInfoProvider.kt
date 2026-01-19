package xyz.tleskiv.tt.di.components

import android.content.Context

class AndroidNativeInfoProvider(context: Context) : NativeInfoProvider {
	override val versionName: String = context.packageManager
		.getPackageInfo(context.packageName, 0).versionName ?: "1.0.0"

	override val buildNumber: String = context.packageManager
		.getPackageInfo(context.packageName, 0).longVersionCode.toString()
}