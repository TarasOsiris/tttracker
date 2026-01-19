package xyz.tleskiv.tt.ui.widgets.fields

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.label_session_type
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.ui.widgets.FieldLabel
import xyz.tleskiv.tt.util.labelRes

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun SessionTypeField(
	selectedType: SessionType?, onTypeSelected: (SessionType) -> Unit
) {
	Column {
		FieldLabel(Res.string.label_session_type)
		Spacer(modifier = Modifier.height(8.dp))
		FlowRow(
			horizontalArrangement = Arrangement.spacedBy(8.dp),
			verticalArrangement = Arrangement.spacedBy(2.dp)
		) {
			SessionType.entries.forEach { type ->
				FilterChip(
					selected = selectedType == type,
					onClick = { onTypeSelected(type) },
					label = { Text(stringResource(type.labelRes())) },
					colors = FilterChipDefaults.filterChipColors(
						selectedContainerColor = MaterialTheme.colorScheme.primaryContainer,
						selectedLabelColor = MaterialTheme.colorScheme.onPrimaryContainer
					)
				)
			}
		}
	}
}
