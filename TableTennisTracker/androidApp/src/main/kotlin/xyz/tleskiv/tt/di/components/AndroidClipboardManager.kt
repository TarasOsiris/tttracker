package xyz.tleskiv.tt.di.components

import android.content.ClipData
import android.content.Context
import android.content.ClipboardManager as AndroidSystemClipboardManager

class AndroidClipboardManager(private val context: Context) : ClipboardManager {
	override fun copyToClipboard(text: String) {
		val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as AndroidSystemClipboardManager
		val clip = ClipData.newPlainText("User ID", text)
		clipboard.setPrimaryClip(clip)
	}
}
