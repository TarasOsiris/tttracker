package xyz.tleskiv.tt.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.LocalDate
import kotlinx.datetime.minus
import org.koin.compose.viewmodel.koinViewModel
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.ui.bottomsheets.DaySessionsBottomSheet
import xyz.tleskiv.tt.ui.dialogs.AnalyticsSettingsDialog
import xyz.tleskiv.tt.ui.nav.navdisplay.TopAppBarState
import xyz.tleskiv.tt.ui.nav.routes.AnalyticsRoute
import xyz.tleskiv.tt.ui.widgets.analytics.HeatmapAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.SummaryAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.WeeklyTrainingAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.WinLossAnalyticsWidget
import xyz.tleskiv.tt.util.today
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel

@Composable
fun AnalyticsScreen(
	onNavigateToSession: (String) -> Unit = {},
	topAppBarState: TopAppBarState,
	viewModel: AnalyticsScreenViewModel = koinViewModel()
) {
	val sessionsByDate by viewModel.sessionsByDate.collectAsState()
	val sessionsListByDate by viewModel.sessionsListByDate.collectAsState()
	val firstDayOfWeek by viewModel.firstDayOfWeek.collectAsState()
	val summaryStats by viewModel.summaryStats.collectAsState()
	val weeklyTrainingData by viewModel.weeklyTrainingData.collectAsState()
	val widgetVisibility by viewModel.widgetVisibility.collectAsState()
	val endDate = remember(sessionsByDate) {
		sessionsByDate.keys.maxOrNull() ?: today()
	}
	val startDate = remember(sessionsByDate, endDate) {
		val minDate = sessionsByDate.keys.minOrNull()
		val rangeStart = endDate.minus(12, DateTimeUnit.MONTH)
		if (minDate != null && minDate < rangeStart) minDate else rangeStart
	}
	var selection by remember { mutableStateOf<LocalDate?>(null) }
	var showSettingsDialog by rememberSaveable { mutableStateOf(false) }
	val sheetState = rememberModalBottomSheetState()
	val scope = rememberCoroutineScope()

	topAppBarState.title = { Text(text = stringResource(AnalyticsRoute.label)) }
	topAppBarState.actions = {
		IconButton(onClick = { showSettingsDialog = true }) {
			Icon(
				imageVector = Icons.Outlined.Settings,
				contentDescription = stringResource(R.string.analytics_settings_title),
				tint = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
	}

	if (showSettingsDialog) {
		AnalyticsSettingsDialog(
			visibility = widgetVisibility,
			onShowSummaryChange = viewModel::setShowSummary,
			onShowWinLossChange = viewModel::setShowWinLoss,
			onShowWeeklyChange = viewModel::setShowWeekly,
			onShowHeatmapChange = viewModel::setShowHeatmap,
			onDismiss = { showSettingsDialog = false }
		)
	}

	selection?.let { selectedDate ->
		DaySessionsBottomSheet(
			date = selectedDate,
			sessions = sessionsListByDate[selectedDate] ?: emptyList(),
			sheetState = sheetState,
			onDismiss = { selection = null },
			onSessionClick = { session ->
				scope.launch { sheetState.hide() }.invokeOnCompletion {
					selection = null
					onNavigateToSession(session.id.toString())
				}
			}
		)
	}

	Box(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surface)
			.testTag(TestTags.SCREEN_ANALYTICS)
	) {
		Column(
			modifier = Modifier
				.fillMaxSize()
				.verticalScroll(rememberScrollState())
				.padding(16.dp)
		) {
			AnimatedWidget(visible = widgetVisibility.showSummary) {
				SummaryAnalyticsWidget(summaryStats)
			}

			AnimatedWidget(visible = widgetVisibility.showWinLoss) {
				WinLossAnalyticsWidget(summaryStats)
			}

			AnimatedWidget(visible = widgetVisibility.showWeekly) {
				WeeklyTrainingAnalyticsWidget(weeklyTrainingData)
			}

			AnimatedWidget(visible = widgetVisibility.showHeatmap) {
				HeatmapAnalyticsWidget(
					sessionsByDate = sessionsByDate,
					startDate = startDate,
					endDate = endDate,
					firstDayOfWeek = firstDayOfWeek,
					selection = selection,
					onDaySelected = { selection = it }
				)
			}
		}
	}
}

@Composable
private fun AnimatedWidget(
	visible: Boolean,
	content: @Composable () -> Unit
) {
	AnimatedVisibility(
		visible = visible,
		enter = fadeIn() + expandVertically(),
		exit = fadeOut() + shrinkVertically()
	) {
		content()
	}
}
