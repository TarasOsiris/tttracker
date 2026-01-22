package xyz.tleskiv.tt.di.components

import platform.UIKit.UIPasteboard

class IosClipboardManager : ClipboardManager {
	override fun copyToClipboard(text: String) {
		UIPasteboard.generalPasteboard.string = text
	}
}
