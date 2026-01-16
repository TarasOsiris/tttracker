package xyz.tleskiv.tt.ui.widgets.fields

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.*
import xyz.tleskiv.tt.ui.widgets.FieldLabel

@Composable
fun DurationField(
	durationText: String, onDurationChange: (String) -> Unit
) {
	Column {
		FieldLabel(Res.string.label_duration)
		Spacer(modifier = Modifier.height(8.dp))
		OutlinedTextField(
			value = durationText,
			onValueChange = onDurationChange,
			modifier = Modifier.fillMaxWidth(),
			placeholder = { Text(stringResource(Res.string.hint_duration)) },
			suffix = { Text(stringResource(Res.string.suffix_minutes)) },
			keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
			singleLine = true,
			supportingText = {
				Text(stringResource(Res.string.rule_duration))
			},
			isError = durationText.isNotEmpty() && (durationText.toIntOrNull()?.let { it !in 5..300 } ?: true))
	}
}
