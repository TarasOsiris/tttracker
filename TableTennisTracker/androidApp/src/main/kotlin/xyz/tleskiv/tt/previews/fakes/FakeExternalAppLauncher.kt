package xyz.tleskiv.tt.previews.fakes

import xyz.tleskiv.tt.di.components.ExternalAppLauncher

class FakeExternalAppLauncher : ExternalAppLauncher {
	override fun sendEmail(to: String, subject: String, body: String) {}
	override fun openAppStore() {}
}
