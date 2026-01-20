package xyz.tleskiv.tt.di.components

import platform.Foundation.NSURL
import platform.StoreKit.SKStoreReviewController
import platform.UIKit.UIApplication

class IosExternalAppLauncher : ExternalAppLauncher {
	override fun sendEmail(to: String, subject: String, body: String) {
		val encodedSubject = subject.encodeURLComponent()
		val encodedBody = body.encodeURLComponent()
		val urlString = "mailto:$to?subject=$encodedSubject&body=$encodedBody"
		NSURL.URLWithString(urlString)?.let { url ->
			UIApplication.sharedApplication.openURL(url)
		}
	}

	override fun openAppStore() {
		SKStoreReviewController.requestReview()
	}

	private fun String.encodeURLComponent(): String {
		return this.replace(" ", "%20")
			.replace("\n", "%0A")
			.replace("&", "%26")
			.replace("=", "%3D")
	}
}
