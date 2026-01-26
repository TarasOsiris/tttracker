package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.resources.vectorResource
import org.koin.compose.viewmodel.koinViewModel
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_add_opponent
import tabletennistracker.composeapp.generated.resources.action_back
import tabletennistracker.composeapp.generated.resources.action_delete
import tabletennistracker.composeapp.generated.resources.action_edit
import tabletennistracker.composeapp.generated.resources.delete_opponent_message
import tabletennistracker.composeapp.generated.resources.delete_opponent_title
import tabletennistracker.composeapp.generated.resources.help_icon_content_description
import tabletennistracker.composeapp.generated.resources.ic_delete
import tabletennistracker.composeapp.generated.resources.ic_edit
import tabletennistracker.composeapp.generated.resources.ic_help
import tabletennistracker.composeapp.generated.resources.opponent_rating_format
import tabletennistracker.composeapp.generated.resources.opponents_empty
import tabletennistracker.composeapp.generated.resources.opponents_info_message
import tabletennistracker.composeapp.generated.resources.opponents_info_title
import tabletennistracker.composeapp.generated.resources.title_opponents
import xyz.tleskiv.tt.db.Opponent
import xyz.tleskiv.tt.ui.dialogs.AddOpponentDialog
import xyz.tleskiv.tt.ui.dialogs.DeleteConfirmationDialog
import xyz.tleskiv.tt.ui.dialogs.EditOpponentDialog
import xyz.tleskiv.tt.ui.dialogs.InfoDialog
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.viewmodel.settings.OpponentsScreenViewModel
import kotlin.uuid.Uuid

@Composable
fun OpponentsScreen(
	onNavigateBack: () -> Unit,
	viewModel: OpponentsScreenViewModel = koinViewModel()
) {
	val opponents by viewModel.opponents.collectAsState()
	var showAddDialog by rememberSaveable { mutableStateOf(false) }
	var showInfoDialog by rememberSaveable { mutableStateOf(false) }
	var editingOpponentId by rememberSaveable { mutableStateOf<String?>(null) }
	var deletingOpponentId by rememberSaveable { mutableStateOf<String?>(null) }

	if (showInfoDialog) {
		InfoDialog(
			title = Res.string.opponents_info_title,
			message = Res.string.opponents_info_message,
			onDismiss = { showInfoDialog = false }
		)
	}

	if (showAddDialog) {
		AddOpponentDialog(onDismiss = { showAddDialog = false })
	}

	editingOpponentId?.let { idString ->
		EditOpponentDialog(
			opponentId = Uuid.parse(idString),
			onDismiss = { editingOpponentId = null }
		)
	}

	deletingOpponentId?.let { idString ->
		DeleteConfirmationDialog(
			title = Res.string.delete_opponent_title,
			message = Res.string.delete_opponent_message,
			onConfirm = {
				viewModel.deleteOpponent(Uuid.parse(idString))
				deletingOpponentId = null
			},
			onDismiss = { deletingOpponentId = null }
		)
	}

	Box(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surface)
	) {
		Column(modifier = Modifier.fillMaxSize()) {
			OpponentsTopBar(onNavigateBack = onNavigateBack, onInfoClick = { showInfoDialog = true })

			if (opponents.isEmpty()) {
				Box(
					modifier = Modifier.fillMaxSize(),
					contentAlignment = Alignment.Center
				) {
					Text(
						text = stringResource(Res.string.opponents_empty),
						style = MaterialTheme.typography.bodyLarge,
						color = MaterialTheme.colorScheme.onSurfaceVariant
					)
				}
			} else {
				val navBarPadding = WindowInsets.navigationBars.asPaddingValues().calculateBottomPadding()
				val fabHeight = 56.dp
				val fabMargin = 16.dp
				LazyColumn(
					modifier = Modifier.fillMaxSize(),
					contentPadding = PaddingValues(
						start = 16.dp,
						end = 16.dp,
						top = 16.dp,
						bottom = navBarPadding + fabHeight + fabMargin * 2
					),
					verticalArrangement = Arrangement.spacedBy(12.dp)
				) {
					items(opponents, key = { it.id.toString() }) { opponent ->
						OpponentCard(
							opponent = opponent,
							onEdit = { editingOpponentId = it.toString() },
							onDelete = { deletingOpponentId = it.toString() }
						)
					}
				}
			}
		}

		FloatingActionButton(
			onClick = { showAddDialog = true },
			modifier = Modifier
				.align(Alignment.BottomEnd)
				.navigationBarsPadding()
				.padding(16.dp),
			containerColor = MaterialTheme.colorScheme.primaryContainer,
			contentColor = MaterialTheme.colorScheme.onPrimaryContainer
		) {
			Icon(
				imageVector = Icons.Default.Add,
				contentDescription = stringResource(Res.string.action_add_opponent)
			)
		}
	}
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun OpponentsTopBar(onNavigateBack: () -> Unit, onInfoClick: () -> Unit) {
	Surface(
		color = MaterialTheme.colorScheme.surface,
		tonalElevation = 2.dp
	) {
		TopAppBar(
			title = {
				Text(
					text = stringResource(Res.string.title_opponents),
					style = MaterialTheme.typography.titleLarge
				)
			},
			navigationIcon = {
				IconButton(onClick = onNavigateBack) {
					Icon(
						imageVector = Icons.AutoMirrored.Filled.ArrowBack,
						contentDescription = stringResource(Res.string.action_back)
					)
				}
			},
			actions = {
				IconButton(onClick = onInfoClick) {
					Icon(
						imageVector = vectorResource(Res.drawable.ic_help),
						contentDescription = stringResource(Res.string.help_icon_content_description)
					)
				}
			},
			colors = TopAppBarDefaults.topAppBarColors(
				containerColor = MaterialTheme.colorScheme.surface
			)
		)
	}
}

