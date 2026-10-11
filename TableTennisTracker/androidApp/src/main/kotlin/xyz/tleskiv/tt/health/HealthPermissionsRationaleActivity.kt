package xyz.tleskiv.tt.health

import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Intent
import android.os.Bundle
import androidx.core.net.toUri

/**
 * What Health Connect opens when the user asks why the app reads their data: the privacy policy,
 * which says. Health Connect refuses to grant permissions to an app that does not declare one.
 */
class HealthPermissionsRationaleActivity : Activity() {
	override fun onCreate(savedInstanceState: Bundle?) {
		super.onCreate(savedInstanceState)
		try {
			startActivity(Intent(Intent.ACTION_VIEW, PRIVACY_POLICY_URL.toUri()))
		} catch (_: ActivityNotFoundException) {
		}
		finish()
	}

	private companion object {
		const val PRIVACY_POLICY_URL = "https://ttapp.smashyapps.com/privacy"
	}
}
