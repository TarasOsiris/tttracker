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
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.ui.widgets.fields.CompetitionLevelField
import xyz.tleskiv.tt.ui.widgets.fields.NotesField
import xyz.tleskiv.tt.ui.widgets.fields.OpponentField
import xyz.tleskiv.tt.ui.widgets.fields.ScoreField
import xyz.tleskiv.tt.util.ui.collectAsMutableState
import xyz.tleskiv.tt.viewmodel.dialogs.AddMatchDialogViewModel
import xyz.tleskiv.tt.viewmodel.sessions.PendingMatch
import kotlin.uuid.Uuid

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun AddMatchDialog(
	editingMatch: PendingMatch?,
	onConfirm: (PendingMatch) -> Unit,
	onDismiss: () -> Unit,
	viewModel: AddMatchDialogViewModel = koinViewModel(
		key = editingMatch?.id ?: remember { Uuid.random().toString() }
	) { parametersOf(editingMatch) }
) {
	val inputData = viewModel.inputData
	val opponents by viewModel.opponents.collectAsStateWithLifecycle()
	val isValid by inputData.isValid.collectAsStateWithLifecycle()

	var opponentName by inputData.opponentName.collectAsMutableState()
	var opponentId by inputData.opponentId.collectAsMutableState()
	var myScore by inputData.myScore.collectAsMutableState()
	var opponentScore by inputData.opponentScore.collectAsMutableState()
	var isDoubles by inputData.isDoubles.collectAsMutableState()
	var isRanked by inputData.isRanked.collectAsMutableState()
	var competitionLevel by inputData.competitionLevel.collectAsMutableState()
	var notes by inputData.notes.collectAsMutableState()

	AlertDialog(
		onDismissRequest = onDismiss,
		title = {
			Text(stringResource(if (viewModel.isEditMode) R.string.edit_match else R.string.add_match))
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
						label = { Text(stringResource(R.string.label_doubles)) }
					)
					FilterChip(
						selected = isRanked,
						onClick = { isRanked = !isRanked },
						label = { Text(stringResource(R.string.label_ranked)) }
					)
				}

				CompetitionLevelField(
					selectedLevel = competitionLevel,
					onLevelSelected = { competitionLevel = it }
				)

				NotesField(
					labelRes = R.string.label_match_notes_optional,
					notes = notes,
					onNotesChange = { notes = it },
					hintRes = R.string.hint_match_notes
				)
			}
		},
		confirmButton = {
			TextButton(
				onClick = { onConfirm(viewModel.buildPendingMatch()) },
				enabled = isValid,
				modifier = Modifier.testTag(TestTags.ADD_MATCH_DIALOG_SAVE)
			) {
				Text(stringResource(R.string.action_save))
			}
		},
		dismissButton = {
			TextButton(onClick = onDismiss) {
				Text(stringResource(R.string.action_cancel))
			}
		}
	)
}
