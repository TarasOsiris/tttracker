package xyz.tleskiv.tt.ui.screens

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import tabletennistracker.composeapp.generated.resources.*
import xyz.tleskiv.tt.ui.widgets.BackButton
import xyz.tleskiv.tt.util.ext.formatDuration
import xyz.tleskiv.tt.util.ext.formatSessionDateFull
import xyz.tleskiv.tt.util.labelRes
import xyz.tleskiv.tt.util.ui.getRpeColor
import xyz.tleskiv.tt.util.ui.getRpeLabel
import xyz.tleskiv.tt.util.ui.toColor
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionUiModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SessionDetailsScreen(
	viewModel: SessionDetailsScreenViewModel,
	onNavigateBack: () -> Unit = {},
	onEdit: (String) -> Unit = {}
) {
	val uiState by viewModel.uiState.collectAsState()
	val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

	when {
		uiState.isLoading -> LoadingScreen(onNavigateBack)
		uiState.error != null -> ErrorScreen(error = uiState.error!!, onNavigateBack = onNavigateBack)
		uiState.session != null -> SessionDetailsContent(
			session = uiState.session!!,
			scrollBehavior = scrollBehavior,
			onNavigateBack = onNavigateBack,
			onEdit = { onEdit(uiState.session!!.id.toString()) }
		)
	}
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun LoadingScreen(onNavigateBack: () -> Unit) {
	Scaffold(
		topBar = {
			TopAppBar(
				title = { },
				navigationIcon = { BackButton(onNavigateBack) }
			)
		}
	) { padding ->
		Box(modifier = Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) {
			CircularProgressIndicator()
		}
	}
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ErrorScreen(error: String, onNavigateBack: () -> Unit) {
	Scaffold(
		topBar = {
			TopAppBar(
				title = { Text(stringResource(Res.string.title_error)) },
				navigationIcon = { BackButton(onNavigateBack) }
			)
		}
	) { padding ->
		Column(
			modifier = Modifier.fillMaxSize().padding(padding),
			horizontalAlignment = Alignment.CenterHorizontally,
			verticalArrangement = Arrangement.Center
		) {
			Text(text = "⚠️", style = MaterialTheme.typography.displayMedium)
			Spacer(modifier = Modifier.height(16.dp))
			Text(
				text = error,
				style = MaterialTheme.typography.bodyLarge,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
	}
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun SessionDetailsContent(
	session: SessionUiModel,
	scrollBehavior: TopAppBarScrollBehavior,
	onNavigateBack: () -> Unit,
	onEdit: () -> Unit
) {
	val sessionColor = session.sessionType.toColor()
	val collapsedFraction = scrollBehavior.state.collapsedFraction

	val containerColor by animateColorAsState(
		targetValue = if (collapsedFraction > 0.5f) MaterialTheme.colorScheme.surface
		else MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.3f),
		animationSpec = spring(stiffness = Spring.StiffnessLow)
	)

	Scaffold(
		modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
		topBar = {
			LargeTopAppBar(
				title = {
					Column {
						Text(
							text = session.sessionType?.labelRes()?.let { stringResource(it) }
								?: stringResource(Res.string.session_default_title),
							fontWeight = FontWeight.Bold
						)
						if (collapsedFraction < 0.7f) {
							Text(
								text = formatSessionDateFull(session.date),
								style = MaterialTheme.typography.bodyMedium,
								color = MaterialTheme.colorScheme.onSurfaceVariant
							)
						}
					}
				},
				navigationIcon = { BackButton(onNavigateBack) },
				actions = {
					IconButton(onClick = onEdit) {
						Icon(
							imageVector = vectorResource(Res.drawable.ic_edit),
							contentDescription = stringResource(Res.string.action_edit)
						)
					}
				},
				colors = TopAppBarDefaults.topAppBarColors(
					containerColor = containerColor,
					scrolledContainerColor = MaterialTheme.colorScheme.surface
				),
				scrollBehavior = scrollBehavior,
				modifier = Modifier.drawBehind {
					drawRect(
						color = sessionColor,
						topLeft = Offset(0f, 0f),
						size = androidx.compose.ui.geometry.Size(6.dp.toPx(), size.height)
					)
				}
			)
		}
	) { padding ->
		LazyColumn(
			modifier = Modifier.fillMaxSize(),
			contentPadding = PaddingValues(
				top = padding.calculateTopPadding(),
				bottom = padding.calculateBottomPadding() + 24.dp,
				start = 16.dp,
				end = 16.dp
			),
			verticalArrangement = Arrangement.spacedBy(12.dp)
		) {
			item { QuickStatsRow(session) }
			item { Spacer(modifier = Modifier.height(8.dp)) }
			item {
				DetailCard(
					label = stringResource(Res.string.label_duration),
					value = formatDuration(session.durationMinutes),
					emoji = "⏱️"
				)
			}
			session.sessionType?.let { type ->
				item {
					DetailCard(
						label = stringResource(Res.string.label_session_type),
						value = stringResource(type.labelRes()),
						emoji = "🏓"
					)
				}
			}
			item { RpeCard(rpe = session.rpe) }
			if (!session.notes.isNullOrBlank()) {
				item { NotesCard(notes = session.notes) }
			}
		}
	}
}

@Composable
private fun QuickStatsRow(session: SessionUiModel) {
	Row(
		modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
		horizontalArrangement = Arrangement.spacedBy(12.dp)
	) {
		StatCard(
			value = "${session.durationMinutes}",
			label = stringResource(Res.string.suffix_minutes),
			emoji = "⏱️",
			modifier = Modifier.weight(1f)
		)
		StatCard(
			value = session.rpe.toString(),
			label = stringResource(Res.string.label_rpe),
			emoji = "💪",
			color = getRpeColor(session.rpe),
			modifier = Modifier.weight(1f)
		)
		StatCard(
			value = session.date.dayOfWeek.name.take(3),
			label = session.date.month.name.take(3) + " ${session.date.day}",
			emoji = "📅",
			modifier = Modifier.weight(1f)
		)
	}
}

@Composable
private fun StatCard(
	value: String,
	label: String,
	emoji: String,
	modifier: Modifier = Modifier,
	color: Color = MaterialTheme.colorScheme.primary
) {
	Surface(
		modifier = modifier,
		shape = RoundedCornerShape(16.dp),
		color = MaterialTheme.colorScheme.surfaceContainerHigh,
		tonalElevation = 2.dp
	) {
		Column(
			modifier = Modifier.padding(16.dp),
			horizontalAlignment = Alignment.CenterHorizontally
		) {
			Text(text = emoji, style = MaterialTheme.typography.titleLarge)
			Spacer(modifier = Modifier.height(8.dp))
			Text(
				text = value,
				style = MaterialTheme.typography.headlineSmall,
				fontWeight = FontWeight.Bold,
				color = color
			)
			Text(
				text = label,
				style = MaterialTheme.typography.labelSmall,
				color = MaterialTheme.colorScheme.onSurfaceVariant
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
					text = stringResource(Res.string.label_intensity_rpe),
					style = MaterialTheme.typography.labelMedium,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
				Spacer(modifier = Modifier.height(2.dp))
				Text(
					text = getRpeLabel(rpe),
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
					text = stringResource(Res.string.label_notes),
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
