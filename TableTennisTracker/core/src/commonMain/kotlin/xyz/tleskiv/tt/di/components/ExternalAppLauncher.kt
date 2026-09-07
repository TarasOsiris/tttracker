package xyz.tleskiv.tt.di.components

interface ExternalAppLauncher {
	fun sendEmail(to: String, subject: String, body: String)
	fun openAppStore()
}
