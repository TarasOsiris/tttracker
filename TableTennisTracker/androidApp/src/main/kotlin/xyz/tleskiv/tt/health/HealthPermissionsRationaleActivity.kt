package xyz.tleskiv.tt.health

import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Intent
import android.os.Bundle
import androidx.core.net.toUri
import xyz.tleskiv.tt.model.SiteLinks
import java.util.Locale

/**
 * What Health Connect opens when the user asks why the app reads their data: the privacy policy,
 * which says. Health Connect refuses to grant permissions to an app that does not declare one.
 */
class HealthPermissionsRationaleActivity : Activity() {
	override fun onCreate(savedInstanceState: Bundle?) {
		super.onCreate(savedInstanceState)
		try {
			startActivity(Intent(Intent.ACTION_VIEW, SiteLinks.privacyPolicy(Locale.getDefault().toLanguageTag()).toUri()))
		} catch (_: ActivityNotFoundException) {
		}
		finish()
	}
}
