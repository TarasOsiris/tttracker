package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.flow.MutableStateFlow
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle

private const val NOTES_MAX_LENGTH = 512

@Composable
fun OpponentForm(
	name: MutableStateFlow<String>,
	club: MutableStateFlow<String>,
	rating: MutableStateFlow<String>,
	handedness: MutableStateFlow<Handedness?>,
	playingStyle: MutableStateFlow<PlayingStyle?>,
	notes: MutableStateFlow<String>
) {
	val nameValue by name.collectAsState()
	val clubValue by club.collectAsState()
	val ratingValue by rating.collectAsState()
	val handednessValue by handedness.collectAsState()
	val playingStyleValue by playingStyle.collectAsState()
	val notesValue by notes.collectAsState()

	Column(
		modifier = Modifier.fillMaxWidth().verticalScroll(rememberScrollState()),
		verticalArrangement = Arrangement.spacedBy(16.dp)
	) {
		OutlinedTextField(
			value = nameValue,
			onValueChange = { name.value = it },
			label = { Text(stringResource(R.string.label_opponent_name)) },
			singleLine = true,
			modifier = Modifier.fillMaxWidth()
		)

		OutlinedTextField(
			value = clubValue,
			onValueChange = { club.value = it },
			label = { Text(stringResource(R.string.label_opponent_club)) },
			singleLine = true,
			modifier = Modifier.fillMaxWidth()
		)

		OutlinedTextField(
			value = ratingValue,
			onValueChange = { rating.value = it },
			label = { Text(stringResource(R.string.label_opponent_rating)) },
			singleLine = true,
			keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
			modifier = Modifier.fillMaxWidth()
		)

		Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
			Text(
				text = stringResource(R.string.label_opponent_handedness),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
			HandednessToggle(
				selected = handednessValue,
				onSelect = { handedness.value = it }
			)
		}

		Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
			Text(
				text = stringResource(R.string.label_opponent_style),
				style = MaterialTheme.typography.bodySmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
			PlayingStyleToggle(
				selected = playingStyleValue,
				onSelect = { playingStyle.value = it }
			)
		}

		OutlinedTextField(
			value = notesValue,
			onValueChange = { if (it.length <= NOTES_MAX_LENGTH) notes.value = it },
			label = { Text(stringResource(R.string.label_opponent_notes)) },
			minLines = 2,
			maxLines = 4,
			modifier = Modifier.fillMaxWidth()
		)
	}
}

@Composable
private fun HandednessToggle(selected: Handedness?, onSelect: (Handedness?) -> Unit) {
	Row(
		modifier = Modifier
			.clip(MaterialTheme.shapes.medium)
			.background(MaterialTheme.colorScheme.surfaceVariant)
	) {
		SegmentButton(
			text = stringResource(R.string.handedness_right),
			isSelected = selected == Handedness.RIGHT,
			onClick = { onSelect(if (selected == Handedness.RIGHT) null else Handedness.RIGHT) }
		)
		SegmentButton(
			text = stringResource(R.string.handedness_left),
			isSelected = selected == Handedness.LEFT,
			onClick = { onSelect(if (selected == Handedness.LEFT) null else Handedness.LEFT) }
		)
	}
}

@Composable
private fun PlayingStyleToggle(selected: PlayingStyle?, onSelect: (PlayingStyle?) -> Unit) {
	Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
		Row(
			modifier = Modifier
				.clip(MaterialTheme.shapes.medium)
				.background(MaterialTheme.colorScheme.surfaceVariant)
		) {
			SegmentButton(
				text = stringResource(R.string.style_attacker),
				isSelected = selected == PlayingStyle.ATTACKER,
				onClick = { onSelect(if (selected == PlayingStyle.ATTACKER) null else PlayingStyle.ATTACKER) }
			)
			SegmentButton(
				text = stringResource(R.string.style_defender),
				isSelected = selected == PlayingStyle.DEFENDER,
				onClick = { onSelect(if (selected == PlayingStyle.DEFENDER) null else PlayingStyle.DEFENDER) }
			)
			SegmentButton(
				text = stringResource(R.string.style_all_round),
				isSelected = selected == PlayingStyle.ALL_ROUND,
				onClick = { onSelect(if (selected == PlayingStyle.ALL_ROUND) null else PlayingStyle.ALL_ROUND) }
			)
		}
		Row(
			modifier = Modifier
				.clip(MaterialTheme.shapes.medium)
				.background(MaterialTheme.colorScheme.surfaceVariant)
		) {
			SegmentButton(
				text = stringResource(R.string.style_pips),
				isSelected = selected == PlayingStyle.PIPS,
				onClick = { onSelect(if (selected == PlayingStyle.PIPS) null else PlayingStyle.PIPS) }
			)
			SegmentButton(
				text = stringResource(R.string.style_chopper),
				isSelected = selected == PlayingStyle.CHOPPER,
				onClick = { onSelect(if (selected == PlayingStyle.CHOPPER) null else PlayingStyle.CHOPPER) }
			)
		}
	}
}

@Composable
private fun SegmentButton(text: String, isSelected: Boolean, onClick: () -> Unit) {
	val backgroundColor = if (isSelected) {
		MaterialTheme.colorScheme.primary
	} else {
		MaterialTheme.colorScheme.surfaceVariant
	}
	val textColor = if (isSelected) {
		MaterialTheme.colorScheme.onPrimary
	} else {
		MaterialTheme.colorScheme.onSurfaceVariant
	}

	Box(
		modifier = Modifier
			.clip(MaterialTheme.shapes.medium)
			.background(backgroundColor)
			.clickable(
				interactionSource = remember { MutableInteractionSource() },
				indication = null,
				onClick = onClick
			)
			.padding(horizontal = 16.dp, vertical = 8.dp),
		contentAlignment = Alignment.Center
	) {
		Text(
			text = text,
			style = MaterialTheme.typography.labelMedium,
			fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Normal,
			color = textColor
		)
	}
}
