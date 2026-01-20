package xyz.tleskiv.tt.di.components

import android.content.Context
import android.content.Intent
import androidx.core.net.toUri

class AndroidExternalAppLauncher(private val context: Context) : ExternalAppLauncher {
	override fun sendEmail(to: String, subject: String, body: String) {
		val intent = Intent(Intent.ACTION_SENDTO).apply {
			data = "mailto:".toUri()
			putExtra(Intent.EXTRA_EMAIL, arrayOf(to))
			putExtra(Intent.EXTRA_SUBJECT, subject)
			putExtra(Intent.EXTRA_TEXT, body)
			addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
		}
		context.startActivity(intent)
	}

	override fun openAppStore() {
		val packageName = context.packageName
		try {
			val intent = Intent(Intent.ACTION_VIEW, "market://details?id=$packageName".toUri()).apply {
				addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
			}
			context.startActivity(intent)
		} catch (e: android.content.ActivityNotFoundException) {
			val intent = Intent(Intent.ACTION_VIEW, "https://play.google.com/store/apps/details?id=$packageName".toUri()).apply {
				addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
			}
			context.startActivity(intent)
		}
	}
}
