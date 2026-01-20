package xyz.tleskiv.tt.di.components

import android.content.Context
import android.content.pm.ApplicationInfo
import xyz.tleskiv.tt.BuildConfig

class AndroidNativeInfoProvider(context: Context) : NativeInfoProvider {
	override val versionName: String = context.packageManager
		.getPackageInfo(context.packageName, 0).versionName ?: "1.0.0"

	override val buildNumber: String = context.packageManager
		.getPackageInfo(context.packageName, 0).longVersionCode.toString()

	override val isDebugBuild: Boolean =
		(context.applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE) != 0

	override val sentryDsn: String = BuildConfig.SENTRY_DSN
}