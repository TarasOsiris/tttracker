package xyz.tleskiv.tt.util.ext

import android.icu.text.NumberFormat
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalConfiguration
import java.util.Locale

fun Locale.wholePercentFormat(): NumberFormat = NumberFormat.getPercentInstance(this).apply { maximumFractionDigits = 0 }

@Composable
fun formatPercent(fraction: Double): String {
	val locale = LocalConfiguration.current.locales[0]
	return remember(locale) { locale.wholePercentFormat() }.format(fraction)
}
