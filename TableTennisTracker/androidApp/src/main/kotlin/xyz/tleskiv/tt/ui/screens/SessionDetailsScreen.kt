package xyz.tleskiv.tt.ui.screens

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.LoadingIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LargeFlexibleTopAppBar
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.parameter.parametersOf
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.dialogs.DeleteSessionDialog
import xyz.tleskiv.tt.ui.widgets.BackButton
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.util.ext.formatDuration
import xyz.tleskiv.tt.util.ext.formatSessionDateFull
import xyz.tleskiv.tt.util.labelRes
import xyz.tleskiv.tt.util.ui.getRpeColor
import xyz.tleskiv.tt.util.ui.getRpeLabel
import xyz.tleskiv.tt.util.ui.toColor
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel.MatchUiModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel

@Composable
fun SessionDetailsScreen(
	sessionId: String,
	onNavigateBack: () -> Unit = {},
	onEdit: (String) -> Unit = {},
	onDeleted: () -> Unit = {},
	viewModel: SessionDetailsScreenViewModel = koinViewModel { parametersOf(sessionId) }
) {
	val uiState by viewModel.uiState.collectAsState()
	val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

	when {
		uiState.isLoading -> LoadingScreen(onNavigateBack)
		uiState.error != null -> ErrorScreen(error = uiState.error!!, onNavigateBack = onNavigateBack)
		uiState.session != null -> SessionDetailsContent(
			session = uiState.session!!,
			matches = uiState.matches,
			scrollBehavior = scrollBehavior,
			onNavigateBack = onNavigateBack,
			onEdit = { onEdit(uiState.session!!.id.toString()) },
			onDelete = { viewModel.deleteSession(onDeleted) }
		)
	}
}

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
			LoadingIndicator()
		}
	}
}

