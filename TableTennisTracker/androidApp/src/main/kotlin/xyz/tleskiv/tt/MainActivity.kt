package xyz.tleskiv.tt

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.tooling.preview.Preview
import kotlinx.coroutines.flow.MutableStateFlow
import xyz.tleskiv.tt.deeplink.DeepLink
import xyz.tleskiv.tt.ui.App

class MainActivity : ComponentActivity() {
	/// The `tttracker://` link a widget, the launcher shortcut or another app opened us with, until
	/// the navigation has acted on it.
	private val pendingLink = MutableStateFlow<DeepLink?>(null)

	override fun onCreate(savedInstanceState: Bundle?) {
		enableEdgeToEdge()
		super.onCreate(savedInstanceState)
		// A recreated activity still carries the intent it was first started with; it was handled then.
		if (savedInstanceState == null) receive(intent)

		setContent {
			val deepLink by pendingLink.collectAsState()
			App(deepLink = deepLink, onDeepLinkHandled = { pendingLink.value = null })
		}
	}

	override fun onNewIntent(intent: Intent) {
		super.onNewIntent(intent)
		setIntent(intent)
		receive(intent)
	}

	private fun receive(intent: Intent?) {
		if (intent == null || intent.flags and Intent.FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY != 0) return
		DeepLink.parse(intent.dataString)?.let { pendingLink.value = it }
	}
}

@Preview
@Composable
fun AppAndroidPreview() {
	App()
}
