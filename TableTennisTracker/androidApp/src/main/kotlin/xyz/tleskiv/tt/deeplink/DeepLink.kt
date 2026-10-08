package xyz.tleskiv.tt.deeplink

import android.content.Context
import android.content.Intent
import androidx.core.net.toUri
import xyz.tleskiv.tt.MainActivity
import java.net.URI
import kotlin.uuid.Uuid

/// Where a widget tap or the launcher shortcut takes the user, as `tttracker://` links — the same
/// URLs iOS's `DeepLink` builds, so both apps answer the same addresses. `TopNavDisplay` routes them.
sealed interface DeepLink {
	val uri: String

	data object Analytics : DeepLink {
		override val uri = "$SCHEME://analytics"
	}

	data object Sessions : DeepLink {
		override val uri = "$SCHEME://sessions"
	}

	data object NewSession : DeepLink {
		override val uri = "$SCHEME://sessions/new"
	}

	data class Session(val id: String) : DeepLink {
		override val uri = "$SCHEME://sessions/$id"
	}

	/// The Pro paywall, from a Pro widget placed without Pro.
	data object Pro : DeepLink {
		override val uri = "$SCHEME://pro"
	}

	companion object {
		const val SCHEME = "tttracker"

		/// The host names the destination; `sessions/<id>` only for an id that can be a session, so a
		/// malformed link lands on the list rather than on a details screen that cannot load.
		fun parse(link: String?): DeepLink? {
			val uri = link?.let { runCatching { URI(it) }.getOrNull() } ?: return null
			if (!uri.scheme.equals(SCHEME, ignoreCase = true)) return null
			val path = uri.path.orEmpty().split('/').filter { it.isNotEmpty() }
			return when (uri.host?.lowercase()) {
				"analytics" -> Analytics
				"pro" -> Pro
				"sessions" -> when (val first = path.firstOrNull()) {
					null -> Sessions
					"new" -> NewSession
					else -> if (Uuid.parseOrNull(first) != null) Session(first) else Sessions
				}
				else -> null
			}
		}
	}
}

/// An explicit intent for [MainActivity], so a tap reaches this app even when another one claims
/// the scheme, and lands in the running task rather than stacking a second copy of the app.
fun DeepLink.intent(context: Context): Intent =
	Intent(Intent.ACTION_VIEW, uri.toUri(), context, MainActivity::class.java)
		.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)
