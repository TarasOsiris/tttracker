package xyz.tleskiv.tt.di.components

import platform.Foundation.NSCharacterSet
import platform.Foundation.NSURL
import platform.Foundation.URLQueryAllowedCharacterSet
import platform.Foundation.stringByAddingPercentEncodingWithAllowedCharacters
import platform.UIKit.UIApplication
import platform.darwin.dispatch_async
import platform.darwin.dispatch_get_main_queue

class IosExternalAppLauncher : ExternalAppLauncher {
	override fun sendEmail(to: String, subject: String, body: String) {
		val encodedSubject = subject.encodeURLComponent()
		val encodedBody = body.encodeURLComponent()
		openUrl("mailto:$to?subject=$encodedSubject&body=$encodedBody")
	}

	/** The listing's write-a-review page, which works every time — unlike the rate-limited system prompt. */
	override fun openAppStore() = openUrl(WRITE_REVIEW_URL)

	private fun openUrl(urlString: String) {
		NSURL.URLWithString(urlString)?.let { url ->
			dispatch_async(dispatch_get_main_queue()) {
				UIApplication.sharedApplication.openURL(url, emptyMap<Any?, Any>()) { _ -> }
			}
		}
	}

	@Suppress("CAST_NEVER_SUCCEEDS")
	private fun String.encodeURLComponent(): String {
		val allowedCharacters = NSCharacterSet.URLQueryAllowedCharacterSet.mutableCopy() as platform.Foundation.NSMutableCharacterSet
		allowedCharacters.removeCharactersInString("&=+")
		val nsString = this as platform.Foundation.NSString
		return nsString.stringByAddingPercentEncodingWithAllowedCharacters(allowedCharacters) ?: this
	}

	private companion object {
		const val APP_STORE_ID = "6758044383"
		const val WRITE_REVIEW_URL = "https://apps.apple.com/app/id$APP_STORE_ID?action=write-review"
	}
}
