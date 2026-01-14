package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ProfileScreen() {
	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surfaceVariant)
			.padding(16.dp),
		horizontalAlignment = Alignment.CenterHorizontally,
		verticalArrangement = Arrangement.Center
	) {
		Text(
			text = "Profile",
			style = MaterialTheme.typography.headlineMedium,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
		Spacer(modifier = Modifier.height(16.dp))
		Text(
			text = "Your profile settings will appear here",
			style = MaterialTheme.typography.bodyLarge,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}
