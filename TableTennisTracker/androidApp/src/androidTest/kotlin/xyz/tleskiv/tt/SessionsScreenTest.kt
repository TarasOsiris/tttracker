package xyz.tleskiv.tt

import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import xyz.tleskiv.tt.R
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.util.assertFirstTextDisplayed
import xyz.tleskiv.tt.util.assertTextDisplayed
import xyz.tleskiv.tt.util.clickContentDescription
import xyz.tleskiv.tt.util.clickTag
import xyz.tleskiv.tt.util.clickText
import xyz.tleskiv.tt.util.closeSoftKeyboard
import xyz.tleskiv.tt.util.idle
import xyz.tleskiv.tt.util.inputText
import xyz.tleskiv.tt.util.scrollToAndClickText
import xyz.tleskiv.tt.util.scrollToText
import xyz.tleskiv.tt.util.setSliderValue
import xyz.tleskiv.tt.util.str
import xyz.tleskiv.tt.util.waitForText

@RunWith(AndroidJUnit4::class)
class SessionsScreenTest {
	@get:Rule
	val composeTestRule = createAndroidComposeRule<MainActivity>()

	@Test
	fun appLaunch_displaysSessionsScreen() = with(composeTestRule) {
		assertTextDisplayed(R.string.sessions_week_mode)
	}

	@Test
	fun addSession_withAllFields_displaysSessionDetails() = with(composeTestRule) {
		val testDurationMinutes = 30
		val testNotes = "Great practice session today"
		val techniqueText = str(R.string.session_type_technique)

		clickContentDescription(R.string.action_add_session)
		assertTextDisplayed(R.string.title_create_session)

		setSliderValue(TestTags.DURATION_SLIDER, testDurationMinutes.toFloat())
		clickText(techniqueText)
		inputText(TestTags.NOTES_FIELD, testNotes)
		clickText(R.string.action_save)

		waitForText(techniqueText)
		assertTextDisplayed(R.string.session_duration_format, testDurationMinutes)
		assertTextDisplayed(testNotes)

		clickText(testNotes)

		// Session details show all the input info
		assertTextDisplayed(R.string.label_session_type)
		assertFirstTextDisplayed(techniqueText)
		assertTextDisplayed(R.string.label_duration)
		assertTextDisplayed(R.string.duration_minutes_full, testDurationMinutes)
		assertTextDisplayed(R.string.label_notes)
		assertTextDisplayed(testNotes)
	}

	@Test
	fun addSession_withMatch_displaysMatchDetails() = with(composeTestRule) {
		val testDurationMinutes = 45
		val testOpponentName = "John Doe"
		val myScore = 3
		val opponentScore = 1
		val techniqueText = str(R.string.session_type_technique)

		clickContentDescription(R.string.action_add_session)
		assertTextDisplayed(R.string.title_create_session)

		setSliderValue(TestTags.DURATION_SLIDER, testDurationMinutes.toFloat())
		clickText(techniqueText)

		scrollToAndClickText(R.string.action_add_match)
		waitForText(str(R.string.label_opponent))

		inputText(TestTags.OPPONENT_FIELD, testOpponentName)
		closeSoftKeyboard()
		idle()

		// Click Score label to dismiss dropdown and scroll it into view
		scrollToAndClickText(R.string.label_score)
		idle()

		repeat(myScore) {
			clickTag(TestTags.MY_SCORE_PLUS)
		}
		repeat(opponentScore) {
			clickTag(TestTags.OPPONENT_SCORE_PLUS)
		}

		clickTag(TestTags.ADD_MATCH_DIALOG_SAVE)

		waitForText(testOpponentName)
		val scoreText = str(R.string.match_score_format, myScore, opponentScore)
		scrollToText(scoreText)
		assertTextDisplayed(scoreText)
		assertTextDisplayed(R.string.match_win)
	}
}
