package xyz.tleskiv.tt.di.components

import android.content.Context
import android.content.Intent
import android.net.Uri

class AndroidExternalAppLauncher(private val context: Context) : ExternalAppLauncher {
	override fun sendEmail(to: String, subject: String, body: String) {
		val intent = Intent(Intent.ACTION_SENDTO).apply {
			data = Uri.parse("mailto:")
			putExtra(Intent.EXTRA_EMAIL, arrayOf(to))
			putExtra(Intent.EXTRA_SUBJECT, subject)
			putExtra(Intent.EXTRA_TEXT, body)
			addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
		}
		context.startActivity(intent)
	}
}
