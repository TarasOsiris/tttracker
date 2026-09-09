package xyz.tleskiv.tt.ui.widgets

import androidx.annotation.StringRes
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R

@Composable
fun FieldLabel(@StringRes text: Int, onHelpClick: (() -> Unit)? = null) {
	Row(verticalAlignment = Alignment.CenterVertically) {
		Text(
			text = stringResource(text),
			style = MaterialTheme.typography.labelLarge,
			color = MaterialTheme.colorScheme.onSurface,
			fontWeight = FontWeight.Medium
		)
		if (onHelpClick != null) {
			Spacer(modifier = Modifier.width(4.dp))
			Icon(
				painter = painterResource(R.drawable.ic_help),
				contentDescription = stringResource(R.string.help_icon_content_description),
				modifier = Modifier.size(18.dp).clickable(onClick = onHelpClick),
				tint = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
	}
}
