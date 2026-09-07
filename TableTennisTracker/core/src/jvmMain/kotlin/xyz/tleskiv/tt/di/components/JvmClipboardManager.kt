package xyz.tleskiv.tt.di.components

import java.awt.Toolkit
import java.awt.datatransfer.StringSelection

class JvmClipboardManager : ClipboardManager {
	override fun copyToClipboard(text: String) {
		val clipboard = Toolkit.getDefaultToolkit().systemClipboard
		clipboard.setContents(StringSelection(text), null)
	}
}
