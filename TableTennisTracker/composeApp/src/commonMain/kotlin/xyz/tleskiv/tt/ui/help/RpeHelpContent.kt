package xyz.tleskiv.tt.ui.help

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.help_rpe_description
import tabletennistracker.composeapp.generated.resources.help_rpe_level_1_2
import tabletennistracker.composeapp.generated.resources.help_rpe_level_3_4
import tabletennistracker.composeapp.generated.resources.help_rpe_level_5_6
import tabletennistracker.composeapp.generated.resources.help_rpe_level_7_8
import tabletennistracker.composeapp.generated.resources.help_rpe_level_9_10
import tabletennistracker.composeapp.generated.resources.help_rpe_scale_intro
import tabletennistracker.composeapp.generated.resources.help_rpe_tip
import xyz.tleskiv.tt.util.ui.getRpeColor

@Composable
fun RpeHelpContent() {
	Column {
		Text(
			text = stringResource(Res.string.help_rpe_description),
			style = MaterialTheme.typography.bodyMedium,
			color = MaterialTheme.colorScheme.onSurface
		)
		Spacer(modifier = Modifier.height(16.dp))
		Text(
			text = stringResource(Res.string.help_rpe_scale_intro),
			style = MaterialTheme.typography.bodyMedium,
			color = MaterialTheme.colorScheme.onSurface
		)
		Spacer(modifier = Modifier.height(12.dp))
		RpeScaleItem(rpe = 2, text = stringResource(Res.string.help_rpe_level_1_2))
		RpeScaleItem(rpe = 4, text = stringResource(Res.string.help_rpe_level_3_4))
		RpeScaleItem(rpe = 6, text = stringResource(Res.string.help_rpe_level_5_6))
		RpeScaleItem(rpe = 8, text = stringResource(Res.string.help_rpe_level_7_8))
		RpeScaleItem(rpe = 10, text = stringResource(Res.string.help_rpe_level_9_10))
		Spacer(modifier = Modifier.height(16.dp))
		Text(
			text = stringResource(Res.string.help_rpe_tip),
			style = MaterialTheme.typography.bodyMedium,
			fontStyle = FontStyle.Italic,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}

@Composable
private fun RpeScaleItem(rpe: Int, text: String) {
	Row(
		verticalAlignment = Alignment.CenterVertically,
		modifier = Modifier.padding(vertical = 4.dp)
	) {
		Box(modifier = Modifier.size(12.dp).clip(CircleShape).background(getRpeColor(rpe)))
		Spacer(modifier = Modifier.width(8.dp))
		Text(
			text = text,
			style = MaterialTheme.typography.bodySmall,
			color = MaterialTheme.colorScheme.onSurface
		)
	}
}
