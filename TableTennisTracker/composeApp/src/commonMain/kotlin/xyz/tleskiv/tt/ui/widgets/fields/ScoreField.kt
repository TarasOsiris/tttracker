package xyz.tleskiv.tt.ui.widgets.fields

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.material3.FilledIconButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.ic_add
import tabletennistracker.composeapp.generated.resources.ic_remove
import tabletennistracker.composeapp.generated.resources.label_me
import tabletennistracker.composeapp.generated.resources.label_opponent
import tabletennistracker.composeapp.generated.resources.label_score
import xyz.tleskiv.tt.ui.widgets.FieldLabel

@Composable
fun ScoreField(
	myScore: Int,
	opponentScore: Int,
	onMyScoreChange: (Int) -> Unit,
	onOpponentScoreChange: (Int) -> Unit
) {
	Column {
		FieldLabel(Res.string.label_score)
		Spacer(modifier = Modifier.height(8.dp))
		Row(
			modifier = Modifier.fillMaxWidth(),
			horizontalArrangement = Arrangement.SpaceEvenly,
			verticalAlignment = Alignment.CenterVertically
		) {
			ScoreCounter(
				label = stringResource(Res.string.label_me),
				score = myScore,
				onScoreChange = onMyScoreChange
			)
			Text(
				text = "-",
				style = MaterialTheme.typography.headlineMedium,
				fontWeight = FontWeight.Bold
			)
			ScoreCounter(
				label = stringResource(Res.string.label_opponent),
				score = opponentScore,
				onScoreChange = onOpponentScoreChange
			)
		}
	}
}

@Composable
private fun ScoreCounter(
	label: String,
	score: Int,
	onScoreChange: (Int) -> Unit
) {
	Column(horizontalAlignment = Alignment.CenterHorizontally) {
		Text(
			text = label,
			style = MaterialTheme.typography.labelMedium,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
		Spacer(modifier = Modifier.height(4.dp))
		Row(
			verticalAlignment = Alignment.CenterVertically,
			horizontalArrangement = Arrangement.spacedBy(8.dp)
		) {
			FilledIconButton(
				onClick = { if (score > 0) onScoreChange(score - 1) },
				modifier = Modifier.size(36.dp),
				enabled = score > 0,
				colors = IconButtonDefaults.filledIconButtonColors(
					containerColor = MaterialTheme.colorScheme.surfaceContainerHighest
				)
			) {
				Icon(
					imageVector = vectorResource(Res.drawable.ic_remove),
					contentDescription = null,
					modifier = Modifier.size(20.dp)
				)
			}
			Text(
				text = score.toString(),
				style = MaterialTheme.typography.headlineMedium,
				fontWeight = FontWeight.Bold,
				color = MaterialTheme.colorScheme.onSurface
			)
			FilledIconButton(
				onClick = { onScoreChange(score + 1) },
				modifier = Modifier.size(36.dp),
				colors = IconButtonDefaults.filledIconButtonColors(
					containerColor = MaterialTheme.colorScheme.surfaceContainerHighest
				)
			) {
				Icon(
					imageVector = vectorResource(Res.drawable.ic_add),
					contentDescription = null,
					modifier = Modifier.size(20.dp)
				)
			}
		}
	}
}
