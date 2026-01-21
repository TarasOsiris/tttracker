package xyz.tleskiv.tt

import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_add_session
import tabletennistracker.composeapp.generated.resources.action_save
import tabletennistracker.composeapp.generated.resources.duration_minutes_full
import tabletennistracker.composeapp.generated.resources.label_duration
import tabletennistracker.composeapp.generated.resources.label_session_type
import tabletennistracker.composeapp.generated.resources.session_duration_format
import tabletennistracker.composeapp.generated.resources.session_type_technique
import tabletennistracker.composeapp.generated.resources.sessions_week_mode
import tabletennistracker.composeapp.generated.resources.title_create_session
import xyz.tleskiv.tt.ui.TestTags
import xyz.tleskiv.tt.util.assertFirstTextDisplayed
import xyz.tleskiv.tt.util.assertTextDisplayed
import xyz.tleskiv.tt.util.clickContentDescription
import xyz.tleskiv.tt.util.clickFirstText
import xyz.tleskiv.tt.util.clickText
import xyz.tleskiv.tt.util.inputText
import xyz.tleskiv.tt.util.setSliderValue
import xyz.tleskiv.tt.util.str
import xyz.tleskiv.tt.util.waitForText

@RunWith(AndroidJUnit4::class)
class SessionsScreenTest {
	@get:Rule
	val composeTestRule = createAndroidComposeRule<MainActivity>()

	@Test
	fun launchesSessionsScreen() = with(composeTestRule) {
		assertTextDisplayed(Res.string.sessions_week_mode)
	}

	@Test
	fun addSessionAndVerifyDetails() = with(composeTestRule) {
		val testDurationMinutes = 30
		val testNotes = "Great practice session today"
		val techniqueText = str(Res.string.session_type_technique)

		clickContentDescription(Res.string.action_add_session)
		assertTextDisplayed(Res.string.title_create_session)

		setSliderValue(TestTags.DURATION_SLIDER, testDurationMinutes.toFloat())
		clickText(techniqueText)
		inputText(TestTags.NOTES_FIELD, testNotes)
		clickText(Res.string.action_save)

		waitForText(techniqueText)
		assertTextDisplayed(Res.string.session_duration_format, testDurationMinutes)
		assertTextDisplayed(testNotes)

		clickFirstText(techniqueText)

		assertTextDisplayed(Res.string.label_session_type)
		assertFirstTextDisplayed(techniqueText)
		assertTextDisplayed(Res.string.label_duration)
		assertTextDisplayed(Res.string.duration_minutes_full, testDurationMinutes)
	}
}
