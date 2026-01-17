package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import org.jetbrains.compose.resources.stringResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_edit
import xyz.tleskiv.tt.ui.widgets.BackButton

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditSessionScreen(
	sessionId: String,
	onClose: () -> Unit = {}
) {
	Scaffold(
		topBar = {
			TopAppBar(
				title = { Text(stringResource(Res.string.action_edit)) },
				navigationIcon = { BackButton(onClose) }
			)
		}
	) { padding ->
		Box(modifier = Modifier.fillMaxSize().padding(padding))
	}
}
