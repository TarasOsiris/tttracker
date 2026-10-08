package xyz.tleskiv.tt.ui.pro

import android.os.Build
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.pro.PaywallSource
import xyz.tleskiv.tt.ui.TestTags

/// The PRO pill at the leading edge of the tabs' top bar, opening the paywall. Shown only while Pro
/// is for sale and not yet owned, so the bar never keeps an empty slot for it.
@Composable
fun ProToolbarButton(modifier: Modifier = Modifier) {
	val pro = LocalPro.current
	if (!pro.showsUpsell) return
	val hint = stringResource(R.string.pro_upgrade_hint)
	Surface(
		onClick = { pro.openPaywall(PaywallSource.TOOLBAR) },
		modifier = modifier
			.padding(start = 12.dp)
			.testTag(TestTags.PRO_TOOLBAR)
			.semantics { contentDescription = hint },
		shape = CircleShape,
		color = MaterialTheme.colorScheme.primary,
		contentColor = MaterialTheme.colorScheme.onPrimary
	) {
		Row(
			modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
			verticalAlignment = Alignment.CenterVertically,
			horizontalArrangement = Arrangement.spacedBy(4.dp)
		) {
			Icon(painterResource(R.drawable.ic_crown), contentDescription = null, modifier = Modifier.size(14.dp))
			Text(
				text = stringResource(R.string.pro_toolbar_button),
				style = MaterialTheme.typography.labelSmall,
				fontWeight = FontWeight.Bold
			)
		}
	}
}

/// Pro content, shown as is once Pro is owned. Until then it stays in place but blurred, behind one
/// button to the paywall: a free user sees the shape of what they would get, drawn from their own
/// data, rather than an empty promise.
@Composable
fun ProLocked(
	source: PaywallSource,
	modifier: Modifier = Modifier,
	caption: String? = null,
	content: @Composable () -> Unit
) {
	val pro = LocalPro.current
	if (pro.hasProFeatures) {
		Box(modifier) { content() }
		return
	}
	Box(modifier.clipToBounds(), contentAlignment = Alignment.Center) {
		Box(
			Modifier
				.lockedContent()
				.clearAndSetSemantics { }
		) { content() }
		ProUnlockCard(source = source, caption = caption, onUnlock = { pro.openPaywall(source) })
	}
}

/// `blur` is a no-op before Android 12, so older systems fade the content instead of leaving it
/// readable behind the card.
private fun Modifier.lockedContent(): Modifier =
	if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) blur(7.dp) else alpha(0.12f)

@Composable
private fun ProUnlockCard(source: PaywallSource, caption: String?, onUnlock: () -> Unit) {
	Surface(
		modifier = Modifier.padding(horizontal = 16.dp),
		shape = RoundedCornerShape(18.dp),
		color = MaterialTheme.colorScheme.surfaceContainerHigh.copy(alpha = 0.92f),
		tonalElevation = 2.dp
	) {
		Column(
			modifier = Modifier.padding(vertical = 14.dp, horizontal = 18.dp),
			horizontalAlignment = Alignment.CenterHorizontally,
			verticalArrangement = Arrangement.spacedBy(10.dp)
		) {
			val hint = stringResource(R.string.pro_upgrade_hint)
			Button(
				onClick = onUnlock,
				modifier = Modifier
					.testTag(TestTags.proUnlock(source))
					.semantics { contentDescription = hint }
			) {
				Icon(painterResource(R.drawable.ic_crown), contentDescription = null, modifier = Modifier.size(18.dp))
				Spacer(Modifier.size(6.dp))
				Text(stringResource(R.string.pro_unlock), fontWeight = FontWeight.SemiBold)
			}
			if (caption != null) {
				Text(
					text = caption,
					style = MaterialTheme.typography.bodySmall,
					fontWeight = FontWeight.Medium,
					color = MaterialTheme.colorScheme.onSurfaceVariant,
					textAlign = TextAlign.Center,
					modifier = Modifier.widthIn(max = 260.dp)
				)
			}
		}
	}
}

/// A small crown marking a row that leads to a Pro feature, for rows that cannot be blurred.
@Composable
fun ProBadge(modifier: Modifier = Modifier) {
	Icon(
		painter = painterResource(R.drawable.ic_crown),
		contentDescription = stringResource(R.string.pro_toolbar_button),
		tint = MaterialTheme.colorScheme.primary,
		modifier = modifier.size(18.dp)
	)
}

/// A crown on an accent tile, the banner's lead glyph.
@Composable
internal fun ProCrownTile() {
	Box(
		modifier = Modifier
			.size(34.dp)
			.background(MaterialTheme.colorScheme.primary, RoundedCornerShape(10.dp)),
		contentAlignment = Alignment.Center
	) {
		Icon(
			painter = painterResource(R.drawable.ic_crown),
			contentDescription = null,
			tint = MaterialTheme.colorScheme.onPrimary,
			modifier = Modifier.size(20.dp)
		)
	}
}

@Composable
internal fun ProCallToAction(text: String) {
	Text(
		text = text,
		style = MaterialTheme.typography.labelLarge,
		fontWeight = FontWeight.SemiBold,
		color = MaterialTheme.colorScheme.onPrimary,
		modifier = Modifier
			.background(MaterialTheme.colorScheme.primary, MaterialTheme.shapes.extraLarge)
			.padding(horizontal = 14.dp, vertical = 7.dp)
	)
}
