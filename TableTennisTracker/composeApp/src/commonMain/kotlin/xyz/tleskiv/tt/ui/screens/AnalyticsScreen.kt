package xyz.tleskiv.tt.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.kizitonwose.calendar.core.now
import kotlinx.coroutines.launch
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.LocalDate
import kotlinx.datetime.minus
import org.jetbrains.compose.resources.stringResource
import org.koin.compose.viewmodel.koinViewModel
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.analytics_summary
import xyz.tleskiv.tt.ui.bottomsheets.DaySessionsBottomSheet
import xyz.tleskiv.tt.ui.widgets.analytics.HeatmapAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.SummaryAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.WeeklyTrainingAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.WinLossAnalyticsWidget
import xyz.tleskiv.tt.viewmodel.analytics.AnalyticsScreenViewModel

@Composable
fun AnalyticsScreen(
	viewModel: AnalyticsScreenViewModel = koinViewModel(),
	onNavigateToSession: (String) -> Unit = {}
) {
	val sessionsByDate by viewModel.sessionsByDate.collectAsState()
	val sessionsListByDate by viewModel.sessionsListByDate.collectAsState()
	val firstDayOfWeek by viewModel.firstDayOfWeek.collectAsState()
	val summaryStats by viewModel.summaryStats.collectAsState()
	val weeklyTrainingData by viewModel.weeklyTrainingData.collectAsState()
	val endDate = remember(sessionsByDate) {
		sessionsByDate.keys.maxOrNull() ?: LocalDate.now()
	}
	val startDate = remember(sessionsByDate, endDate) {
		val minDate = sessionsByDate.keys.minOrNull()
		val rangeStart = endDate.minus(12, DateTimeUnit.MONTH)
		if (minDate != null && minDate < rangeStart) minDate else rangeStart
	}
	var selection by remember { mutableStateOf<LocalDate?>(null) }
	val sheetState = rememberModalBottomSheetState()
	val scope = rememberCoroutineScope()

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

	Column(
		modifier = Modifier
			.fillMaxSize()
			.background(MaterialTheme.colorScheme.surface)
			.verticalScroll(rememberScrollState())
			.padding(16.dp)
	) {
		Text(
			text = stringResource(Res.string.analytics_summary),
			style = MaterialTheme.typography.titleSmall,
			fontWeight = FontWeight.SemiBold,
			color = MaterialTheme.colorScheme.primary,
			modifier = Modifier.padding(start = 4.dp, bottom = 8.dp)
		)
		SummaryAnalyticsWidget(summaryStats)

		Spacer(modifier = Modifier.height(24.dp))
		WinLossAnalyticsWidget(summaryStats)

		Spacer(modifier = Modifier.height(24.dp))
		WeeklyTrainingAnalyticsWidget(weeklyTrainingData)

		Spacer(modifier = Modifier.height(24.dp))
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
