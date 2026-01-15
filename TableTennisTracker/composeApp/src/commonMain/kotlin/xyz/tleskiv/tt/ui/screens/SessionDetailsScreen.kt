package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.ic_arrow_back
import tabletennistracker.composeapp.generated.resources.ic_sessions
import xyz.tleskiv.tt.util.displayName
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionUiModel

@Composable
fun SessionDetailsScreen(
	viewModel: SessionDetailsScreenViewModel,
	onNavigateBack: () -> Unit = {},
	onEdit: (String) -> Unit = {}
) {
	val uiState by viewModel.uiState.collectAsState()

	Scaffold(
		topBar = {
			TopAppBar(
				title = { },
				navigationIcon = {
					IconButton(onClick = onNavigateBack) {
						Icon(imageVector = vectorResource(Res.drawable.ic_arrow_back), contentDescription = "Back")
					}
				},
				colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.surface)
			)
		}
	) { paddingValues ->
		Box(modifier = Modifier.fillMaxSize().padding(paddingValues)) {
			when {
				uiState.isLoading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
				uiState.error != null -> ErrorContent(
					error = uiState.error!!,
					modifier = Modifier.align(Alignment.Center)
				)

				uiState.session != null -> SessionDetailsContent(session = uiState.session!!)
			}
		}
	}
}

@Composable
private fun ErrorContent(error: String, modifier: Modifier = Modifier) {
	Column(
		modifier = modifier.padding(32.dp),
		horizontalAlignment = Alignment.CenterHorizontally,
		verticalArrangement = Arrangement.spacedBy(16.dp)
	) {
		Text(text = "⚠️", style = MaterialTheme.typography.displayMedium)
		Text(
			text = error,
			style = MaterialTheme.typography.bodyLarge,
			color = MaterialTheme.colorScheme.onSurfaceVariant
		)
	}
}

@Composable
private fun SessionDetailsContent(session: SessionUiModel) {
	Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
		SessionHeader(session)
		Spacer(modifier = Modifier.height(24.dp))
		Column(
			modifier = Modifier.padding(horizontal = 16.dp),
			verticalArrangement = Arrangement.spacedBy(12.dp)
		) {
			DetailCard(label = "Date", value = formatSessionDate(session), emoji = "📅")
			DetailCard(label = "Duration", value = formatDuration(session.durationMinutes), emoji = "⏱️")
			session.sessionType?.let { type ->
				DetailCard(label = "Session Type", value = type.displayName(), emoji = "🏓")
			}
			session.rpe?.let { rpe ->
				RpeCard(rpe = rpe)
			}
			if (!session.notes.isNullOrBlank()) {
				NotesCard(notes = session.notes)
			}
		}
		Spacer(modifier = Modifier.height(32.dp))
	}
}

@Composable
private fun SessionHeader(session: SessionUiModel) {
	Box(
		modifier = Modifier
			.fillMaxWidth()
			.background(
				brush = Brush.verticalGradient(
					colors = listOf(MaterialTheme.colorScheme.primaryContainer, MaterialTheme.colorScheme.surface)
				)
			)
			.padding(horizontal = 24.dp, vertical = 32.dp)
	) {
		Column {
			Row(
				verticalAlignment = Alignment.CenterVertically,
				horizontalArrangement = Arrangement.spacedBy(16.dp)
			) {
				Box(
					modifier = Modifier.size(56.dp).clip(RoundedCornerShape(16.dp))
						.background(MaterialTheme.colorScheme.primary),
					contentAlignment = Alignment.Center
				) {
					Icon(
						imageVector = vectorResource(Res.drawable.ic_sessions),
						contentDescription = null,
						modifier = Modifier.size(32.dp),
						tint = MaterialTheme.colorScheme.onPrimary
					)
				}
				Column {
					Text(
						text = session.sessionType?.displayName() ?: "Training Session",
						style = MaterialTheme.typography.headlineSmall,
						fontWeight = FontWeight.Bold,
						color = MaterialTheme.colorScheme.onSurface
					)
					Text(
						text = formatSessionDateShort(session),
						style = MaterialTheme.typography.bodyLarge,
						color = MaterialTheme.colorScheme.onSurfaceVariant
					)
				}
			}

			Spacer(modifier = Modifier.height(20.dp))

			Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
				StatChip(label = "${session.durationMinutes} min", emoji = "⏱️", modifier = Modifier.weight(1f))
				session.rpe?.let { rpe ->
					StatChip(label = "RPE $rpe", emoji = "💪", modifier = Modifier.weight(1f))
				}
			}
		}
	}
}

@Composable
private fun StatChip(label: String, emoji: String, modifier: Modifier = Modifier) {
	Surface(
		modifier = modifier,
		shape = RoundedCornerShape(12.dp),
		color = MaterialTheme.colorScheme.surfaceContainerHigh,
		tonalElevation = 1.dp
	) {
		Row(
			modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp),
			horizontalArrangement = Arrangement.Center,
			verticalAlignment = Alignment.CenterVertically
		) {
			Text(text = emoji, style = MaterialTheme.typography.titleMedium)
			Spacer(modifier = Modifier.width(8.dp))
			Text(
				text = label,
				style = MaterialTheme.typography.labelLarge,
				fontWeight = FontWeight.Medium,
				color = MaterialTheme.colorScheme.onSurface
			)
		}
	}
}

