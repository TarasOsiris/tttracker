package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.ui.TestTags
import org.jetbrains.compose.resources.stringResource
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_cancel
import tabletennistracker.composeapp.generated.resources.action_save
import tabletennistracker.composeapp.generated.resources.add_match
import tabletennistracker.composeapp.generated.resources.edit_match
import tabletennistracker.composeapp.generated.resources.label_doubles
import tabletennistracker.composeapp.generated.resources.label_ranked
import xyz.tleskiv.tt.ui.widgets.fields.CompetitionLevelField
import xyz.tleskiv.tt.ui.widgets.fields.OpponentField
import xyz.tleskiv.tt.ui.widgets.fields.ScoreField
import xyz.tleskiv.tt.viewmodel.dialogs.AddMatchDialogViewModel
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun AddMatchDialog(
	editingMatch: PendingMatch?,
	onConfirm: (PendingMatch) -> Unit,
	onDismiss: () -> Unit,
	viewModel: AddMatchDialogViewModel = koinViewModel(key = editingMatch?.id) { parametersOf(editingMatch) }
) {
	val inputData = viewModel.inputData
	val opponents by viewModel.opponents.collectAsState()

	var opponentName by inputData.opponentName
	var opponentId by inputData.opponentId
	var myScore by inputData.myScore
	var opponentScore by inputData.opponentScore
	var isDoubles by inputData.isDoubles
	var isRanked by inputData.isRanked
	var competitionLevel by inputData.competitionLevel

	AlertDialog(
		onDismissRequest = onDismiss,
		title = {
			Text(stringResource(if (viewModel.isEditMode) Res.string.edit_match else Res.string.add_match))
		},
		text = {
			Column(
				modifier = Modifier.fillMaxWidth().verticalScroll(rememberScrollState()).testTag(TestTags.ADD_MATCH_DIALOG_CONTENT),
				verticalArrangement = Arrangement.spacedBy(16.dp)
			) {
				OpponentField(
					opponentName = opponentName,
					selectedOpponentId = opponentId,
					opponents = opponents,
					onOpponentSelected = { name, id ->
						opponentName = name
						opponentId = id
					}
				)

				ScoreField(
					myScore = myScore,
					opponentScore = opponentScore,
					onMyScoreChange = { myScore = it },
					onOpponentScoreChange = { opponentScore = it }
				)

				FlowRow(
					horizontalArrangement = Arrangement.spacedBy(8.dp),
					verticalArrangement = Arrangement.spacedBy(2.dp)
				) {
					FilterChip(
						selected = isDoubles,
						onClick = { isDoubles = !isDoubles },
						label = { Text(stringResource(Res.string.label_doubles)) }
					)
					FilterChip(
						selected = isRanked,
						onClick = { isRanked = !isRanked },
						label = { Text(stringResource(Res.string.label_ranked)) }
					)
				}

				CompetitionLevelField(
					selectedLevel = competitionLevel,
					onLevelSelected = { competitionLevel = it }
				)
			}
		},
		confirmButton = {
			TextButton(
				onClick = { onConfirm(viewModel.buildPendingMatch()) },
				enabled = inputData.isValid,
				modifier = Modifier.testTag(TestTags.ADD_MATCH_DIALOG_SAVE)
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
