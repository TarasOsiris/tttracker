package xyz.tleskiv.tt

import android.os.SystemClock
import android.view.InputDevice
import android.view.MotionEvent
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.test.SemanticsNodeInteraction
import androidx.compose.ui.test.hasTestTag
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import kotlinx.coroutines.runBlocking
import org.json.JSONArray
import org.json.JSONObject
import org.junit.Assume.assumeTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.koin.core.context.GlobalContext
import xyz.tleskiv.tt.model.AppLocale
import xyz.tleskiv.tt.model.AppThemeMode
import xyz.tleskiv.tt.repo.UserPreferencesRepository
import xyz.tleskiv.tt.service.OpponentService
import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.showcase.ShowcaseSeeder
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.util.closeSoftKeyboard
import xyz.tleskiv.tt.util.idle
import java.io.File
import kotlin.math.max

/// The takes the Google Play promo video is cut from, the Android twin of `AppPreviewTakes.swift`.
///
/// `marketing/app-preview/capture/capture_android.py` runs one take at a time with the `previewTake`
/// instrumentation argument while `screenrecord` films the emulator. A take seeds the showcase data
/// and sets the theme off camera, writes `ready` and waits for the host's `go`, then plays its
/// script. Touches are injected in real time at each node's place on screen and logged with their
/// time and point, so the video draws its touch dots and click sounds where the app reacted.
///
/// Without `previewTake` every run is skipped, so a full instrumentation run is unaffected.
@RunWith(AndroidJUnit4::class)
class AppPreviewTakes {

	@get:Rule
	val composeTestRule = createAndroidComposeRule<MainActivity>()

	private val instrumentation = InstrumentationRegistry.getInstrumentation()
	private val take: String? = InstrumentationRegistry.getArguments().getString("previewTake")
	private val directory by lazy {
		File(instrumentation.targetContext.getExternalFilesDir(null), "preview").apply { mkdirs() }
	}
	private val go = File("/data/local/tmp/tt-preview-go")
	private val events = JSONArray()
	private var goAt = 0L

	@Test
	fun record() {
		assumeTrue("recorded by marketing/app-preview/capture/capture_android.py", take != null)
		when (take) {
			"browse" -> browse()
			"log" -> log()
			"analytics" -> analytics()
			"dark" -> dark()
			else -> error("unknown take $take")
		}
		finish()
		// After the take's logged end, so the clip never shows it: the emulator keeps no dark theme.
		runBlocking { GlobalContext.get().get<UserPreferencesRepository>().setThemeMode(AppThemeMode.SYSTEM) }
	}

	// MARK: Takes

	private fun browse() = with(composeTestRule) {
		prepare(AppThemeMode.LIGHT)
		pause(3.4)
		val width = screenWidth()
		drag(Offset(width / 2, screenHeight() * 0.5f), Offset(width / 2, screenHeight() * 0.78f), 0.9)
		pause(0.8)
		tap(onNodeWithTag(TestTags.CALENDAR_MONTH_MODE))
		pause(1.4)
		// The month does not page by swiping, so a day in it is picked instead: the list follows.
		tap(onAllNodesWithText("16").onFirst())
		pause(1.8)
	}

	private fun log() = with(composeTestRule) {
		prepare(AppThemeMode.LIGHT)
		pause(1.0)
		tap(onNodeWithTag(TestTags.SESSIONS_ADD))
		waitForTag(TestTags.SCREEN_SESSION_FORM)
		pause(1.0)

		slide(onNodeWithTag(TestTags.DURATION_SLIDER), from = 0.2f, to = 0.42f)
		pause(0.5)
		tap(onNodeWithText("Match Play"))
		pause(0.6)
		slide(onNodeWithTag(TestTags.RPE_SLIDER), from = 4f / 9f, to = 7f / 9f)
		pause(0.6)

		val width = screenWidth()
		drag(Offset(width / 2, screenHeight() * 0.8f), Offset(width / 2, screenHeight() * 0.3f), 0.7)
		pause(0.7)
		tap(onNodeWithTag(TestTags.SESSION_FORM_ADD_MATCH))
		waitForTag(TestTags.ADD_MATCH_DIALOG_CONTENT)
		pause(0.9)

		val name = onNodeWithTag(TestTags.OPPONENT_FIELD)
		tap(name)
		pause(0.4)
		for (letter in "Die") {
			name.performTextInput(letter.toString())
			pause(0.15)
		}
		events.put(JSONObject().put("t", now()).put("kind", "type").put("text", "Die"))
		pause(0.7)
		tap(onNodeWithText("Diego Marín", substring = true, useUnmergedTree = true))
		// The keyboard covers the dialog's lower half, and a touch injected into another app's window
		// (the keyboard's) is refused.
		closeSoftKeyboard()
		pause(0.6)
		repeat(3) {
			tap(onNodeWithTag(TestTags.MY_SCORE_PLUS))
			pause(0.35)
		}
		tap(onNodeWithTag(TestTags.OPPONENT_SCORE_PLUS))
		pause(0.8)
		tap(onNodeWithTag(TestTags.ADD_MATCH_DIALOG_SAVE))
		pause(1.3)
		tap(onNodeWithText("Save"))
		pause(2.2)
	}

