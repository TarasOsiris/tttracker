package xyz.tleskiv.tt.ui.widgets

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_delete
import tabletennistracker.composeapp.generated.resources.action_edit
import tabletennistracker.composeapp.generated.resources.ic_delete
import tabletennistracker.composeapp.generated.resources.ic_edit
import tabletennistracker.composeapp.generated.resources.match_loss
import tabletennistracker.composeapp.generated.resources.match_score_format
import tabletennistracker.composeapp.generated.resources.match_win
import xyz.tleskiv.tt.ui.theme.onWinContainerColor
import xyz.tleskiv.tt.ui.theme.winContainerColor
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch

@Composable
fun PendingMatchCard(
	match: PendingMatch,
	onEdit: () -> Unit,
	onDelete: () -> Unit
) {
	val isWin = match.myGamesWon > match.opponentGamesWon

	ContentCard {
		Column(modifier = Modifier.fillMaxWidth().padding(12.dp)) {
			Row(
				modifier = Modifier.fillMaxWidth(),
				verticalAlignment = Alignment.CenterVertically,
				horizontalArrangement = Arrangement.spacedBy(12.dp)
			) {
				Box(
					modifier = Modifier
						.size(32.dp)
						.clip(CircleShape)
						.background(if (isWin) winContainerColor else MaterialTheme.colorScheme.errorContainer),
					contentAlignment = Alignment.Center
				) {
					Text(
						text = stringResource(if (isWin) Res.string.match_win else Res.string.match_loss),
						style = MaterialTheme.typography.labelMedium,
						fontWeight = FontWeight.Bold,
						color = if (isWin) onWinContainerColor else MaterialTheme.colorScheme.onErrorContainer
					)
				}

				Text(
					text = match.opponentName,
					style = MaterialTheme.typography.bodyLarge,
					modifier = Modifier.weight(1f)
				)

				Text(
					text = stringResource(Res.string.match_score_format, match.myGamesWon, match.opponentGamesWon),
					style = MaterialTheme.typography.bodyLarge,
					fontWeight = FontWeight.SemiBold
				)

				IconButton(onClick = onEdit, modifier = Modifier.size(32.dp)) {
					Icon(
						imageVector = vectorResource(Res.drawable.ic_edit),
						contentDescription = stringResource(Res.string.action_edit),
						modifier = Modifier.size(20.dp),
						tint = MaterialTheme.colorScheme.onSurfaceVariant
					)
				}

				IconButton(onClick = onDelete, modifier = Modifier.size(32.dp)) {
					Icon(
						imageVector = vectorResource(Res.drawable.ic_delete),
						contentDescription = stringResource(Res.string.action_delete),
						modifier = Modifier.size(20.dp),
						tint = MaterialTheme.colorScheme.error
					)
				}
			}

			if (!match.notes.isNullOrBlank()) {
				Text(
					text = match.notes,
					style = MaterialTheme.typography.bodySmall,
					color = MaterialTheme.colorScheme.onSurfaceVariant,
					maxLines = 2,
					overflow = TextOverflow.Ellipsis,
					modifier = Modifier.padding(start = 44.dp, top = 4.dp)
				)
			}
		}
	}
}