@Composable
private fun DetailCard(label: String, value: String, emoji: String) {
	Surface(
		modifier = Modifier.fillMaxWidth(),
		shape = RoundedCornerShape(12.dp),
		color = MaterialTheme.colorScheme.surfaceContainerLow,
		tonalElevation = 1.dp
	) {
		Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
			Text(text = emoji, style = MaterialTheme.typography.titleLarge)
			Spacer(modifier = Modifier.width(16.dp))
			Column(modifier = Modifier.weight(1f)) {
				Text(
					text = label,
					style = MaterialTheme.typography.labelMedium,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
				Spacer(modifier = Modifier.height(2.dp))
				Text(
					text = value,
					style = MaterialTheme.typography.bodyLarge,
					color = MaterialTheme.colorScheme.onSurface
				)
			}
		}
	}
}

@Composable
private fun RpeCard(rpe: Int) {
	val backgroundColor = when {
		rpe <= 3 -> MaterialTheme.colorScheme.tertiaryContainer
		rpe <= 6 -> MaterialTheme.colorScheme.secondaryContainer
		else -> MaterialTheme.colorScheme.errorContainer
	}
	val textColor = when {
		rpe <= 3 -> MaterialTheme.colorScheme.onTertiaryContainer
		rpe <= 6 -> MaterialTheme.colorScheme.onSecondaryContainer
		else -> MaterialTheme.colorScheme.onErrorContainer
	}

	Surface(
		modifier = Modifier.fillMaxWidth(),
		shape = RoundedCornerShape(12.dp),
		color = MaterialTheme.colorScheme.surfaceContainerLow,
		tonalElevation = 1.dp
	) {
		Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
			Text(text = "💪", style = MaterialTheme.typography.titleLarge)
			Spacer(modifier = Modifier.width(16.dp))
			Column(modifier = Modifier.weight(1f)) {
				Text(
					text = "Intensity (RPE)",
					style = MaterialTheme.typography.labelMedium,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
				Spacer(modifier = Modifier.height(2.dp))
				Text(
					text = getRpeDescription(rpe),
					style = MaterialTheme.typography.bodyLarge,
					color = MaterialTheme.colorScheme.onSurface
				)
			}
			Box(
				modifier = Modifier.size(44.dp).clip(CircleShape).background(backgroundColor),
				contentAlignment = Alignment.Center
			) {
				Text(
					text = rpe.toString(),
					style = MaterialTheme.typography.titleMedium,
					fontWeight = FontWeight.Bold,
					color = textColor
				)
			}
		}
	}
}

@Composable
private fun NotesCard(notes: String) {
	Surface(
		modifier = Modifier.fillMaxWidth(),
		shape = RoundedCornerShape(12.dp),
		color = MaterialTheme.colorScheme.surfaceContainerLow,
		tonalElevation = 1.dp
	) {
		Column(modifier = Modifier.padding(16.dp)) {
			Row(verticalAlignment = Alignment.CenterVertically) {
				Text(text = "📝", style = MaterialTheme.typography.titleLarge)
				Spacer(modifier = Modifier.width(16.dp))
				Text(
					text = "Notes",
					style = MaterialTheme.typography.labelMedium,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}
			Spacer(modifier = Modifier.height(12.dp))
			Text(
				text = notes,
				style = MaterialTheme.typography.bodyMedium,
				color = MaterialTheme.colorScheme.onSurface,
				modifier = Modifier.padding(start = 48.dp)
			)
		}
	}
}

private fun formatSessionDate(session: SessionUiModel): String {
	val date = session.date
	val dayOfWeek = date.dayOfWeek.name.lowercase().replaceFirstChar { it.uppercase() }
	val month = date.month.name.lowercase().replaceFirstChar { it.uppercase() }
	return "$dayOfWeek, $month ${date.day}, ${date.year}"
}

private fun formatSessionDateShort(session: SessionUiModel): String {
	val date = session.date
	val month = date.month.name.take(3).lowercase().replaceFirstChar { it.uppercase() }
	return "$month ${date.day}, ${date.year}"
}

private fun formatDuration(minutes: Int): String = when {
	minutes < 60 -> "$minutes minutes"
	minutes % 60 == 0 -> "${minutes / 60} hour${if (minutes / 60 > 1) "s" else ""}"
	else -> "${minutes / 60}h ${minutes % 60}min"
}

private fun getRpeDescription(rpe: Int): String = when (rpe) {
	1, 2 -> "Very easy"
	3, 4 -> "Easy"
	5, 6 -> "Moderate"
	7, 8 -> "Hard"
	9, 10 -> "Maximum effort"
	else -> ""
}
