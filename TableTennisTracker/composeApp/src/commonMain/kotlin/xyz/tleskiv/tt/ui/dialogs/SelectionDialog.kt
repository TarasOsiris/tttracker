package xyz.tleskiv.tt.ui.dialogs

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.BasicAlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_cancel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun <T> SelectionDialog(
	title: String,
	options: List<T>,
	currentSelection: T,
	onDismissRequest: () -> Unit,
	onOptionSelected: (T) -> Unit,
	optionLabel: @Composable (T) -> String
) {
	val listState = rememberLazyListState()
	val canScrollUp by remember { derivedStateOf { listState.canScrollBackward } }
	val canScrollDown by remember { derivedStateOf { listState.canScrollForward } }
	val fadeColor = MaterialTheme.colorScheme.surfaceContainerHigh

	BasicAlertDialog(onDismissRequest = onDismissRequest) {
		Surface(
			shape = MaterialTheme.shapes.large,
			color = MaterialTheme.colorScheme.surfaceContainerHigh
		) {
			Column(modifier = Modifier.padding(24.dp)) {
				Text(
					text = title,
					style = MaterialTheme.typography.headlineSmall,
					color = MaterialTheme.colorScheme.onSurface
				)
				Spacer(modifier = Modifier.height(16.dp))

				Box(modifier = Modifier.heightIn(max = 400.dp)) {
					LazyColumn(state = listState) {
						items(options) { option ->
							Row(
								modifier = Modifier
									.fillMaxWidth()
									.clickable { onOptionSelected(option) }
									.padding(vertical = 14.dp),
								verticalAlignment = Alignment.CenterVertically
							) {
								RadioButton(selected = option == currentSelection, onClick = null)
								Spacer(modifier = Modifier.width(12.dp))
								Text(
									text = optionLabel(option),
									style = MaterialTheme.typography.bodyLarge,
									color = MaterialTheme.colorScheme.onSurface
								)
							}
						}
					}

					if (canScrollUp) {
						Box(
							modifier = Modifier
								.fillMaxWidth()
								.height(24.dp)
								.align(Alignment.TopCenter)
								.background(Brush.verticalGradient(listOf(fadeColor, Color.Transparent)))
						)
					}

					if (canScrollDown) {
						Box(
							modifier = Modifier
								.fillMaxWidth()
								.height(24.dp)
								.align(Alignment.BottomCenter)
								.background(Brush.verticalGradient(listOf(Color.Transparent, fadeColor)))
						)
					}
				}

				Spacer(modifier = Modifier.height(24.dp))

				Row(
					modifier = Modifier.fillMaxWidth(),
					horizontalArrangement = Arrangement.End
				) {
					TextButton(onClick = onDismissRequest) {
						Text(stringResource(Res.string.action_cancel))
					}
				}
			}
		}
	}
}
