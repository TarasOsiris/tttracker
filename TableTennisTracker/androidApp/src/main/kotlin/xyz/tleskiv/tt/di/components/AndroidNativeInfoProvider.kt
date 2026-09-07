package xyz.tleskiv.tt.di.components

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageInfo
import androidx.core.content.pm.PackageInfoCompat
import xyz.tleskiv.tt.BuildConfig

class AndroidNativeInfoProvider(context: Context) : NativeInfoProvider {
	private val packageInfo: PackageInfo =
		context.packageManager.getPackageInfo(context.packageName, 0)

	override val versionName: String = packageInfo.versionName ?: "1.0.0"

	// longVersionCode is API 28 and minSdk is 24; the compat shim picks the right accessor.
	override val buildNumber: String = PackageInfoCompat.getLongVersionCode(packageInfo).toString()

	override val isDebugBuild: Boolean =
		(context.applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE) != 0

	override val sentryDsn: String = BuildConfig.SENTRY_DSN
}
