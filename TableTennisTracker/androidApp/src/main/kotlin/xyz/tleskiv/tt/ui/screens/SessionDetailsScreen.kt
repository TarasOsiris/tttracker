package xyz.tleskiv.tt.ui.screens

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.Notes
import androidx.compose.material.icons.outlined.Category
import androidx.compose.material.icons.outlined.EmojiEvents
import androidx.compose.material.icons.outlined.ErrorOutline
import androidx.compose.material.icons.outlined.FitnessCenter
import androidx.compose.material.icons.outlined.Timer
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LargeFlexibleTopAppBar
import androidx.compose.material3.LoadingIndicator
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
import xyz.tleskiv.tt.ui.health.SessionHealthSection
import xyz.tleskiv.tt.ui.theme.onWinContainerColor
import xyz.tleskiv.tt.ui.theme.winContainerColor
import xyz.tleskiv.tt.ui.widgets.BackButton
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.ui.widgets.RpeBadge
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
			Icon(
				imageVector = Icons.Outlined.ErrorOutline,
				contentDescription = null,
				modifier = Modifier.size(48.dp),
				tint = MaterialTheme.colorScheme.error
			)
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
				top = padding.calculateTopPadding() + 8.dp,
				bottom = padding.calculateBottomPadding() + 24.dp,
				start = 16.dp,
				end = 16.dp
			),
			verticalArrangement = Arrangement.spacedBy(12.dp)
		) {
			item { SessionSummaryCard(session) }
			item { SessionHealthSection(session.id.toString(), session.date, session.durationMinutes) }
			val sessionNotes = session.notes
			if (!sessionNotes.isNullOrBlank()) {
				item { NotesCard(notes = sessionNotes) }
			}
			if (matches.isNotEmpty()) {
				item { Spacer(modifier = Modifier.height(8.dp)) }
				item { MatchesSectionHeader(matchCount = matches.size) }
				items(matches, key = { it.id.toString() }) { match -> MatchCard(match) }
			}
		}
	}
}

@Composable
private fun SessionSummaryCard(session: SessionUiModel) {
	ContentCard {
		Column {
			SummaryRow(icon = Icons.Outlined.Timer, label = stringResource(R.string.label_duration)) {
				SummaryValue(formatDuration(session.durationMinutes))
			}
			session.sessionType?.let { type ->
				SummaryDivider()
				SummaryRow(icon = Icons.Outlined.Category, label = stringResource(R.string.label_session_type)) {
					Box(modifier = Modifier.size(10.dp).clip(CircleShape).background(type.toColor()))
					Spacer(modifier = Modifier.width(8.dp))
					SummaryValue(stringResource(type.labelRes()))
				}
			}
			SummaryDivider()
			SummaryRow(icon = Icons.Outlined.FitnessCenter, label = stringResource(R.string.label_intensity_rpe)) {
				SummaryValue(getRpeLabel(session.rpe), color = getRpeColor(session.rpe))
				Spacer(modifier = Modifier.width(8.dp))
				RpeBadge(session.rpe)
			}
		}
	}
}

@Composable
private fun SummaryRow(icon: ImageVector, label: String, value: @Composable RowScope.() -> Unit) {
	Row(
		modifier = Modifier.fillMaxWidth().heightIn(min = 56.dp).padding(horizontal = 16.dp, vertical = 8.dp),
		verticalAlignment = Alignment.CenterVertically
	) {
		Icon(imageVector = icon, contentDescription = null, tint = MaterialTheme.colorScheme.onSurfaceVariant)
		Spacer(modifier = Modifier.width(16.dp))
		Text(
			text = label,
			style = MaterialTheme.typography.bodyMedium,
			color = MaterialTheme.colorScheme.onSurfaceVariant,
			modifier = Modifier.weight(1f)
		)
		Spacer(modifier = Modifier.width(12.dp))
		value()
	}
}

@Composable
private fun SummaryValue(text: String, color: Color = MaterialTheme.colorScheme.onSurface) {
	Text(text = text, style = MaterialTheme.typography.bodyLarge, fontWeight = FontWeight.Medium, color = color)
}

@Composable
private fun SummaryDivider() {
	HorizontalDivider(modifier = Modifier.padding(start = 56.dp), color = MaterialTheme.colorScheme.outlineVariant)
}

