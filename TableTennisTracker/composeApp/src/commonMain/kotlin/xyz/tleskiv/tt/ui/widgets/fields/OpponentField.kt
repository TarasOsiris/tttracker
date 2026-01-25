package xyz.tleskiv.tt.ui.widgets.fields

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.ExposedDropdownMenuAnchorType
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.ui.TestTags
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.hint_opponent_name
import tabletennistracker.composeapp.generated.resources.label_opponent
import xyz.tleskiv.tt.db.Opponent
import xyz.tleskiv.tt.ui.widgets.FieldLabel
import kotlin.uuid.Uuid

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OpponentField(
	opponentName: String,
	selectedOpponentId: Uuid?,
	opponents: List<Opponent>,
	onOpponentSelected: (name: String, id: Uuid?) -> Unit
) {
	var expanded by remember { mutableStateOf(false) }

	val filteredOpponents = remember(opponentName, opponents) {
		if (opponentName.isBlank()) {
			opponents.take(5)
		} else {
			opponents.filter { it.name.contains(opponentName, ignoreCase = true) }.take(5)
		}
	}

	Column {
		FieldLabel(Res.string.label_opponent)
		Spacer(modifier = Modifier.height(8.dp))
		ExposedDropdownMenuBox(
			expanded = expanded && filteredOpponents.isNotEmpty(),
			onExpandedChange = { expanded = it }
		) {
			OutlinedTextField(
				value = opponentName,
				onValueChange = { newName ->
					onOpponentSelected(newName, null)
					expanded = true
				},
				modifier = Modifier.fillMaxWidth().menuAnchor(ExposedDropdownMenuAnchorType.PrimaryEditable).testTag(TestTags.OPPONENT_FIELD),
				placeholder = { Text(stringResource(Res.string.hint_opponent_name)) },
				singleLine = true,
				trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) }
			)
			ExposedDropdownMenu(
				expanded = expanded && filteredOpponents.isNotEmpty(),
				onDismissRequest = { expanded = false }
			) {
				filteredOpponents.forEach { opponent ->
					DropdownMenuItem(
						text = { Text(opponent.name) },
						onClick = {
							onOpponentSelected(opponent.name, opponent.id)
							expanded = false
						},
						contentPadding = ExposedDropdownMenuDefaults.ItemContentPadding
					)
				}
			}
		}
	}
}
