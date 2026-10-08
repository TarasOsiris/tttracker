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
import androidx.compose.material.icons.outlined.Tune
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import kotlinx.coroutines.launch
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.LocalDate
import kotlinx.datetime.minus
import org.koin.compose.viewmodel.koinViewModel
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.analytics.WeeklyChartRange
import xyz.tleskiv.tt.model.AnalyticsWidget
import xyz.tleskiv.tt.model.AnalyticsWidgetSetting
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.ui.bottomsheets.DaySessionsBottomSheet
import xyz.tleskiv.tt.ui.bottomsheets.HeadToHeadBottomSheet
import xyz.tleskiv.tt.ui.dialogs.AnalyticsSettingsDialog
import xyz.tleskiv.tt.ui.nav.navdisplay.TopAppBarState
import xyz.tleskiv.tt.ui.nav.routes.AnalyticsRoute
import xyz.tleskiv.tt.ui.pro.LocalPro
import xyz.tleskiv.tt.ui.widgets.analytics.HeadToHeadAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.HeatmapAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.LockedInsightsAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.SessionTypesAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.StreakAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.SummaryAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.TrainingLoadAnalyticsWidget
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
	val weeklyRange by viewModel.weeklyRange.collectAsState()
	val weeklyTraining by viewModel.weeklyTraining.collectAsStateWithLifecycle()
	val insights by viewModel.insights.collectAsStateWithLifecycle()
	val trainingLoad by viewModel.trainingLoad.collectAsStateWithLifecycle()
	val widgets by viewModel.widgets.collectAsState()
	val hasPro = LocalPro.current.hasProFeatures
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
	var showAllOpponents by rememberSaveable { mutableStateOf(false) }
	val sheetState = rememberModalBottomSheetState()
	val scope = rememberCoroutineScope()

	LaunchedEffect(hasPro) {
		if (!hasPro && viewModel.weeklyRange.value.needsPro) viewModel.setWeeklyRange(WeeklyChartRange.EIGHT_WEEKS)
	}

	topAppBarState.title = { Text(text = stringResource(AnalyticsRoute.label)) }
	topAppBarState.actions = {
		IconButton(onClick = { showSettingsDialog = true }) {
			Icon(
				imageVector = Icons.Outlined.Tune,
				contentDescription = stringResource(R.string.analytics_settings_title),
				tint = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
	}

	if (showSettingsDialog) {
		AnalyticsSettingsDialog(
			widgets = widgets,
			onVisibleChange = viewModel::setWidgetVisible,
			onMove = viewModel::moveWidget,
			onDismiss = { showSettingsDialog = false }
		)
	}

	if (showAllOpponents) {
		HeadToHeadBottomSheet(records = insights.opponents, onDismiss = { showAllOpponents = false })
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
			AnalyticsWidgetList(
				widgets = widgets,
				hasPro = hasPro,
				lockedInsights = { LockedInsightsAnalyticsWidget(streak = insights.streak, load = trainingLoad) }
			) { widget ->
				when (widget) {
					AnalyticsWidget.SUMMARY -> SummaryAnalyticsWidget(summaryStats)
					AnalyticsWidget.WIN_LOSS -> WinLossAnalyticsWidget(summaryStats)
					AnalyticsWidget.WEEKLY -> WeeklyTrainingAnalyticsWidget(
						weeks = weeklyTraining,
						range = weeklyRange,
						onRangeSelected = viewModel::setWeeklyRange
					)
					AnalyticsWidget.HEATMAP -> HeatmapAnalyticsWidget(
						sessionsByDate = sessionsByDate,
						startDate = startDate,
						endDate = endDate,
						firstDayOfWeek = firstDayOfWeek,
						selection = selection,
						onDaySelected = { selection = it }
					)
					AnalyticsWidget.STREAK -> StreakAnalyticsWidget(insights.streak)
					AnalyticsWidget.TRAINING_LOAD -> TrainingLoadAnalyticsWidget(trainingLoad)
					AnalyticsWidget.SESSION_TYPES -> SessionTypesAnalyticsWidget(insights.sessionTypes)
					AnalyticsWidget.HEAD_TO_HEAD -> HeadToHeadAnalyticsWidget(
						records = insights.opponents,
						onShowAll = { showAllOpponents = true }
					)
				}
			}
		}
	}
}

/**
 * The cards in the user's order. Without Pro the insights cannot be hidden: they collapse into one
 * locked preview where the first of them would have been.
 */
@Composable
private fun AnalyticsWidgetList(
	widgets: List<AnalyticsWidgetSetting>,
	hasPro: Boolean,
	lockedInsights: @Composable () -> Unit,
	content: @Composable (AnalyticsWidget) -> Unit
) {
	val firstInsight = widgets.firstOrNull { it.widget.isInsight }?.widget
	widgets.forEach { setting ->
		key(setting.widget) {
			when {
				!setting.widget.isInsight || hasPro -> AnimatedWidget(visible = setting.visible) { content(setting.widget) }
				setting.widget == firstInsight -> lockedInsights()
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
