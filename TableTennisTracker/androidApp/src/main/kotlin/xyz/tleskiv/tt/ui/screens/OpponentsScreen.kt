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
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlin.uuid.Uuid
import org.koin.compose.viewmodel.koinViewModel
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.data.model.Opponent
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.ui.dialogs.AddOpponentDialog
import xyz.tleskiv.tt.ui.dialogs.DeleteConfirmationDialog
import xyz.tleskiv.tt.ui.dialogs.EditOpponentDialog
import xyz.tleskiv.tt.ui.dialogs.InfoDialog
import xyz.tleskiv.tt.ui.widgets.AddFab
import xyz.tleskiv.tt.ui.widgets.ContentCard
import xyz.tleskiv.tt.ui.widgets.FabListBottomPadding
import xyz.tleskiv.tt.ui.widgets.SimpleTopAppBar
import xyz.tleskiv.tt.viewmodel.settings.OpponentsScreenViewModel

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
			title = R.string.opponents_info_title,
			message = R.string.opponents_info_message,
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
			title = R.string.delete_opponent_title,
			message = R.string.delete_opponent_message,
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
			.testTag(TestTags.SCREEN_OPPONENTS)
	) {
		Column(modifier = Modifier.fillMaxSize()) {
			OpponentsTopBar(onNavigateBack = onNavigateBack, onInfoClick = { showInfoDialog = true })

			if (opponents.isEmpty()) {
				Box(
					modifier = Modifier.fillMaxSize(),
					contentAlignment = Alignment.Center
				) {
					Text(
						text = stringResource(R.string.opponents_empty),
						style = MaterialTheme.typography.bodyLarge,
						color = MaterialTheme.colorScheme.onSurfaceVariant
					)
				}
			} else {
				val navBarPadding = WindowInsets.navigationBars.asPaddingValues().calculateBottomPadding()
				LazyColumn(
					modifier = Modifier.fillMaxSize(),
					contentPadding = PaddingValues(
						start = 16.dp,
						end = 16.dp,
						top = 16.dp,
						bottom = navBarPadding + FabListBottomPadding
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

		AddFab(
			onClick = { showAddDialog = true },
			icon = Icons.Default.Add,
			contentDescription = R.string.action_add_opponent,
			containerColor = MaterialTheme.colorScheme.primaryContainer,
			contentColor = MaterialTheme.colorScheme.onPrimaryContainer,
			modifier = Modifier.align(Alignment.BottomEnd).navigationBarsPadding()
		)
	}
}

@Composable
private fun OpponentsTopBar(onNavigateBack: () -> Unit, onInfoClick: () -> Unit) {
	SimpleTopAppBar(
		title = R.string.title_opponents,
		actions = {
			IconButton(onClick = onInfoClick) {
				Icon(
					imageVector = ImageVector.vectorResource(R.drawable.ic_help),
					contentDescription = stringResource(R.string.help_icon_content_description)
				)
			}
		},
		onNavigateBack = onNavigateBack
	)
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
				val club = opponent.club
				val rating = opponent.rating
				if (!club.isNullOrBlank() || rating != null) {
					Row(verticalAlignment = Alignment.CenterVertically) {
						if (!club.isNullOrBlank()) {
							Text(
								text = club,
								style = MaterialTheme.typography.bodySmall,
								color = MaterialTheme.colorScheme.onSurfaceVariant
							)
						}
						if (!club.isNullOrBlank() && rating != null) {
							Text(
								text = " • ",
								style = MaterialTheme.typography.bodySmall,
								color = MaterialTheme.colorScheme.onSurfaceVariant
							)
						}
						if (rating != null) {
							Text(
								text = stringResource(R.string.opponent_rating_format, rating.toInt()),
								style = MaterialTheme.typography.bodySmall,
								color = MaterialTheme.colorScheme.onSurfaceVariant
							)
						}
					}
				}
				val notes = opponent.notes
				if (!notes.isNullOrBlank()) {
					Text(
						text = notes,
						style = MaterialTheme.typography.bodySmall,
						color = MaterialTheme.colorScheme.onSurfaceVariant,
						maxLines = 2
					)
				}
			}

			IconButton(onClick = { onEdit(opponent.id) }) {
				Icon(
					imageVector = ImageVector.vectorResource(R.drawable.ic_edit),
					contentDescription = stringResource(R.string.action_edit),
					tint = MaterialTheme.colorScheme.onSurfaceVariant
				)
			}

			IconButton(onClick = { onDelete(opponent.id) }) {
				Icon(
					imageVector = ImageVector.vectorResource(R.drawable.ic_delete),
					contentDescription = stringResource(R.string.action_delete),
					tint = MaterialTheme.colorScheme.error
				)
			}
		}
	}
}
