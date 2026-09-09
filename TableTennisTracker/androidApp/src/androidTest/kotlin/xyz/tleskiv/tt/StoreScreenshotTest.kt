package xyz.tleskiv.tt

import android.graphics.Bitmap
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onAllNodesWithTag
import androidx.test.core.app.takeScreenshot
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.services.storage.TestStorage
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.koin.core.context.GlobalContext
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.showcase.ShowcaseData
import xyz.tleskiv.tt.showcase.ShowcaseSeeder
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.util.clickTag
import xyz.tleskiv.tt.util.idle
import xyz.tleskiv.tt.util.pressBack
import xyz.tleskiv.tt.util.scrollToAndClickTag

/// Captures the Play Store screenshots, one pass per app language.
///
/// Unlike the iOS run this seeds and switches language by calling into `:core` directly —
/// instrumentation tests share the app's process, so there is no reason to drive the debug screen
/// or the language picker through the UI. The dataset is [ShowcaseData], the same rows the iPhone
/// and iPad runs write.
///
/// Nothing is addressed by text: fourteen languages go past and a string lookup would work in one.
@RunWith(AndroidJUnit4::class)
class StoreScreenshotTest {

	@get:Rule
	val composeTestRule = createAndroidComposeRule<MainActivity>()

	private val storage = TestStorage()

	private val preferences: UserPreferencesRepository by lazy { GlobalContext.get().get() }

	private val expectedWidth = 1080
	private val expectedHeight = 2160

	@Test
	fun capturesEveryLocale() {
		// Re-seeded per language, not seeded once: the session notes are user content, so
		// `ShowcaseSeeder` writes the translation for the language it is handed.
		for (locale in locales) {
			setLocale(locale)
			seedShowcaseData(locale.languageTag)
			capturePass(locale.languageTag)
		}

		setLocale(AppLocale.ENGLISH)
		setTheme(AppThemeMode.SYSTEM)
	}

	private fun capturePass(locale: String) = with(composeTestRule) {
		setTheme(AppThemeMode.LIGHT)

		clickTag(TestTags.TAB_SESSIONS)
		idle()
		capture(locale, "01-sessions")

		clickTag(TestTags.SESSIONS_ADD)
		waitForTag(TestTags.SCREEN_SESSION_FORM)
		capture(locale, "02-sessionForm")

		scrollToAndClickTag(TestTags.SESSION_FORM_ADD_MATCH)
		waitForTag(TestTags.ADD_MATCH_DIALOG_CONTENT)
		capture(locale, "04-matchEditor")
		goBack(times = 2)

		clickTag(TestTags.TAB_SESSIONS)
		clickTag(TestTags.CALENDAR_MONTH_MODE)
		idle()
		capture(locale, "05-calendar")
		clickTag(TestTags.CALENDAR_WEEK_MODE)

		clickTag(TestTags.TAB_ANALYTICS)
		waitForTag(TestTags.SCREEN_ANALYTICS)
		capture(locale, "03-analytics")

		clickTag(TestTags.TAB_SETTINGS)
		scrollToAndClickTag(TestTags.SETTINGS_OPPONENTS)
		waitForTag(TestTags.SCREEN_OPPONENTS)
		capture(locale, "06-opponents")
		goBack()

		clickTag(TestTags.TAB_SETTINGS)
		scrollToAndClickTag(TestTags.SETTINGS_GENERAL)
		waitForTag(TestTags.SCREEN_GENERAL)
		capture(locale, "08-settings")
		goBack()

		setTheme(AppThemeMode.DARK)
		clickTag(TestTags.TAB_SESSIONS)
		idle()
		capture(locale, "07-dark")
	}

	// MARK: Data and preferences

	private fun seedShowcaseData(languageTag: String) {
		val koin = GlobalContext.get()
		val sessions: TrainingSessionService = koin.get()
		val opponents: OpponentService = koin.get()

		runBlocking {
			sessions.deleteAllSessions()
			opponents.deleteAllOpponents()
			ShowcaseSeeder(sessions, opponents).seed(languageTag)

			val written = sessions.getAllSessions().size
			assertEquals("seeding wrote the wrong number of sessions", ShowcaseData.sessions.size, written)
		}
		composeTestRule.idle()
	}

	/// The whole tree is re-keyed on `currentLocale` in `App.kt`, so writing the preference is all it
	/// takes — driving the picker would only add fourteen chances to tap the wrong localized row.
	private fun setLocale(locale: AppLocale) {
		runBlocking { preferences.setAppLocale(locale) }
		composeTestRule.idle()
	}

	private fun setTheme(mode: AppThemeMode) {
		runBlocking { preferences.setThemeMode(mode) }
		composeTestRule.idle()
	}

	// MARK: Capture

	/// `androidx.test.core.app.takeScreenshot` rather than a `screencap` shell-out: it forces every
	/// global window to redraw and retries the UiAutomation call, which is what makes a Compose frame
	/// come out whole rather than half-composed.
	private fun capture(locale: String, screen: String) {
		composeTestRule.idle()
		InstrumentationRegistry.getInstrumentation().waitForIdleSync()

		val bitmap: Bitmap = takeScreenshot()
		assertEquals("unexpected screenshot width", expectedWidth, bitmap.width)
		assertEquals("unexpected screenshot height", expectedHeight, bitmap.height)

		storage.openOutputFile("android/$locale/$screen.png").use { output ->
			bitmap.compress(Bitmap.CompressFormat.PNG, 100, output)
		}
		bitmap.recycle()
	}

	// MARK: Navigation helpers

	private fun waitForTag(tag: String, timeoutMillis: Long = 10_000) = with(composeTestRule) {
		waitUntil(timeoutMillis) { onAllNodesWithTag(tag).fetchSemanticsNodes().isNotEmpty() }
	}

	private fun goBack(times: Int = 1) {
		repeat(times) {
			pressBack()
			composeTestRule.idle()
		}
	}

	private companion object {
		/// Every language the app ships. `SYSTEM` is skipped: it resolves to whatever the emulator is
		/// set to, which is not a language the store lists.
		val locales: List<AppLocale> = AppLocale.entries.filter { it != AppLocale.SYSTEM }
	}
}