@Composable
private fun NotesCard(notes: String) {
	ContentCard {
		Column(modifier = Modifier.padding(16.dp)) {
			Row(verticalAlignment = Alignment.CenterVertically) {
				Icon(
					imageVector = Icons.AutoMirrored.Outlined.Notes,
					contentDescription = null,
					tint = MaterialTheme.colorScheme.onSurfaceVariant
				)
				Spacer(modifier = Modifier.width(16.dp))
				Text(
					text = stringResource(R.string.label_notes),
					style = MaterialTheme.typography.bodyMedium,
					color = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}
			Spacer(modifier = Modifier.height(8.dp))
			Text(
				text = notes,
				style = MaterialTheme.typography.bodyLarge,
				color = MaterialTheme.colorScheme.onSurface,
				modifier = Modifier.padding(start = 40.dp)
			)
		}
	}
}

@Composable
private fun MatchesSectionHeader(matchCount: Int) {
	Row(
		modifier = Modifier.fillMaxWidth().padding(top = 8.dp, bottom = 4.dp),
		verticalAlignment = Alignment.CenterVertically
	) {
		Icon(
			imageVector = Icons.Outlined.EmojiEvents,
			contentDescription = null,
			tint = MaterialTheme.colorScheme.onSurfaceVariant
		)
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
	val containerColor = if (match.isWin) winContainerColor else MaterialTheme.colorScheme.errorContainer
	val onContainerColor = if (match.isWin) onWinContainerColor else MaterialTheme.colorScheme.onErrorContainer
	val tags = matchTags(match)
	val matchNotes = match.notes

	ContentCard {
		Column(modifier = Modifier.padding(16.dp).fillMaxWidth()) {
			Row(verticalAlignment = Alignment.CenterVertically) {
				Box(
					modifier = Modifier.size(40.dp).clip(CircleShape).background(containerColor),
					contentAlignment = Alignment.Center
				) {
					Text(
						text = stringResource(if (match.isWin) R.string.match_win else R.string.match_loss),
						style = MaterialTheme.typography.titleSmall,
						fontWeight = FontWeight.Bold,
						color = onContainerColor
					)
				}
				Spacer(modifier = Modifier.width(16.dp))
				Text(
					text = match.opponentName,
					style = MaterialTheme.typography.bodyLarge,
					fontWeight = FontWeight.Medium,
					color = MaterialTheme.colorScheme.onSurface,
					modifier = Modifier.weight(1f)
				)
				Spacer(modifier = Modifier.width(12.dp))
				Surface(shape = RoundedCornerShape(8.dp), color = containerColor) {
					Text(
						text = match.scoreDisplay,
						style = MaterialTheme.typography.titleMedium,
						fontWeight = FontWeight.Bold,
						color = onContainerColor,
						modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
					)
				}
			}
			if (tags.isNotEmpty()) {
				Spacer(modifier = Modifier.height(8.dp))
				FlowRow(
					modifier = Modifier.padding(start = 56.dp),
					horizontalArrangement = Arrangement.spacedBy(6.dp),
					verticalArrangement = Arrangement.spacedBy(6.dp)
				) {
					tags.forEach { MatchTag(it) }
				}
			}
			if (!matchNotes.isNullOrBlank()) {
				Spacer(modifier = Modifier.height(8.dp))
				Text(
					text = matchNotes,
					style = MaterialTheme.typography.bodyMedium,
					color = MaterialTheme.colorScheme.onSurfaceVariant,
					modifier = Modifier.padding(start = 56.dp)
				)
			}
		}
	}
}

@Composable
private fun matchTags(match: MatchUiModel): List<String> = buildList {
	if (match.isDoubles) add(stringResource(R.string.label_doubles))
	if (match.isRanked) add(stringResource(R.string.label_ranked))
	match.competitionLevel?.let { add(stringResource(it.labelRes())) }
}

@Composable
private fun MatchTag(text: String) {
	Surface(shape = CircleShape, color = MaterialTheme.colorScheme.surfaceContainerHighest) {
		Text(
			text = text,
			style = MaterialTheme.typography.labelMedium,
			color = MaterialTheme.colorScheme.onSurfaceVariant,
			modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
		)
	}
}
