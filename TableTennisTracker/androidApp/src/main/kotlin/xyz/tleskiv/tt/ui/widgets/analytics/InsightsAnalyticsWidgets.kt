package xyz.tleskiv.tt.ui.widgets.analytics

import android.icu.text.MeasureFormat
import android.icu.util.Measure
import android.icu.util.MeasureUnit
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.analytics.SessionTypeShare
import xyz.tleskiv.tt.analytics.TrainingStreak
import xyz.tleskiv.tt.analytics.TrainingWeek
import xyz.tleskiv.tt.pro.PaywallSource
import xyz.tleskiv.tt.ui.pro.ProLocked
import xyz.tleskiv.tt.util.ext.formatDuration
import xyz.tleskiv.tt.util.labelRes
import xyz.tleskiv.tt.util.ui.toColor

private const val LOAD_LABEL_EVERY = 2

@Composable
fun StreakAnalyticsWidget(streak: TrainingStreak) {
	AnalyticsWidget(title = R.string.analytics_widget_streak, footer = R.string.analytics_streak_hint) {
		StreakTiles(streak = streak, modifier = Modifier.padding(16.dp))
	}
}

@Composable
fun TrainingLoadAnalyticsWidget(load: List<TrainingWeek>) {
	AnalyticsWidget(title = R.string.analytics_training_load, footer = R.string.analytics_training_load_hint) {
		Column(modifier = Modifier.padding(16.dp)) {
			TrainingLoadChart(load = load)
		}
	}
}

@Composable
fun SessionTypesAnalyticsWidget(shares: List<SessionTypeShare>) {
	AnalyticsWidget(title = R.string.analytics_session_types) {
		if (shares.isEmpty()) {
			AnalyticsEmptyState(message = R.string.analytics_no_training)
		} else {
			SessionTypeBreakdown(shares = shares)
		}
	}
}

/**
 * Without Pro, a single blurred preview of the streak and load stands in for every insight card, so
 * the free screen carries one lock rather than four.
 */
@Composable
fun LockedInsightsAnalyticsWidget(streak: TrainingStreak, load: List<TrainingWeek>) {
	AnalyticsWidget(title = R.string.analytics_insights) {
		ProLocked(
			source = PaywallSource.ANALYTICS_INSIGHTS,
			caption = stringResource(R.string.pro_benefit_insights_detail)
		) {
			Column(
				modifier = Modifier.fillMaxWidth().padding(16.dp),
				verticalArrangement = Arrangement.spacedBy(16.dp)
			) {
				StreakTiles(streak = streak)
				TrainingLoadChart(load = load)
			}
		}
	}
}

@Composable
private fun StreakTiles(streak: TrainingStreak, modifier: Modifier = Modifier) {
	Row(modifier = modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
		StatBox(
			modifier = Modifier.weight(1f),
			emoji = "🔥",
			value = formatWeeks(streak.currentWeeks),
			label = stringResource(R.string.analytics_streak_current)
		)
		StatBox(
			modifier = Modifier.weight(1f),
			emoji = "🏅",
			value = formatWeeks(streak.longestWeeks),
			label = stringResource(R.string.analytics_streak_longest)
		)
	}
}

/** "3 weeks", pluralised and translated by ICU in the app's language. */
@Composable
private fun formatWeeks(count: Int): String {
	val locale = LocalConfiguration.current.locales[0]
	return remember(count, locale) {
		MeasureFormat.getInstance(locale, MeasureFormat.FormatWidth.WIDE).format(Measure(count, MeasureUnit.WEEK))
	}
}

@Composable
private fun TrainingLoadChart(load: List<TrainingWeek>) {
	if (load.none { it.load > 0 }) {
		AnalyticsEmptyState(message = R.string.analytics_no_training, height = 150.dp)
		return
	}
	val values = remember(load) { load.map { it.load } }
	val axisMax = remember(values) { niceCeiling(values.max()) }
	WeeklyBarChart(
		values = values,
		axisLabels = load.mapIndexed { index, week ->
			week.start.dayMonthLabel().takeIf { (load.lastIndex - index) % LOAD_LABEL_EVERY == 0 }
		},
		axisMax = axisMax,
		formatValue = Int::toString,
		showValueLabels = false
	)
}

@Composable
private fun SessionTypeBreakdown(shares: List<SessionTypeShare>) {
	val most = remember(shares) { shares.maxOf { it.totalMinutes }.coerceAtLeast(1) }
	Column(
		modifier = Modifier.fillMaxWidth().padding(16.dp),
		verticalArrangement = Arrangement.spacedBy(14.dp)
	) {
		shares.forEach { share -> SessionTypeShareRow(share = share, mostMinutes = most) }
	}
}

@Composable
private fun SessionTypeShareRow(share: SessionTypeShare, mostMinutes: Int) {
	val type = share.type
	Column(
		modifier = Modifier.fillMaxWidth().semantics(mergeDescendants = true) {},
		verticalArrangement = Arrangement.spacedBy(6.dp)
	) {
		Row(modifier = Modifier.fillMaxWidth()) {
			Text(
				text = stringResource(type?.labelRes() ?: R.string.analytics_session_type_none),
				style = MaterialTheme.typography.bodyMedium,
				color = MaterialTheme.colorScheme.onSurface,
				modifier = Modifier.weight(1f)
			)
			Text(
				text = formatDuration(share.totalMinutes),
				style = MaterialTheme.typography.bodyMedium,
				color = MaterialTheme.colorScheme.onSurfaceVariant
			)
		}
		LinearProgressIndicator(
			progress = { share.totalMinutes.toFloat() / mostMinutes },
			modifier = Modifier.fillMaxWidth(),
			color = type.toColor(),
			trackColor = MaterialTheme.colorScheme.surfaceContainerHighest,
			drawStopIndicator = {}
		)
	}
}

/** The smallest of 1, 2, 4 or 5 times a power of ten that is at least [value]. */
private fun niceCeiling(value: Int): Int {
	if (value <= 0) return 1
	var magnitude = 1
	while (magnitude * 10 < value) magnitude *= 10
	return listOf(1, 2, 4, 5, 10).first { it * magnitude >= value } * magnitude
}
