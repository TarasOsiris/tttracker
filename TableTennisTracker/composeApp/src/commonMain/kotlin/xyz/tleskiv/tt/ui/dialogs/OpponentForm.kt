package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.FilterChip
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.handedness_left
import tabletennistracker.composeapp.generated.resources.handedness_right
import tabletennistracker.composeapp.generated.resources.label_opponent_club
import tabletennistracker.composeapp.generated.resources.label_opponent_name
import tabletennistracker.composeapp.generated.resources.label_opponent_rating
import tabletennistracker.composeapp.generated.resources.style_all_round
import tabletennistracker.composeapp.generated.resources.style_attacker
import tabletennistracker.composeapp.generated.resources.style_chopper
import tabletennistracker.composeapp.generated.resources.style_defender
import tabletennistracker.composeapp.generated.resources.style_pips
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle

private val handednessOptions = listOf(
	Handedness.RIGHT to Res.string.handedness_right,
	Handedness.LEFT to Res.string.handedness_left
)

private val playingStyleOptions = listOf(
	PlayingStyle.ATTACKER to Res.string.style_attacker,
	PlayingStyle.DEFENDER to Res.string.style_defender,
	PlayingStyle.ALL_ROUND to Res.string.style_all_round,
	PlayingStyle.PIPS to Res.string.style_pips,
	PlayingStyle.CHOPPER to Res.string.style_chopper
)

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun OpponentForm(
	name: MutableState<String>,
	club: MutableState<String>,
	rating: MutableState<String>,
	handedness: MutableState<Handedness?>,
	playingStyle: MutableState<PlayingStyle?>
) {
	Column(
		modifier = Modifier.fillMaxWidth().verticalScroll(rememberScrollState()),
		verticalArrangement = Arrangement.spacedBy(16.dp)
	) {
		OutlinedTextField(
			value = name.value,
			onValueChange = { name.value = it },
			label = { Text(stringResource(Res.string.label_opponent_name)) },
			singleLine = true,
			modifier = Modifier.fillMaxWidth()
		)

		OutlinedTextField(
			value = club.value,
			onValueChange = { club.value = it },
			label = { Text(stringResource(Res.string.label_opponent_club)) },
			singleLine = true,
			modifier = Modifier.fillMaxWidth()
		)

		OutlinedTextField(
			value = rating.value,
			onValueChange = { rating.value = it },
			label = { Text(stringResource(Res.string.label_opponent_rating)) },
			singleLine = true,
			keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
			modifier = Modifier.fillMaxWidth()
		)

		FlowRow(
			horizontalArrangement = Arrangement.spacedBy(8.dp),
			verticalArrangement = Arrangement.spacedBy(4.dp)
		) {
			handednessOptions.forEach { (value, labelRes) ->
				ToggleFilterChip(
					selected = handedness.value == value,
					onClick = { handedness.value = if (handedness.value == value) null else value },
					labelRes = labelRes
				)
			}
		}

		FlowRow(
			horizontalArrangement = Arrangement.spacedBy(8.dp),
			verticalArrangement = Arrangement.spacedBy(4.dp)
		) {
			playingStyleOptions.forEach { (value, labelRes) ->
				ToggleFilterChip(
					selected = playingStyle.value == value,
					onClick = { playingStyle.value = if (playingStyle.value == value) null else value },
					labelRes = labelRes
				)
			}
		}
	}
}

@Composable
private fun ToggleFilterChip(selected: Boolean, onClick: () -> Unit, labelRes: StringResource) {
	FilterChip(
		selected = selected,
		onClick = onClick,
		label = { Text(stringResource(labelRes)) }
	)
}
