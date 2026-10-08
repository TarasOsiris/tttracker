package xyz.tleskiv.tt.appwidget

import android.content.Context
import android.content.res.Configuration
import android.icu.text.DateFormat
import android.icu.text.MeasureFormat
import android.icu.text.NumberFormat
import android.icu.util.Measure
import android.icu.util.MeasureUnit
import android.os.LocaleList
import androidx.annotation.StringRes
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.luminance
import androidx.glance.color.ColorProvider
import androidx.glance.material3.ColorProviders
import androidx.glance.unit.ColorProvider
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.atStartOfDayIn
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.model.AppAccent
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.ui.theme.appColorScheme
import xyz.tleskiv.tt.ui.theme.lossColor
import xyz.tleskiv.tt.ui.theme.lossTextLight
import xyz.tleskiv.tt.ui.theme.winColor
import xyz.tleskiv.tt.ui.theme.winTextLight
import xyz.tleskiv.tt.util.ui.getRpeColor
import xyz.tleskiv.tt.util.ui.toColor
import java.util.Date
import java.util.Locale

/// What every widget draws with: strings and number/date formats in the app's in-app language
/// rather than the device's, and the app's colours with the Pro accent applied.
class WidgetEnvironment(context: Context, appLocale: AppLocale, accent: AppAccent) {
	private val localized: Context = context.localizedFor(appLocale)
	val locale: Locale = localized.resources.configuration.locales[0]
	val colors = WidgetColors(accent)

	fun string(@StringRes id: Int, vararg args: Any): String = localized.getString(id, *args)

	fun integer(value: Int): String = NumberFormat.getIntegerInstance(locale).format(value)

	fun percent(fraction: Double): String =
		NumberFormat.getPercentInstance(locale).apply { maximumFractionDigits = 0 }.format(fraction)

	fun record(won: Int, lost: Int): String = string(R.string.match_score_format, won, lost)

	/// Hours and minutes, pluralised and ordered by ICU for the language, leaving out a zero part —
	/// what iOS's `Duration.UnitsFormatStyle` gives the widgets there.
	fun duration(minutes: Int): String {
		val parts = listOfNotNull(
			Measure(minutes / 60, MeasureUnit.HOUR).takeIf { minutes >= 60 },
			Measure(minutes % 60, MeasureUnit.MINUTE).takeIf { minutes % 60 != 0 || minutes < 60 }
		)
		return MeasureFormat.getInstance(locale, MeasureFormat.FormatWidth.SHORT).formatMeasures(*parts.toTypedArray())
	}

	/// [skeleton] is an ICU pattern skeleton; the locale decides order and punctuation.
	fun date(date: LocalDate, skeleton: String): String {
		val millis = date.atStartOfDayIn(TimeZone.currentSystemDefault()).toEpochMilliseconds()
		return DateFormat.getInstanceForSkeleton(skeleton, locale).format(Date(millis))
	}

	private fun Context.localizedFor(locale: AppLocale): Context {
		if (locale == AppLocale.SYSTEM) return this
		val configuration = Configuration(resources.configuration)
		configuration.setLocales(LocaleList(Locale.forLanguageTag(locale.languageTag)))
		return createConfigurationContext(configuration)
	}

	companion object {
		const val SKELETON_DAY_WIDE = "EEEEdMMM"
	}
}

/// The app's light and dark schemes as Glance colour providers, so a widget follows the launcher's
/// day/night mode on its own, plus the few tones a widget draws that the scheme does not name.
class WidgetColors(accent: AppAccent) {
	private val light = appColorScheme(darkTheme = false, accent = accent)
	private val dark = appColorScheme(darkTheme = true, accent = accent)

	val providers = ColorProviders(light = light, dark = dark)

	val winText = ColorProvider(day = winTextLight, night = winColor)
	val lossText = ColorProvider(day = lossTextLight, night = lossColor)

	val divider = ColorProvider(day = light.outlineVariant, night = dark.outlineVariant)

	/// A quiet fill for empty heatmap days, idle weeks and past bars, as iOS's `.quaternary`.
	val idle = ColorProvider(day = light.onSurface.copy(alpha = IDLE_ALPHA), night = dark.onSurface.copy(alpha = IDLE_ALPHA))

	val pastBar = ColorProvider(day = light.onSurfaceVariant.copy(alpha = 0.5f), night = dark.onSurfaceVariant.copy(alpha = 0.5f))

	/// One hue at rising opacity rather than a ramp of hues, as both in-app heatmaps do; the hue is
	/// the accent, as on iOS.
	fun heatmap(level: Int): ColorProvider = when (level) {
		1 -> accent(0.35f)
		2 -> accent(0.55f)
		3 -> accent(0.75f)
		4 -> accent(1f)
		else -> idle
	}

	fun result(won: Int, lost: Int): ColorProvider = if (won >= lost) winText else lossText

	fun sessionType(type: SessionType?): ColorProvider = ColorProvider(type.toColor())

	fun rpe(rpe: Int): ColorProvider = ColorProvider(getRpeColor(rpe))

	/// Black or white, whichever clears 4.5:1 on the RPE fill — the fills are tuned as fills, and the
	/// middle of the ramp is a yellow nothing light reads on.
	fun rpeInk(rpe: Int): ColorProvider =
		ColorProvider(if (getRpeColor(rpe).luminance() > INK_LUMINANCE_THRESHOLD) Color.Black else Color.White)

	private fun accent(alpha: Float) =
		ColorProvider(day = light.primary.copy(alpha = alpha), night = dark.primary.copy(alpha = alpha))

	private companion object {
		const val IDLE_ALPHA = 0.1f

		/// Where contrast against white and against black meet: sqrt(1.05 * 0.05) - 0.05.
		const val INK_LUMINANCE_THRESHOLD = 0.1791f
	}
}

val LocalWidgetEnvironment = staticCompositionLocalOf<WidgetEnvironment> { error("No WidgetEnvironment provided") }
