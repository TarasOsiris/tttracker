package xyz.tleskiv.tt.ui.widgets

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.session_default_title
import tabletennistracker.composeapp.generated.resources.session_duration_format
import xyz.tleskiv.tt.util.labelRes
import xyz.tleskiv.tt.util.ui.getRpeColor
import xyz.tleskiv.tt.util.ui.toColor
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel

@Composable
fun SessionListItem(
	session: SessionUiModel,
	onClick: () -> Unit,
	modifier: Modifier = Modifier
) {
	Surface(
		modifier = modifier.fillMaxWidth().clickable(onClick = onClick),
		shape = RoundedCornerShape(12.dp),
		color = MaterialTheme.colorScheme.surfaceContainerLow,
		tonalElevation = 1.dp
	) {
		Row(
			modifier = Modifier.fillMaxWidth().padding(12.dp),
			verticalAlignment = Alignment.CenterVertically
		) {
			Box(
				modifier = Modifier
					.width(4.dp)
					.height(40.dp)
					.background(color = session.sessionType.toColor(), shape = RoundedCornerShape(2.dp))
			)

			Spacer(modifier = Modifier.width(12.dp))

			Column(modifier = Modifier.weight(1f)) {
				Text(
					text = session.sessionType?.labelRes()?.let { stringResource(it) }
						?: stringResource(Res.string.session_default_title),
					style = MaterialTheme.typography.bodyLarge,
					fontWeight = FontWeight.Medium,
					color = MaterialTheme.colorScheme.onSurface
				)
				Spacer(modifier = Modifier.height(2.dp))
				Text(
					text = stringResource(Res.string.session_duration_format, session.durationMinutes),
					style = MaterialTheme.typography.bodySmall,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
				if (!session.notes.isNullOrBlank()) {
					Spacer(modifier = Modifier.height(2.dp))
					Text(
						text = session.notes,
						style = MaterialTheme.typography.labelSmall,
						color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f),
						maxLines = 1,
						overflow = TextOverflow.Ellipsis
					)
				}
			}

			Box(
				modifier = Modifier
					.size(32.dp)
					.background(color = MaterialTheme.colorScheme.surfaceContainerHigh, shape = CircleShape),
				contentAlignment = Alignment.Center
			) {
				Text(
					text = session.rpe.toString(),
					style = MaterialTheme.typography.labelMedium,
					fontWeight = FontWeight.Bold,
					color = getRpeColor(session.rpe)
				)
			}
		}
	}
}