	private fun analytics() = with(composeTestRule) {
		prepare(AppThemeMode.LIGHT)
		pause(0.8)
		tap(onNodeWithTag(TestTags.TAB_ANALYTICS))
		waitForTag(TestTags.SCREEN_ANALYTICS)
		pause(1.6)
		val width = screenWidth()
		repeat(3) {
			drag(Offset(width / 2, screenHeight() * 0.78f), Offset(width / 2, screenHeight() * 0.36f), 1.1)
			pause(1.1)
		}
	}

	private fun dark() {
		prepare(AppThemeMode.DARK)
		pause(4.4)
	}

	// MARK: Preparation and handshake

	/// Seeds, sets the theme, lands the list on today, then hands over to the recorder.
	private fun prepare(theme: AppThemeMode) = with(composeTestRule) {
		val koin = GlobalContext.get()
		val preferences: UserPreferencesRepository = koin.get()
		val sessions: TrainingSessionService = koin.get()
		val opponents: OpponentService = koin.get()
		runBlocking {
			preferences.setAppLocale(AppLocale.ENGLISH)
			preferences.setThemeMode(theme)
			sessions.deleteAllSessions()
			opponents.deleteAllOpponents()
			ShowcaseSeeder(sessions, opponents).seed("en")
		}
		idle()
		onNodeWithTag(TestTags.TAB_SESSIONS).performClick()
		waitForTag(TestTags.SESSION_ROW)
		idle()
		pause(1.5)

		File(directory, "ready").writeText("ready")
		val deadline = SystemClock.uptimeMillis() + 120_000
		while (!go.exists()) {
			check(SystemClock.uptimeMillis() < deadline) { "the recorder never started" }
			Thread.sleep(20)
		}
		goAt = System.currentTimeMillis()
	}

	private fun finish() {
		val payload = JSONObject()
			.put("go", goAt)
			.put("end", System.currentTimeMillis())
			.put("points", JSONArray().put(screenWidth().toDouble()).put(screenHeight().toDouble()))
			.put("events", events)
		File(directory, "events.json").writeText(payload.toString(2))
	}

	// MARK: Real-time touches

	private fun now() = (System.currentTimeMillis() - goAt) / 1000.0

	private fun screenWidth() = instrumentation.targetContext.resources.displayMetrics.widthPixels.toFloat()

	private fun screenHeight() = composeTestRule.activity.window.decorView.height.toFloat()

	/// Where a node sits on the screen, whichever window it is in: the match dialog and its
	/// suggestion menu are windows of their own.
	private fun center(node: SemanticsNodeInteraction): Offset {
		val semantics = node.fetchSemanticsNode()
		val position = semantics.positionOnScreen
		return Offset(position.x + semantics.size.width / 2f, position.y + semantics.size.height / 2f)
	}

	private fun tap(node: SemanticsNodeInteraction) {
		composeTestRule.waitUntil(10_000) { runCatching { node.fetchSemanticsNode() }.isSuccess }
		val point = center(node)
		events.put(JSONObject().put("t", now()).put("kind", "tap").put("x", point.x).put("y", point.y))
		val down = SystemClock.uptimeMillis()
		inject(down, down, MotionEvent.ACTION_DOWN, point)
		Thread.sleep(60)
		inject(down, SystemClock.uptimeMillis(), MotionEvent.ACTION_UP, point)
		composeTestRule.idle()
	}

	/// A finger moved in real time on the ease the video's touch dot follows.
	private fun drag(from: Offset, to: Offset, seconds: Double) {
		events.put(
			JSONObject().put("t", now()).put("kind", "drag").put("x", from.x).put("y", from.y)
				.put("x2", to.x).put("y2", to.y).put("duration", seconds)
		)
		val down = SystemClock.uptimeMillis()
		val millis = (seconds * 1000).toLong()
		inject(down, down, MotionEvent.ACTION_DOWN, from)
		var elapsed = 0L
		while (elapsed < millis) {
			Thread.sleep(16)
			elapsed = SystemClock.uptimeMillis() - down
			val p = easeInOutQuad((elapsed.toFloat() / millis).coerceAtMost(1f))
			inject(down, SystemClock.uptimeMillis(), MotionEvent.ACTION_MOVE, from + (to - from) * p)
		}
		inject(down, SystemClock.uptimeMillis(), MotionEvent.ACTION_UP, to)
		composeTestRule.idle()
	}

	/// Drags a slider's thumb from one fraction of its track to another.
	private fun slide(node: SemanticsNodeInteraction, from: Float, to: Float) {
		val semantics = node.fetchSemanticsNode()
		val position = semantics.positionOnScreen
		val inset = semantics.size.height / 2f
		val track = semantics.size.width - inset * 2
		val y = position.y + semantics.size.height / 2f
		drag(Offset(position.x + inset + track * from, y), Offset(position.x + inset + track * to, y), 0.6)
	}

	private fun inject(downTime: Long, eventTime: Long, action: Int, point: Offset) {
		val event = MotionEvent.obtain(downTime, eventTime, action, point.x, point.y, 0)
		event.source = InputDevice.SOURCE_TOUCHSCREEN
		instrumentation.sendPointerSync(event)
		event.recycle()
	}

	private fun easeInOutQuad(t: Float) = if (t < 0.5f) 2 * t * t else 1 - (-2 * t + 2) * (-2 * t + 2) / 2

	private fun pause(seconds: Double) = Thread.sleep(max(0L, (seconds * 1000).toLong()))

	private fun waitForTag(tag: String) = composeTestRule.waitUntil(10_000) {
		composeTestRule.onAllNodes(hasTestTag(tag)).fetchSemanticsNodes().isNotEmpty()
	}
}
