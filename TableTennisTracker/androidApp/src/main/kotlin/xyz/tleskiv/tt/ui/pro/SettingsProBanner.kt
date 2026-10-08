package xyz.tleskiv.tt.ui.pro

import androidx.annotation.StringRes
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.Palette
import androidx.compose.material.icons.filled.People
import androidx.compose.material.icons.filled.TableChart
import androidx.compose.material.icons.filled.Widgets
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.TestTags

/// The Pro upsell card at the top of Settings, as on iOS: an accent-tinted surface with checked
/// benefit rows rather than a full-bleed billboard, so it reads as part of the list it sits in. Solid
/// accent is spent only on the crown and the call to action.
@Composable
fun SettingsProBanner(onClick: () -> Unit, modifier: Modifier = Modifier) {
	val shape = RoundedCornerShape(20.dp)
	val accent = MaterialTheme.colorScheme.primary
	Surface(
		onClick = onClick,
		modifier = modifier
			.fillMaxWidth()
			.testTag(TestTags.SETTINGS_PRO_BANNER),
		shape = shape,
		color = accent.copy(alpha = 0.12f),
		border = BorderStroke(1.dp, accent.copy(alpha = 0.22f))
	) {
		Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
			ProBannerHeader()
			Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
				ProBenefit.features.chunked(2).forEach { pair ->
					Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
						pair.forEach { ProBenefitRow(it, Modifier.weight(1f)) }
						if (pair.size == 1) Row(Modifier.weight(1f)) {}
					}
				}
				ProBenefitRow(ProBenefit.support)
			}
		}
	}
}

@Composable
private fun ProBannerHeader() {
	Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
		ProCrownTile()
		Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
			Text(
				text = stringResource(R.string.pro_banner_title),
				style = MaterialTheme.typography.titleMedium,
				fontWeight = FontWeight.SemiBold,
				color = MaterialTheme.colorScheme.onSurface
			)
			Text(
				text = stringResource(R.string.pro_banner_tagline),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
		ProCallToAction(stringResource(R.string.pro_banner_cta))
	}
}

/// A glyph and a short title, two to a line; the detail line is spoken rather than shown.
@Composable
private fun ProBenefitRow(benefit: ProBenefit, modifier: Modifier = Modifier) {
	val title = stringResource(benefit.title)
	val detail = stringResource(benefit.detail)
	Row(
		modifier = modifier.clearAndSetSemantics { contentDescription = "$title, $detail" },
		verticalAlignment = Alignment.CenterVertically,
		horizontalArrangement = Arrangement.spacedBy(6.dp)
	) {
		Icon(benefit.icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(16.dp))
		Text(
			text = title,
			style = MaterialTheme.typography.bodySmall,
			fontWeight = FontWeight.Medium,
			color = MaterialTheme.colorScheme.onSurface
		)
	}
}

/// What Pro includes. Keep it in step with the RevenueCat paywall and iOS's `ProBenefit`, in the same
/// order. "Support an indie developer" stays last.
data class ProBenefit(val icon: ImageVector, @StringRes val title: Int, @StringRes val detail: Int) {
	companion object {
		val features = listOf(
			ProBenefit(Icons.Filled.LocalFireDepartment, R.string.pro_benefit_insights_title, R.string.pro_benefit_insights_detail),
			ProBenefit(Icons.Filled.People, R.string.pro_benefit_head_to_head_title, R.string.pro_benefit_head_to_head_detail),
			ProBenefit(Icons.Filled.BarChart, R.string.pro_benefit_history_title, R.string.pro_benefit_history_detail),
			ProBenefit(Icons.Filled.Widgets, R.string.pro_benefit_widgets_title, R.string.pro_benefit_widgets_detail),
			ProBenefit(Icons.Filled.TableChart, R.string.pro_benefit_export_title, R.string.pro_benefit_export_detail),
			ProBenefit(Icons.Filled.Palette, R.string.pro_benefit_accent_title, R.string.pro_benefit_accent_detail)
		)

		val support = ProBenefit(Icons.Filled.Favorite, R.string.pro_benefit_support_title, R.string.pro_benefit_support_detail)
	}
}
