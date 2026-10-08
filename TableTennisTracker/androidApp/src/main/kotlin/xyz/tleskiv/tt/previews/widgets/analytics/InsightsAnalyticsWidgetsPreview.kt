// Previews pass fake ViewModels directly: there is no ViewModelStore to scope them to.
@file:Suppress("ViewModelConstructorInComposable")

package xyz.tleskiv.tt.previews.widgets.analytics

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.previews.fakes.FakeAnalyticsScreenViewModel
import xyz.tleskiv.tt.ui.pro.LocalPro
import xyz.tleskiv.tt.ui.pro.ProState
import xyz.tleskiv.tt.ui.theme.AppTheme
import xyz.tleskiv.tt.ui.widgets.analytics.HeadToHeadAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.LockedInsightsAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.SessionTypesAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.StreakAnalyticsWidget
import xyz.tleskiv.tt.ui.widgets.analytics.TrainingLoadAnalyticsWidget

@Preview(showBackground = true, name = "Insights, Pro")
@Composable
fun InsightsAnalyticsWidgetsPreview() {
	val viewModel = FakeAnalyticsScreenViewModel()
	val insights by viewModel.insights.collectAsState()
	val load by viewModel.trainingLoad.collectAsState()
	CompositionLocalProvider(LocalPro provides ProState(hasProFeatures = true)) {
		AppTheme {
			Column(modifier = Modifier.padding(16.dp)) {
				StreakAnalyticsWidget(streak = insights.streak)
				TrainingLoadAnalyticsWidget(load = load)
				SessionTypesAnalyticsWidget(shares = insights.sessionTypes)
				HeadToHeadAnalyticsWidget(records = insights.opponents, onShowAll = {})
			}
		}
	}
}

@Preview(showBackground = true, name = "Insights, locked")
@Composable
fun LockedInsightsAnalyticsWidgetPreview() {
	val viewModel = FakeAnalyticsScreenViewModel()
	val insights by viewModel.insights.collectAsState()
	val load by viewModel.trainingLoad.collectAsState()
	AppTheme {
		Column(modifier = Modifier.padding(16.dp)) {
			LockedInsightsAnalyticsWidget(streak = insights.streak, load = load)
		}
	}
}
