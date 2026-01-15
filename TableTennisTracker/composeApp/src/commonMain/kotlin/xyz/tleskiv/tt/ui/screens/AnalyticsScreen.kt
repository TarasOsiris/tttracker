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
import org.jetbrains.compose.resources.stringResource
import org.koin.compose.koinInject
import tabletennistracker.composeapp.generated.resources.*
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.TrainingSessionService
import kotlin.time.Clock
import kotlin.uuid.Uuid

@Composable
fun AnalyticsScreen() {
	val service = koinInject<TrainingSessionService>()
	val lastCreatedId = remember { mutableStateOf<Uuid?>(null) }

	// Extract string resource to composable scope
	val testNotes = stringResource(Res.string.analytics_test_notes)
	
	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.primaryContainer)
			.padding(16.dp),
		horizontalAlignment = Alignment.CenterHorizontally,
		verticalArrangement = Arrangement.Center
	) {
		Text(
			text = stringResource(Res.string.title_analytics),
			style = MaterialTheme.typography.headlineMedium,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)
		Spacer(modifier = Modifier.height(12.dp))
		Text(
			text = stringResource(Res.string.analytics_service_injected, service.hashCode()),
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
					notes = testNotes
				)
			}
		) {
			Text(stringResource(Res.string.analytics_create_test_session))
		}
		Spacer(modifier = Modifier.height(12.dp))
		Text(
			text = stringResource(Res.string.analytics_last_created, lastCreatedId.value?.toString() ?: "None"),
			style = MaterialTheme.typography.bodyMedium,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)
		Spacer(modifier = Modifier.height(16.dp))
		Text(
			text = stringResource(Res.string.analytics_placeholder),
			style = MaterialTheme.typography.bodyLarge,
			color = MaterialTheme.colorScheme.onPrimaryContainer
		)
	}
}
