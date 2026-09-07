package xyz.tleskiv.tt.di.components

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageInfo
import android.os.Build
import xyz.tleskiv.tt.BuildConfig

class AndroidNativeInfoProvider(context: Context) : NativeInfoProvider {
	private val packageInfo: PackageInfo =
		context.packageManager.getPackageInfo(context.packageName, 0)

	override val versionName: String = packageInfo.versionName ?: "1.0.0"

	// longVersionCode is API 28; minSdk is 24, so older devices need the deprecated accessor.
	override val buildNumber: String = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
		packageInfo.longVersionCode
	} else {
		@Suppress("DEPRECATION")
		packageInfo.versionCode.toLong()
	}.toString()

	override val isDebugBuild: Boolean =
		(context.applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE) != 0

	override val sentryDsn: String = BuildConfig.SENTRY_DSN
}
