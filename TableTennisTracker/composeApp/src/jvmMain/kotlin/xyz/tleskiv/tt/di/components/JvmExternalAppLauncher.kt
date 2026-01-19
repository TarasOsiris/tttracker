package xyz.tleskiv.tt.di.components

import java.awt.Desktop
import java.net.URI
import java.net.URLEncoder

class JvmExternalAppLauncher : ExternalAppLauncher {
	override fun sendEmail(to: String, subject: String, body: String) {
		if (Desktop.isDesktopSupported()) {
			val desktop = Desktop.getDesktop()
			if (desktop.isSupported(Desktop.Action.MAIL)) {
				val encodedSubject = URLEncoder.encode(subject, "UTF-8").replace("+", "%20")
				val encodedBody = URLEncoder.encode(body, "UTF-8").replace("+", "%20")
				val uri = URI("mailto:$to?subject=$encodedSubject&body=$encodedBody")
				desktop.mail(uri)
			}
		}
	}
}
