package xyz.tleskiv.tt.appwidget

import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.ColorFilter
import androidx.glance.GlanceModifier
import androidx.glance.GlanceTheme
import androidx.glance.Image
import androidx.glance.background
import androidx.glance.ImageProvider
import androidx.glance.layout.Alignment
import androidx.glance.layout.Box
import androidx.glance.layout.Column
import androidx.glance.layout.Row
import androidx.glance.layout.Spacer
import androidx.glance.layout.fillMaxWidth
import androidx.glance.layout.height
import androidx.glance.layout.size
import androidx.glance.layout.width
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextAlign
import androidx.glance.text.TextStyle
import androidx.glance.unit.ColorProvider
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.util.labelRes

/// Type sizes standing in for iOS's text styles, which a widget there scales the same way.
object WidgetType {
	val caption2 = 11.sp
	val caption = 12.sp
	val headline = 17.sp
	val title3 = 20.sp
	val title2 = 22.sp
	val hero = 40.sp
}

@Composable
fun WidgetText(
	text: String,
	size: TextUnit,
	modifier: GlanceModifier = GlanceModifier,
	color: ColorProvider = GlanceTheme.colors.onSurface,
	weight: FontWeight = FontWeight.Normal,
	align: TextAlign = TextAlign.Start,
	maxLines: Int = Int.MAX_VALUE
) {
	Text(
		text = text,
		modifier = modifier,
		style = TextStyle(color = color, fontSize = size, fontWeight = weight, textAlign = align),
		maxLines = maxLines
	)
}

@Composable
fun SecondaryText(text: String, size: TextUnit = WidgetType.caption2, modifier: GlanceModifier = GlanceModifier, maxLines: Int = 1) {
	WidgetText(text, size, modifier, color = GlanceTheme.colors.onSurfaceVariant, maxLines = maxLines)
}

/// One headline number with its caption.
@Composable
fun WidgetStat(value: String, label: String, modifier: GlanceModifier = GlanceModifier, tint: ColorProvider? = null) {
	Column(modifier = modifier, horizontalAlignment = Alignment.CenterHorizontally) {
		WidgetText(value, WidgetType.headline, color = tint ?: GlanceTheme.colors.onSurface, weight = FontWeight.Bold, maxLines = 1)
		SecondaryText(label)
	}
}

/// A filled dot or rounded cell, tinted — one view each, which matters in a widget that draws a
/// year of days.
@Composable
fun WidgetShape(shape: Int, color: ColorProvider, modifier: GlanceModifier = GlanceModifier) {
	Image(
		provider = ImageProvider(shape),
		contentDescription = null,
		modifier = modifier,
		colorFilter = ColorFilter.tint(color)
	)
}

/// What every widget shows before the first session is logged: the invitation to log one, rather
/// than a wall of zeros.
@Composable
fun WidgetEmpty() {
	val environment = LocalWidgetEnvironment.current
	Column(horizontalAlignment = Alignment.CenterHorizontally) {
		WidgetText(EMPTY_SYMBOL, WidgetType.title3)
		Spacer(GlanceModifier.height(6.dp))
		WidgetText(environment.string(R.string.widget_empty), WidgetType.caption, color = GlanceTheme.colors.onSurfaceVariant, align = TextAlign.Center)
		WidgetText(environment.string(R.string.action_add_session), WidgetType.caption2, color = GlanceTheme.colors.primary, align = TextAlign.Center)
	}
}

/// A Pro widget placed without Pro: which widget it is, and that the app unlocks it. The tap goes
/// to the paywall.
@Composable
fun ProWidgetLock(name: String, symbol: String) {
	val environment = LocalWidgetEnvironment.current
	Column(horizontalAlignment = Alignment.CenterHorizontally) {
		WidgetText(symbol, WidgetType.title3)
		Spacer(GlanceModifier.height(6.dp))
		WidgetText(name, WidgetType.caption, weight = FontWeight.Bold, align = TextAlign.Center, maxLines = 1)
		Spacer(GlanceModifier.height(4.dp))
		Image(
			provider = ImageProvider(R.drawable.ic_crown),
			contentDescription = null,
			modifier = GlanceModifier.size(12.dp),
			colorFilter = ColorFilter.tint(GlanceTheme.colors.onSurfaceVariant)
		)
		WidgetText(
			text = environment.string(R.string.widget_pro_locked),
			size = WidgetType.caption2,
			color = GlanceTheme.colors.onSurfaceVariant,
			align = TextAlign.Center,
			maxLines = 2
		)
	}
}

/// The session's facts, shared by the last-session widget and the large summary.
@Composable
fun LastSessionDetail(session: WidgetLastSession, isCompact: Boolean = false) {
	val environment = LocalWidgetEnvironment.current
	val colors = environment.colors
	Column(modifier = GlanceModifier.fillMaxWidth()) {
		Row(modifier = GlanceModifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
			WidgetShape(R.drawable.widget_dot, colors.sessionType(session.type), GlanceModifier.size(8.dp))
			Spacer(GlanceModifier.width(6.dp))
			WidgetText(
				text = environment.string(session.type?.labelRes() ?: R.string.session_default_title),
				size = WidgetType.caption,
				modifier = GlanceModifier.defaultWeight(),
				weight = FontWeight.Bold,
				maxLines = 1
			)
			RpeBadge(session.rpe)
		}
		Spacer(GlanceModifier.height(4.dp))
		SecondaryText(environment.date(session.date, WidgetEnvironment.SKELETON_DAY_WIDE))
		WidgetText(
			text = environment.duration(session.minutes),
			size = if (isCompact) WidgetType.title3 else WidgetType.title2,
			weight = FontWeight.Bold,
			maxLines = 1
		)
		Spacer(GlanceModifier.height(4.dp))
		SessionMatches(session, isCompact)
	}
}

@Composable
private fun RpeBadge(rpe: Int) {
	val environment = LocalWidgetEnvironment.current
	Box(modifier = GlanceModifier.size(20.dp), contentAlignment = Alignment.Center) {
		WidgetShape(R.drawable.widget_dot, environment.colors.rpe(rpe), GlanceModifier.size(20.dp))
		WidgetText(environment.integer(rpe), WidgetType.caption2, color = environment.colors.rpeInk(rpe), weight = FontWeight.Bold)
	}
}

@Composable
private fun SessionMatches(session: WidgetLastSession, isCompact: Boolean) {
	val environment = LocalWidgetEnvironment.current
	if (session.matchCount == 0) {
		SecondaryText(environment.string(R.string.widget_no_matches))
		return
	}
	Row(verticalAlignment = Alignment.CenterVertically) {
		WidgetText(
			text = environment.record(session.matchesWon, session.matchesLost),
			size = WidgetType.caption,
			color = environment.colors.result(session.matchesWon, session.matchesLost),
			weight = FontWeight.Bold,
			maxLines = 1
		)
		val match = session.firstMatch
		if (!isCompact && match != null) {
			Spacer(GlanceModifier.width(6.dp))
			SecondaryText("${match.opponent} ${environment.record(match.myGames, match.opponentGames)}")
		}
	}
}

@Composable
fun WidgetDivider() {
	Box(modifier = GlanceModifier.fillMaxWidth().height(1.dp).background(LocalWidgetEnvironment.current.colors.divider)) {}
}

const val EMPTY_SYMBOL = "🏓"
