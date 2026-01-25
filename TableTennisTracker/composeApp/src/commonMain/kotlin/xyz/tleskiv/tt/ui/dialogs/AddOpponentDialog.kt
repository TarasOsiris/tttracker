package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.FilterChip
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import org.koin.compose.viewmodel.koinViewModel
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_add_opponent
import tabletennistracker.composeapp.generated.resources.action_cancel
import tabletennistracker.composeapp.generated.resources.action_save
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
import xyz.tleskiv.tt.viewmodel.dialogs.AddOpponentDialogViewModel

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun AddOpponentDialog(
	onDismiss: () -> Unit,
	viewModel: AddOpponentDialogViewModel = koinViewModel()
) {
	val inputData = viewModel.inputData

	var name by inputData.name
	var club by inputData.club
	var rating by inputData.rating
	var handedness by inputData.handedness
	var playingStyle by inputData.playingStyle

	AlertDialog(
		onDismissRequest = onDismiss,
		title = { Text(stringResource(Res.string.action_add_opponent)) },
		text = {
			Column(
				modifier = Modifier.fillMaxWidth().verticalScroll(rememberScrollState()),
				verticalArrangement = Arrangement.spacedBy(16.dp)
			) {
				OutlinedTextField(
					value = name,
					onValueChange = { name = it },
					label = { Text(stringResource(Res.string.label_opponent_name)) },
					singleLine = true,
					modifier = Modifier.fillMaxWidth()
				)

				OutlinedTextField(
					value = club,
					onValueChange = { club = it },
					label = { Text(stringResource(Res.string.label_opponent_club)) },
					singleLine = true,
					modifier = Modifier.fillMaxWidth()
				)

				OutlinedTextField(
					value = rating,
					onValueChange = { rating = it },
					label = { Text(stringResource(Res.string.label_opponent_rating)) },
					singleLine = true,
					keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
					modifier = Modifier.fillMaxWidth()
				)

				FlowRow(
					horizontalArrangement = Arrangement.spacedBy(8.dp),
					verticalArrangement = Arrangement.spacedBy(4.dp)
				) {
					FilterChip(
						selected = handedness == Handedness.RIGHT,
						onClick = { handedness = if (handedness == Handedness.RIGHT) null else Handedness.RIGHT },
						label = { Text(stringResource(Res.string.handedness_right)) }
					)
					FilterChip(
						selected = handedness == Handedness.LEFT,
						onClick = { handedness = if (handedness == Handedness.LEFT) null else Handedness.LEFT },
						label = { Text(stringResource(Res.string.handedness_left)) }
					)
				}

				FlowRow(
					horizontalArrangement = Arrangement.spacedBy(8.dp),
					verticalArrangement = Arrangement.spacedBy(4.dp)
				) {
					FilterChip(
						selected = playingStyle == PlayingStyle.ATTACKER,
						onClick = {
							playingStyle = if (playingStyle == PlayingStyle.ATTACKER) null else PlayingStyle.ATTACKER
						},
						label = { Text(stringResource(Res.string.style_attacker)) }
					)
					FilterChip(
						selected = playingStyle == PlayingStyle.DEFENDER,
						onClick = {
							playingStyle = if (playingStyle == PlayingStyle.DEFENDER) null else PlayingStyle.DEFENDER
						},
						label = { Text(stringResource(Res.string.style_defender)) }
					)
					FilterChip(
						selected = playingStyle == PlayingStyle.ALL_ROUND,
						onClick = {
							playingStyle = if (playingStyle == PlayingStyle.ALL_ROUND) null else PlayingStyle.ALL_ROUND
						},
						label = { Text(stringResource(Res.string.style_all_round)) }
					)
					FilterChip(
						selected = playingStyle == PlayingStyle.PIPS,
						onClick = { playingStyle = if (playingStyle == PlayingStyle.PIPS) null else PlayingStyle.PIPS },
						label = { Text(stringResource(Res.string.style_pips)) }
					)
					FilterChip(
						selected = playingStyle == PlayingStyle.CHOPPER,
						onClick = {
							playingStyle = if (playingStyle == PlayingStyle.CHOPPER) null else PlayingStyle.CHOPPER
						},
						label = { Text(stringResource(Res.string.style_chopper)) }
					)
				}
			}
		},
		confirmButton = {
			TextButton(
				onClick = { viewModel.saveOpponent(onSuccess = onDismiss) },
				enabled = inputData.isValid
			) {
				Text(stringResource(Res.string.action_save))
			}
		},
		dismissButton = {
			TextButton(onClick = onDismiss) {
				Text(stringResource(Res.string.action_cancel))
			}
		}
	)
}