@Composable
private fun ErrorScreen(error: String, onNavigateBack: () -> Unit) {
	Scaffold(
		topBar = {
			TopAppBar(
				title = { Text(stringResource(R.string.title_error)) },
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

@Composable
private fun SessionDetailsContent(
	session: SessionUiModel,
	matches: List<MatchUiModel>,
	scrollBehavior: TopAppBarScrollBehavior,
	onNavigateBack: () -> Unit,
	onEdit: () -> Unit,
	onDelete: () -> Unit
) {
	var showDeleteDialog by remember { mutableStateOf(false) }
	val sessionColor = session.sessionType.toColor()
	val collapsedFraction = scrollBehavior.state.collapsedFraction

	val containerColor by animateColorAsState(
		targetValue = if (collapsedFraction > 0.5f) MaterialTheme.colorScheme.surface
		else MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.3f),
		animationSpec = spring(stiffness = Spring.StiffnessLow)
	)

	if (showDeleteDialog) {
		DeleteSessionDialog(
			onConfirm = {
				showDeleteDialog = false
				onDelete()
			},
			onDismiss = { showDeleteDialog = false }
		)
	}

	Scaffold(
		modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
		topBar = {
			LargeFlexibleTopAppBar(
				title = {
					Text(
						text = session.sessionType?.labelRes()?.let { stringResource(it) }
							?: stringResource(R.string.session_default_title),
						fontWeight = FontWeight.Bold
					)
				},
				subtitle = { Text(formatSessionDateFull(session.date)) },
				navigationIcon = { BackButton(onNavigateBack) },
				actions = {
					IconButton(onClick = onEdit) {
						Icon(
							imageVector = ImageVector.vectorResource(R.drawable.ic_edit),
							contentDescription = stringResource(R.string.action_edit)
						)
					}
					IconButton(onClick = { showDeleteDialog = true }) {
						Icon(
							imageVector = ImageVector.vectorResource(R.drawable.ic_delete),
							contentDescription = stringResource(R.string.action_delete)
						)
					}
				},
				colors = TopAppBarDefaults.largeTopAppBarColors(
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
					label = stringResource(R.string.label_duration),
					value = formatDuration(session.durationMinutes),
					emoji = "⏱️"
				)
			}
			session.sessionType?.let { type ->
				item {
					DetailCard(
						label = stringResource(R.string.label_session_type),
						value = stringResource(type.labelRes()),
						emoji = "🏓"
					)
				}
			}
			item { RpeCard(rpe = session.rpe) }
			val sessionNotes = session.notes
			if (!sessionNotes.isNullOrBlank()) {
				item { NotesCard(notes = sessionNotes) }
			}
			if (matches.isNotEmpty()) {
				item { Spacer(modifier = Modifier.height(8.dp)) }
				item { MatchesSectionHeader(matchCount = matches.size) }
				items(matches.size) { index ->
					MatchCard(match = matches[index])
				}
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
			label = stringResource(R.string.suffix_minutes),
			emoji = "⏱️",
			modifier = Modifier.weight(1f)
		)
		StatCard(
			value = session.rpe.toString(),
			label = stringResource(R.string.label_rpe),
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
		shape = MaterialTheme.shapes.medium,
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
	ContentCard {
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


	ContentCard {
		Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
			Text(text = "💪", style = MaterialTheme.typography.titleLarge)
			Spacer(modifier = Modifier.width(16.dp))
			Column(modifier = Modifier.weight(1f)) {
				Text(
					text = stringResource(R.string.label_intensity_rpe),
					style = MaterialTheme.typography.labelMedium,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
				Spacer(modifier = Modifier.height(2.dp))
				Text(
					text = getRpeLabel(rpe),
					style = MaterialTheme.typography.bodyLarge,
					color = getRpeColor(rpe)
				)
			}
			Box(
				modifier = Modifier.size(44.dp).clip(CircleShape)
					.background(MaterialTheme.colorScheme.surfaceContainerHigh),
				contentAlignment = Alignment.Center
			) {
				Text(
					text = rpe.toString(),
					style = MaterialTheme.typography.titleMedium,
					fontWeight = FontWeight.Bold,
					color = getRpeColor(rpe)
				)
			}
		}
	}
}

@Composable
private fun NotesCard(notes: String) {
	ContentCard {
		Column(modifier = Modifier.padding(16.dp)) {
			Row(verticalAlignment = Alignment.CenterVertically) {
				Text(text = "📝", style = MaterialTheme.typography.titleLarge)
				Spacer(modifier = Modifier.width(16.dp))
				Text(
					text = stringResource(R.string.label_notes),
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

@Composable
private fun MatchesSectionHeader(matchCount: Int) {
	Row(
		modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
		verticalAlignment = Alignment.CenterVertically
	) {
		Text(text = "🏆", style = MaterialTheme.typography.titleLarge)
		Spacer(modifier = Modifier.width(12.dp))
		Text(
			text = stringResource(R.string.session_matches_count, matchCount),
			style = MaterialTheme.typography.titleMedium,
			fontWeight = FontWeight.SemiBold,
			color = MaterialTheme.colorScheme.onSurface
		)
	}
}

@Composable
private fun MatchCard(match: MatchUiModel) {
	val resultColor = if (match.isWin) {
		MaterialTheme.colorScheme.primary
	} else {
		MaterialTheme.colorScheme.error
	}

	ContentCard {
		Row(
			modifier = Modifier.padding(16.dp).fillMaxWidth(),
			verticalAlignment = Alignment.CenterVertically
		) {
			Box(
				modifier = Modifier.size(48.dp).clip(CircleShape).background(resultColor.copy(alpha = 0.15f)),
				contentAlignment = Alignment.Center
			) {
				Text(
					text = stringResource(if (match.isWin) R.string.match_win else R.string.match_loss),
					style = MaterialTheme.typography.titleMedium,
					fontWeight = FontWeight.Bold,
					color = resultColor
				)
			}
			Spacer(modifier = Modifier.width(16.dp))
			Column(modifier = Modifier.weight(1f)) {
				Text(
					text = match.opponentName,
					style = MaterialTheme.typography.bodyLarge,
					fontWeight = FontWeight.Medium,
					color = MaterialTheme.colorScheme.onSurface
				)
				Row(verticalAlignment = Alignment.CenterVertically) {
					if (match.isDoubles) {
						Text(
							text = stringResource(R.string.label_doubles),
							style = MaterialTheme.typography.labelSmall,
							color = MaterialTheme.colorScheme.onSurfaceVariant
						)
						Spacer(modifier = Modifier.width(8.dp))
					}
					if (match.isRanked) {
						Text(
							text = stringResource(R.string.label_ranked),
							style = MaterialTheme.typography.labelSmall,
							color = MaterialTheme.colorScheme.tertiary
						)
					}
				}
			}
			Surface(
				shape = RoundedCornerShape(8.dp),
				color = resultColor.copy(alpha = 0.1f)
			) {
				Text(
					text = match.scoreDisplay,
					style = MaterialTheme.typography.titleMedium,
					fontWeight = FontWeight.Bold,
					color = resultColor,
					modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
				)
			}
		}
	}
}
