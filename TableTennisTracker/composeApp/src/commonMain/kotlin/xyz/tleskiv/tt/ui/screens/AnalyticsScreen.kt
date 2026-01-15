package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import org.koin.compose.koinInject
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.TrainingSessionService
import kotlin.time.Clock
import kotlin.uuid.Uuid

@Composable
fun AnalyticsScreen() {
	val service = koinInject<TrainingSessionService>()
	val lastCreatedId = remember { mutableStateOf<Uuid?>(null) }
	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.primaryContainer)
			.padding(16.dp),
		horizontalAlignment = Alignment.CenterHorizontally,
		verticalArrangement = Arrangement.Center
	) {
		Text(
			text = "Analytics",
			style = MaterialTheme.typography.headlineMedium,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)
		Spacer(modifier = Modifier.height(12.dp))
		Text(
			text = "Service injected: ${service.hashCode()}",
			style = MaterialTheme.typography.bodyMedium,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)
		Spacer(modifier = Modifier.height(12.dp))
		Button(
			onClick = {
				val now = Clock.System.now()
				lastCreatedId.value = service.addSession(
					dateTime = now.toLocalDateTime(TimeZone.currentSystemDefault()),
					durationMinutes = 60,
					rpe = 6,
					sessionType = SessionType.TECHNIQUE,
					notes = "Test session from AnalyticsScreen"
				)
			}
		) {
			Text("Create Test Session")
		}
		Spacer(modifier = Modifier.height(12.dp))
		Text(
			text = "Last created session: ${lastCreatedId.value?.toString() ?: "None"}",
			style = MaterialTheme.typography.bodyMedium,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)
		Spacer(modifier = Modifier.height(16.dp))
		Text(
			text = "Your performance analytics will appear here",
			style = MaterialTheme.typography.bodyLarge,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)
	}
}