@Composable
private fun OpponentCard(
	opponent: Opponent,
	onEdit: (Uuid) -> Unit,
	onDelete: (Uuid) -> Unit
) {
	ContentCard {
		Row(
			modifier = Modifier
				.fillMaxWidth()
				.padding(16.dp),
			verticalAlignment = Alignment.CenterVertically
		) {
			Box(
				modifier = Modifier
					.size(48.dp)
					.clip(CircleShape)
					.background(MaterialTheme.colorScheme.primaryContainer),
				contentAlignment = Alignment.Center
			) {
				Text(
					text = opponent.name.firstOrNull()?.uppercase() ?: "?",
					style = MaterialTheme.typography.titleMedium,
					fontWeight = FontWeight.Bold,
					color = MaterialTheme.colorScheme.onPrimaryContainer
				)
			}

			Spacer(modifier = Modifier.width(16.dp))

			Column(modifier = Modifier.weight(1f)) {
				Text(
					text = opponent.name,
					style = MaterialTheme.typography.bodyLarge,
					fontWeight = FontWeight.Medium,
					color = MaterialTheme.colorScheme.onSurface
				)
				if (!opponent.club.isNullOrBlank() || opponent.rating != null) {
					Row(verticalAlignment = Alignment.CenterVertically) {
						if (!opponent.club.isNullOrBlank()) {
							Text(
								text = opponent.club,
								style = MaterialTheme.typography.bodySmall,
								color = MaterialTheme.colorScheme.onSurfaceVariant
							)
						}
						if (!opponent.club.isNullOrBlank() && opponent.rating != null) {
							Text(
								text = " • ",
								style = MaterialTheme.typography.bodySmall,
								color = MaterialTheme.colorScheme.onSurfaceVariant
							)
						}
						if (opponent.rating != null) {
							Text(
								text = stringResource(Res.string.opponent_rating_format, opponent.rating.toInt()),
								style = MaterialTheme.typography.bodySmall,
								color = MaterialTheme.colorScheme.onSurfaceVariant
							)
						}
					}
				}
				if (!opponent.notes.isNullOrBlank()) {
					Text(
						text = opponent.notes,
						style = MaterialTheme.typography.bodySmall,
						color = MaterialTheme.colorScheme.onSurfaceVariant,
						maxLines = 2
					)
				}
			}

			IconButton(onClick = { onEdit(opponent.id) }) {
				Icon(
					imageVector = vectorResource(Res.drawable.ic_edit),
					contentDescription = stringResource(Res.string.action_edit),
					tint = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}

			IconButton(onClick = { onDelete(opponent.id) }) {
				Icon(
					imageVector = vectorResource(Res.drawable.ic_delete),
					contentDescription = stringResource(Res.string.action_delete),
					tint = MaterialTheme.colorScheme.error
				)
			}
		}
	}
}
