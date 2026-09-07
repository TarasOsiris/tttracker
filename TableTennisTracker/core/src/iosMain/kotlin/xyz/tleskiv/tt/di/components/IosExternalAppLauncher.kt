package xyz.tleskiv.tt.di.components

import platform.Foundation.NSCharacterSet
import platform.Foundation.NSURL
import platform.Foundation.URLQueryAllowedCharacterSet
import platform.Foundation.stringByAddingPercentEncodingWithAllowedCharacters
import platform.StoreKit.SKStoreReviewController
import platform.UIKit.UIApplication
import platform.darwin.dispatch_async
import platform.darwin.dispatch_get_main_queue

class IosExternalAppLauncher : ExternalAppLauncher {
	override fun sendEmail(to: String, subject: String, body: String) {
		val encodedSubject = subject.encodeURLComponent()
		val encodedBody = body.encodeURLComponent()
		val urlString = "mailto:$to?subject=$encodedSubject&body=$encodedBody"
		NSURL.URLWithString(urlString)?.let { url ->
			dispatch_async(dispatch_get_main_queue()) {
				UIApplication.sharedApplication.openURL(url, emptyMap<Any?, Any>()) { _ -> }
			}
		}
	}

	override fun openAppStore() {
		dispatch_async(dispatch_get_main_queue()) {
			SKStoreReviewController.requestReview()
		}
	}

	@Suppress("CAST_NEVER_SUCCEEDS")
	private fun String.encodeURLComponent(): String {
		val allowedCharacters = NSCharacterSet.URLQueryAllowedCharacterSet.mutableCopy() as platform.Foundation.NSMutableCharacterSet
		allowedCharacters.removeCharactersInString("&=+")
		val nsString = this as platform.Foundation.NSString
		return nsString.stringByAddingPercentEncodingWithAllowedCharacters(allowedCharacters) ?: this
	}
}
