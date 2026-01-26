package xyz.tleskiv.tt.previews.fakes

import xyz.tleskiv.tt.di.components.ClipboardManager

class FakeClipboardManager : ClipboardManager {
	override fun copyToClipboard(text: String) {}
}
