package xyz.tleskiv.tt.ui.bottomsheets

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.stringResource

@Composable
fun HelpBottomSheet(title: StringResource, onDismiss: () -> Unit, content: @Composable () -> Unit) {
	ModalBottomSheet(
		onDismissRequest = onDismiss,
		containerColor = MaterialTheme.colorScheme.surface
	) {
		Column(modifier = Modifier.fillMaxWidth().padding(horizontal = 24.dp).padding(bottom = 24.dp)) {
			Text(
				text = stringResource(title),
				style = MaterialTheme.typography.titleMedium,
				fontWeight = FontWeight.Bold,
				color = MaterialTheme.colorScheme.onSurface
			)
			Spacer(modifier = Modifier.height(16.dp))
			content()
		}
	}
}
